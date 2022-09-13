import { writeFile } from "node:fs/promises";

try {
  await writeFile("test.md", "# 123");
} catch (e) {
  console.log(e);
}
