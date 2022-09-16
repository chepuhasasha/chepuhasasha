import { h, color } from "../utils";

export default (
  x: number,
  y: number,
  name: string,
  width: number = 200,
  height: number = 13,
  percent?: number
) => {
  return h("g", { opacity: "0" }, [
    h("circle", {
      cx: `${x + 4}`,
      cy: `${y + 2 + height / 2}`,
      r: "4",
      fill: color(name),
    }),
    h(
      "text",
      { x: `${x + 16}`, y: `${y + height}`, fill: "#C9D1D9", class: "text" },
      [name]
    ),
    percent
      ? h(
          "text",
          {
            x: `${x + width}`,
            y: `${y + height}`,
            "text-anchor": "end",
            fill: "#8B949E",
            class: "text",
          },
          [`${Math.floor(percent)}%`]
        )
      : "",
    h("animate", {
      attributeName: "opacity",
      to: "1",
      from: "0",
      dur: "0.5s",
      fill: "freeze",
    }),
  ]);
};
