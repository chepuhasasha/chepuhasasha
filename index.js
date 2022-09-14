import { writeFile } from "node:fs/promises";
import { Octokit } from "octokit";
import * as dotenv from "dotenv";
dotenv.config();

let result = [];

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

await octokit.request("GET /users/{user}/repos", {
  user: "chepuhasasha",
});

const getRepos = async () => {
  try {
    const repos = await octokit.request("GET /users/{user}/repos", {
      user: "chepuhasasha",
    });
    return repos.data.map((element) => ({
      name: element.name,
      description: element.description,
      url: element.html_url,
      lang: element.language,
      issues: element.open_issues_count,
      stars: element.stargazers_count,
      lastUpdate: new Date(element.updated_at).toDateString(),
      commits: 0,
    }));
  } catch (e) {
    return null;
  }
};

const getCommits = async (repo) => {
  try {
    const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: "chepuhasasha",
      repo,
    });
    return commits.data.length;
  } catch (e) {
    return 0;
  }
};

let repos = await getRepos("muup");
// repos = repos.map((repo) => {
//   return getCommits(repo.name);
// });
// console.log(repos);

const writeReadme = async () => {
  try {
    await writeFile(
      "test.md",
      "```json\n" + JSON.stringify(repos, null, 2) + "\n```"
    );
  } catch (e) {
    console.log(e);
  }
};
await writeReadme();
