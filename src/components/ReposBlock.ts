import type { IRepo } from "../types/repo.interface";
import RepoLine from "./RepoLine.js";

export default (repos: IRepo[]) => {
  return repos.reduce((accum, repo, i) => {
    if (i < repos.length - 1) return (accum += RepoLine(repo));
    else return (accum += RepoLine(repo)) + "```";
  }, "##### 📚 Repositories\n```\n");
};
