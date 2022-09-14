import type { IRepo } from "../types/repo.interface";
import Utilization from "./Utilization.js";

export default (repo: IRepo, max: number = 20) => {
  return `
[${repo.name}](${repo.url})

${Utilization(repo.commits, max)}

${"`"}commits: ${repo.commits}${"`"}
${"`"}issues: ${repo.issues}${"`"}
${"`"}stars: ${repo.stars}${"`"}

---`;
};
