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
    this.ok(res, req.query);
  }
}
