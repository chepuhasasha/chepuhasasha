import { Router, Response } from "express";
import { ExpressReturnType, IControllerRoute } from "./route.interface";

export abstract class BaseController {
  _router: Router;
  constructor() {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public created(res: Response): void {
    res.sendStatus(201);
  }

  public send<T>(res: Response, status: number, message: T): ExpressReturnType {
    res.type("application/json");
    return res.status(status).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send<T>(res, 200, message);
  }
  public svg(res: Response, svg: Buffer): ExpressReturnType {
    res.type("image/svg+xml");
    return res.status(200).send(svg);
  }

  bindRouts(routes: IControllerRoute[]): void {
    for (const route of routes) {
      console.log(`[${route.method}] ${route.path}`);
      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
      // console.log(this.router[route.method]);
    }
  }
}
