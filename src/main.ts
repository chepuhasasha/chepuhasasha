import { writeFile } from "node:fs/promises";
import { h } from "./utils/render.js";
import Langs from "./components/Langs.js";

const result = Langs(
  [
    { name: "Vue", percent: 20 },
    { name: "TypeScript", percent: 30 },
    { name: "CSS", percent: 40 },
    { name: "test", percent: 10 },
  ],
  300
);

writeFile("./assets/langs.svg", result)
  .then(() => console.log("Файл записан"))
  .catch((e) => console.log(e));
