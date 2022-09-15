import langColors from "../utils/langColors.js";
import { h } from "../utils/render.js";

export default (x: number, y: number, name: string, percent?: number) => {
  return h("g", {}, [
    h("circle", {
      cx: `${x + 4}`,
      cy: `${y - 4 + 15}`,
      r: "4",
      fill: langColors(name),
    }),
    h(
      "text",
      { x: `${x + 16}`, y: `${y + 15}`, fill: "#C9D1D9", class: "text" },
      [name]
    ),
    percent
      ? h(
          "text",
          {
            x: `${x + 32 + name.length * 5}`,
            y: `${y + 15}`,
            fill: "#8B949E",
            class: "text",
          },
          [`${percent}%`]
        )
      : "",
  ]);
};
