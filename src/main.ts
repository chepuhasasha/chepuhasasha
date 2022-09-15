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
          commitsList: [],
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
        .then(() => console.log("[Lang statistic]: OK!"))
        .catch((e) => console.log("[Lang statistic]", e));

      octokit.rest.repos
        .listCommits({
          owner: process.env.GIT_USERNAME,
          repo: process.env.ACTIVE_REPO,
          per_page: 5,
        })
        .then((data) => {
          const activeRepo = repos.find(
            (item) => item.name === process.env.ACTIVE_REPO
          );
          activeRepo.commitsList = data.data.map((d) => ({
            message: d.commit.message,
            url: d.html_url,
            sha: d.sha,
            date: new Date(d.commit.author.date).toDateString(),
          }));
          console.log(activeRepo);
        })
        .catch((e) => console.log(e));
    }
  )
  .catch((e) => console.log("[GET repos]", e));
