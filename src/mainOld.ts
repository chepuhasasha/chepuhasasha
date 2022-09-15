import * as dotenv from "dotenv";
import { writeFile } from "node:fs/promises";
import { Octokit } from "octokit";
import ReposBlock from "./components/ReposBlock.js";
import { IRepo } from "./types/repo.interface.js";

dotenv.config();
const octokit = new Octokit({
  auth: process.env.TOKEN,
});
// console.log(JSON.parse(process.env.ACTIVE_REPO));
// octokit.rest.repos
//   .getCodeFrequencyStats({
//     owner: process.env.GIT_USERNAME,
//     repo: "ois",
//   })
//   .then((res) => {
//     console.log(res);
//   });

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
      const repos = res.data.map((element) => ({
        name: element.name,
        description: element.description,
        url: element.html_url,
        lang: element.language,
        issues: element.open_issues_count,
        stars: element.stargazers_count,
        lastUpdate: new Date(element.updated_at).toDateString(),
        commits: 0,
      }));
      let promises: Promise<IRepo>[] = [];
      repos.forEach((repo) => {
        promises.push(
          octokit.rest.repos
            .listCommits({
              owner: process.env.GIT_USERNAME,
              repo: repo.name,
              per_page: 100,
            })
            .then((data) => {
              repo.commits = data.data.length;
              return repo;
            })
            .catch((e) => repo)
        );
      });
      Promise.all(promises)
        .then((data) => {
          writeFile(
            "README.md",
            ReposBlock(data.sort((a, b) => b.commits - a.commits))
          )
            .then(() => console.log("Файл записан"))
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  )
  .catch((e) => console.log(e));
