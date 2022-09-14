import type { IRepo } from "../types/repo.interface";
import RepoLine from "./RepoLine.js";

export default (repos: IRepo[]) => {
  const summ = repos.reduce((accum, repo) => {
    return (accum += repo.commits);
  }, 0);
  return repos.reduce((accum, repo) => {
    return (accum += RepoLine(repo, summ));
  }, "### 📚 Repositories\n\n");
};
