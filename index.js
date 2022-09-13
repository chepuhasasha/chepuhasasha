import { writeFile } from "node:fs/promises";

try {
  await fs.writeFile(__dirname + "test.md", "# 123");
} catch (e) {
  console.log(e);
}
