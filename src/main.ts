import fs from "node:fs/promises";
import * as dotenv from "dotenv";
import express from "express";
import SVGService from "./services/svg.service";
import { SVGController } from "./controllers/svg.controller";
const app = express();
dotenv.config();

const svgService = new SVGService();

app.use(express.static("static"));
app.listen(process.env.API_PORT, () => {
  console.log(`Listening on port: ${process.env.API_PORT}`);
});

app.get("/", (req, res) => {
  res.send("<a href='https://github.com/chepuhasasha'>@chepuhasasha</a>");
});

app.use("/svg", new SVGController().router);
