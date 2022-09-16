import { h, color } from "../utils";

export default (
  x: number,
  y: number,
  message: string,
  username: string,
  date: string,
  width: number
) => {
  return h("g", { opacity: "0" }, [
    h("rect", {
      x: `${x}`,
      y: `${y}`,
      width: `${width}`,
      height: "58",
      rx: "4",
      fill: "#0D1117",
    }),
    h(
      "foreignObject",
      {
        x: `${x + 10}`,
        y: `${y + 10}`,
        width: `${width - 20}`,
        height: "14",
      },
      [
        h(
          "div",
          { xmlns: "http://www.w3.org/1999/xhtml", class: "discription" },
          [message]
        ),
      ]
    ),
    h("text", { x: `${x + 10}`, y: `${y + 44}`, class: "sub_text" }, [
      username,
    ]),
    h(
      "text",
      {
        x: `${x + width - 10}`,
        y: `${y + 44}`,
        class: "sub_text",
        "text-anchor": "end",
      },
      [date]
    ),
    h("animate", {
      attributeName: "opacity",
      to: "1",
      from: "0",
      dur: "0.5s",
      fill: "freeze",
    }),
  ]);
};
