import type { IRepo } from "../types/repo.interface";
import { h } from "../utils/render";

export default (repo: IRepo) => {
  return h(
    "div",
    {
      display: "flex",
      gap: "10px",
      padding: "16px",
      background: "#0D1117",
    },
    {},
    [
      h("a", { color: "#58A6FF", fontWeight: "600" }, { href: repo.url }, [
        repo.name,
      ]),
    ]
  );
};
