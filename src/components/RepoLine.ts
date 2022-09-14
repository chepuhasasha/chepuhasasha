import type { IRepo } from "../types/repo.interface";
import Utilization from "./Utilization.js";

export default (repo: IRepo, size: number = 20) => {
  return `${repo.name}${" ".repeat(size - repo.name.length)}${Utilization(
    30,
    100
  )} -◯- ${repo.commits} | ⨀ ${repo.issues} | ★ ${repo.stars}\n`;
};
