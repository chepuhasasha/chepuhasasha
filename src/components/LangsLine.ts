import langColors from "../utils/langColors.js";
import { h } from "../utils/render.js";

export default (
  x: number,
  y: number,
  width: number,
  langs: { name: string; percent: number }[]
) => {
  let _width = x;
  return h("g", {}, [
    langs.reduce((accum, lang) => {
      let lineWidth = width * (lang.percent / 100) - 2;
      const rect = {
        x: `${_width}`,
        y: `${y}`,
        width: `${lineWidth}`,
        height: "8px",
        fill: langColors(lang.name),
      };
      _width += lineWidth + 2;
      return (accum += h("rect", rect));
    }, ""),
  ]);
};
