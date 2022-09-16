import { h, color } from "../utils";

export default (
  x: number,
  y: number,
  width: number,
  langs: { name: string; percent: number }[]
) => {
  let _width = x;
  return h("g", {}, [
    langs.reduce((accum, lang, i) => {
      let lineWidth = width * (lang.percent / 100) - 2;
      const rect = {
        x: `${_width}`,
        y: `${y}`,
        width: "0",
        height: "8",
        fill: color(lang.name),
        rx: "2",
      };
      _width += lineWidth + 2;
      return (accum += h("rect", rect, [
        h("animate", {
          attributeName: "width",
          to: `${lineWidth}`,
          from: "0",
          dur: "0.3s",
          begin: `${i * 0.3}s`,
          fill: "freeze",
        }),
      ]));
    }, ""),
  ]);
};
