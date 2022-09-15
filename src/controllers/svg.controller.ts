import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { ISVGController } from "./svg.interface";
import SVGService from "../services/svg.service";

export class SVGController extends BaseController implements ISVGController {
  svgService: SVGService;
  constructor() {
    super();
    this.svgService = new SVGService();
    this.bindRouts([
      {
        path: "/languages_statistic",
        method: "get",
        func: this.languagesStatistic,
        middlewares: [],
      },
    ]);
  }

  async languagesStatistic(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const langsSVG = Buffer.from(
      this.svgService.langsSVG(
        [
          { name: "Vue", percent: 10 },
          { name: "TypeScript", percent: 90 },
        ],
        300
      ),
      "utf-8"
    );
    this.svg(res, langsSVG);
  }
}
