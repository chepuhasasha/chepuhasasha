import { writeFile } from "node:fs/promises";
import { Octokit } from "octokit";
import * as dotenv from "dotenv";
import ReposBlock from "./components/ReposBlock.js";
import { IRepo } from "./types/repo.interface";

dotenv.config();

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

const getRepos = async () => {
  try {
    const repos = await octokit.request("GET /users/{user}/repos", {
      user: process.env.GIT_USERNAME,
    });
    return repos.data.map(
      (element: {
        name: any;
        description: any;
        html_url: any;
        language: any;
        open_issues_count: any;
        stargazers_count: any;
        updated_at: string | number | Date;
      }) => ({
        name: element.name,
        description: element.description,
        url: element.html_url,
        lang: element.language,
        issues: element.open_issues_count,
        stars: element.stargazers_count,
        lastUpdate: new Date(element.updated_at).toDateString(),
        commits: 0,
      })
    );
  } catch (e) {
    return null;
  }
};
const getCommits = async (repo: string) => {
  try {
    const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
      owner: process.env.GIT_USERNAME,
      repo,
    });
    return commits.data.length;
  } catch (e) {
    return 0;
  }
};

let repos = await getRepos();
const result = ReposBlock(repos);

const writeReadme = async () => {
  try {
    await writeFile("README.md", result);
  } catch (e) {
    console.log(e);
  }
};
await writeReadme();
