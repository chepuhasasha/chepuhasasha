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
        const langs: Record<string, number> = {};
        const sum = gh_res.data.reduce(
          (accum: number, element: { language: string }) => {
            if (element.language != null) {
              if (langs[element.language] === undefined)
                langs[element.language] = 0;
              if (langs[element.language] >= 0) langs[element.language] += 1;
              return (accum += 1);
            } else return accum;
          },
          0
        );
        const langsSVG = Buffer.from(
          this.svgService.langsSVG(
            Object.keys(langs)
              .map((key) => ({
                name: key,
                percent: (langs[key] / sum) * 100,
              }))
              .sort((a, b) => b.percent - a.percent),
            {
              width: req.query.width ? +req.query.width : 300,
              fontStyle: req.query.font_style
                ? req.query.font_style.toString()
                : "normal",
              fontSize: req.query.font_size ? +req.query.font_size : 12,
            }
          ),
          "utf-8"
        );
        this.svg(res, langsSVG);
      })
      .catch((e) => this.error(res, e));
  }

  async repo(req: Request, res: Response, next: NextFunction) {
    this.ok(res, req.query);
  }
}
