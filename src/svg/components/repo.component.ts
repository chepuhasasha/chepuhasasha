import { h } from "../utils";
import Lang from "./lang.component";
import Commit from "./commit.component";

export default (
  repo: {
    name: string;
    description: string;
    language: string;
    commits: { message: string; username: string; date: string }[];
  },
  options: { width: number; height: number }
) => {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${options.width} ${options.height}`,
      width: `${options.width}`,
      height: `${options.height}`,
      style: "background: #0D1117;",
    },
    [
      h("style", {}, [
        `
        .text { font: normal 12px sans-serif; fill: #C9D1D9; }
        .repo_text { font: normal 18px sans-serif; fill: #58A6FF; }
        .sub_text { font: normal 11px sans-serif; fill: #8B949E; text-transform: uppercase; }
        .discription { font: normal 12px sans-serif; color: #A3ACB5; letter-spacing: 1px; height: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
        `,
      ]),
      h("rect", {
        x: "0",
        y: "0",
        width: `${options.width}`,
        height: `${options.height}`,
        rx: "6",
        fill: "#161B22",
      }),
      h(
        "text",
        {
          x: "10",
          y: "28",
          class: "repo_text",
        },
        [repo.name]
      ),
      Lang(10, 38, repo.language, options.width - 20, 12),
      h(
        "foreignObject",
        { x: "10", y: "66", width: `${options.width - 20}`, height: "14" },
        [
          h(
            "div",
            { xmlns: "http://www.w3.org/1999/xhtml", class: "discription" },
            [repo.description ? repo.description : "no discription."]
          ),
        ]
      ),
      repo.commits.reduce((accum, commit, i) => {
        return (accum += Commit(
          10,
          90 + i * 68,
          commit.message,
          commit.username,
          `${new Date(commit.date).toLocaleTimeString()} ${new Date(
            commit.date
          ).toDateString()}`,
          options.width - 20
        ));
      }, ""),
    ]
  );
};
