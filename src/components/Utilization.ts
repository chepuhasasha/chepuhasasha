export default (
  val: number = 10,
  max: number = 100,
  size: number = 30,
  done: string = "█",
  empty: string = "│"
) => {
  const utilization = Math.floor((max / 100) * val);
  const line = Math.floor((utilization / 100) * size);
  return `${"```\n"}${done.repeat(line)} ${utilization}% ${empty.repeat(
    size - line - utilization.toString().length
  )}${"\n```"}`;
};
