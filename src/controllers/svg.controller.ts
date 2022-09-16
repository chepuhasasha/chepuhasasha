import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { ISVGController } from "./svg.interface";
import SVGService from "../services/svg.service";
import { Octokit } from "octokit";
export class SVGController extends BaseController implements ISVGController {
  svgService: SVGService;
  octokit: Octokit;

  constructor() {
    super();
    this.svgService = new SVGService();
    this.bindRouts([
      {
        path: "/languages_statistic/",
        method: "get",
        func: this.languagesStatistic,
        middlewares: [],
      },
      {
        path: "/repo/",
        method: "get",
        func: this.repo,
        middlewares: [],
      },
    ]);
    this.octokit = new Octokit({
      auth: process.env.TOKEN,
    });
  }

  async languagesStatistic(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.octokit
      .request("GET /users/{user}/repos", {
        user: req.query.user ? req.query.user : "chepuhasasha",
      })
      .then((gh_res) => {
        this.svg(
          res,
          this.svgService.getLangsStatistic(gh_res.data, req.query)
        );
      })
      .catch((e) => this.error(res, e));
  }

  async repo(req: Request, res: Response, next: NextFunction) {
    this.octokit
      .request("GET /users/{user}/repos", {
        user: req.query.user ? req.query.user : "chepuhasasha",
      })
      .then((gh_res) => {
        const repo = gh_res.data.find(
          (item: { name: string }) => item.name === req.query.name
        );
        if (repo) {
          this.octokit.rest.repos
            .listCommits({
              owner: repo.owner.login,
              repo: repo.name,
              per_page: 3,
            })
            .then((commits) => {
              this.svg(
                res,
                this.svgService.getRepo({
                  name: repo.name,
                  description: repo.description,
                  language: repo.language,
                  commits: commits.data.map((commit) => ({
                    message: commit.commit.message,
                    username: commit.author?.login as string,
                    date: commit.commit.author?.date as string,
                  })),
                })
              );
            });
        } else {
          this.error(res, "Repo not found");
        }
      })
      .catch((e) => this.error(res, e));
  }
}
