import { Request, Response, NextFunction } from "express";
import SVGService from "../services/svg.service";

export interface ISVGController {
  svgService: SVGService;
  languagesStatistic: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
