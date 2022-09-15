import * as dotenv from "dotenv";
import { writeFile } from "node:fs/promises";
import { Octokit } from "octokit";
import Langs from "./blocks/Langs.js";
dotenv.config();

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

octokit
  .request("GET /users/{user}/repos", {
    user: process.env.GIT_USERNAME,
  })
  .then(
    (res: {
      data: {
        name: string;
        description: any;
        html_url: any;
        language: any;
        open_issues_count: any;
        stargazers_count: any;
        updated_at: string | number | Date;
      }[];
    }) => {
      const langs: Record<string, number> = {};
      const repos = res.data.map((element) => {
        if (langs[element.language] === undefined) langs[element.language] = 0;
        if (langs[element.language] >= 0) langs[element.language] += 1;
        return {
          name: element.name,
          description: element.description,
          url: element.html_url,
          lang: element.language,
          issues: element.open_issues_count,
          stars: element.stargazers_count,
          lastUpdate: new Date(element.updated_at).toDateString(),
          commits: 0,
        };
      });

      const result = Langs(
        Object.keys(langs)
          .map((key) => ({
            name: key,
            percent: Math.floor((langs[key] / repos.length) * 100),
          }))
          .sort((a, b) => b.percent - a.percent),
        300
      );
      writeFile("./assets/langs.svg", result)
        .then(() => console.log("Файл записан"))
        .catch((e) => console.log(e));
    }
  )
  .catch((e) => console.log(e));
