import { h } from "../utils/render.js";
import LangsLine from "./LangsLine.js";
import LangWidget from "./LangWidget.js";

export default (
  langs: { name: string; percent: number }[],
  width: number = 200
) => {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${width} ${langs.length * 25 + 23}`,
      width: `${width}`,
      height: `${langs.length * 25 + 23}`,
      style: "background: #0D1117; border-radius: 6px;",
    },
    [
      h("style", {}, [".text { font: normal 12px sans-serif; }"]),
      LangsLine(10, 10, width - 20, langs),
      langs.reduce((accum, lang, i) => {
        return (accum += LangWidget(10, 26 + i * 23, lang.name, lang.percent));
      }, ""),
    ]
  );
};
