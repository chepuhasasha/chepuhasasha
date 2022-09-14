import type { IRepo } from "../types/repo.interface";
import RepoLine from "./RepoLine.js";

export default (repos: IRepo[]) => {
  return repos.reduce((accum, repo, i) => {
    return (accum += RepoLine(repo));
  }, "### 📚 Repositories\n\n");
};
