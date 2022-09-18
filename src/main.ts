import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { SVGController } from "./controllers/svg.controller";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.set("Cache-control", "no-cache");
  next();
});
app.use("/", new SVGController().router);

app.get("*", (req, res) => {
  res.send("<a href='https://github.com/chepuhasasha'>@chepuhasasha</a>");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
