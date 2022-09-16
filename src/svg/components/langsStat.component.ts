import { h } from "../utils";
import Lang from "./lang.component";
import LinePie from "./linePie.component";

export default (
  langs: { name: string; percent: number }[],
  options: { width: number; fontStyle: string; fontSize: number }
) => {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${options.width} ${
        langs.length * (options.fontSize + 11) + 23
      }`,
      width: `${options.width}`,
      height: `${langs.length * (options.fontSize + 11) + 23}`,
      style: "background: #0D1117; border-radius: 6px;",
    },
    [
      h("style", {}, [
        `
          .text { font: ${options.fontStyle} ${options.fontSize}px sans-serif; }
          .text_percent { font: ${options.fontStyle} ${options.fontSize}px monospace; }
          `,
      ]),
      LinePie(10, 10, options.width - 20, langs),
      langs.reduce((accum, lang, i) => {
        return (accum += Lang(
          10,
          26 + i * (options.fontSize + 10),
          lang.name,
          options.width - 20,
          options.fontSize,
          lang.percent
        ));
      }, ""),
    ]
  );
};
