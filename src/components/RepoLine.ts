import type { IRepo } from "../types/repo.interface";
import Utilization from "./Utilization.js";

export default (repo: IRepo, size: number = 20) => {
  return `\n>[${repo.name}](${repo.url})
>
>${Utilization(30, 100)}
> ${"`"}commits: ${repo.commits}${"`"}
> ${"`"}issues: ${repo.issues}${"`"}
> ${"`"}stars: ${repo.stars}${"`"}
>`;
};
