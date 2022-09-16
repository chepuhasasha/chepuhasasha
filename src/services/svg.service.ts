import LangsStat from "../svg/components/langsStat.component";
import Repo from "../svg/components/repo.component";
import { Request } from "express";
export default class SVGService {
  getLangsStatistic(data: { language: string }[], query: Request["query"]) {
    const langs: Record<string, number> = {};
    const sum = data.reduce((accum: number, element: { language: string }) => {
      if (element.language != null) {
        if (langs[element.language] === undefined) langs[element.language] = 0;
        if (langs[element.language] >= 0) langs[element.language] += 1;
        return (accum += 1);
      } else return accum;
    }, 0);
    return Buffer.from(
      LangsStat(
        Object.keys(langs)
          .map((key) => ({
            name: key,
            percent: (langs[key] / sum) * 100,
          }))
          .sort((a, b) => b.percent - a.percent),
        {
          width: query.width ? +query.width : 300,
          fontStyle: query.font_style ? query.font_style.toString() : "normal",
          fontSize: query.font_size ? +query.font_size : 12,
        }
      ),
      "utf-8"
    );
  }
  getRepo(repo: {
    name: string;
    description: string;
    language: string;
    commits: { message: string; username: string; date: string }[];
  }) {
    return Buffer.from(Repo(repo, { width: 300, height: 294 }), "utf-8");
  }
}
