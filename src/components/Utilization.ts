export default (
  val: number = 10,
  max: number = 100,
  size: number = 30,
  done: string = "█",
  empty: string = "│"
) => {
  const utilization = Math.floor((val / max) * 100);
  const line = Math.floor((utilization / 100) * size);
  const emptyLine = size - line - utilization.toString().length;
  return `${"```\n"}${done.repeat(line)} ${utilization}% ${empty.repeat(
    emptyLine > 0 ? emptyLine : 1
  )}${"\n```"}`;
};
