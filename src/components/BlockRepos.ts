import { IRepo } from "../types/repo.interface";
import { h } from "../utils/render";
import Repo from "./Repo";

export default (title: string, repos: IRepo[]) => {
  return h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      gap: "1px",
      border: "1px solid #30363D",
      background: "#21262D",
      borderRadius: "6px",
    },
    {},
    [
      h(
        "div",
        { background: "#161B22", padding: "16px", color: "C9D1D9" },
        {},
        [title]
      ),
      ...repos.map((repo) => {
        return Repo(repo);
      }),
    ]
  );
};
