import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { SVGController } from "./controllers/svg.controller";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use("/svg", new SVGController().router);

app.get("/", (req, res) => {
  res.send("<a href='https://github.com/chepuhasasha'>@chepuhasasha</a>");
});

app.listen(process.env.API_PORT, () => {
  console.log(`Listening on port: ${process.env.API_PORT}`);
});
