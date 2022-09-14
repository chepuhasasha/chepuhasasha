export default (
  val: number = 10,
  max: number = 100,
  size: number = 30,
  done: string = "█",
  empty: string = "░"
) => {
  const utilization = (max / 100) * val;
  const line = Math.floor((utilization / 100) * size);
  return `${utilization}% ${done.repeat(line)}${empty.repeat(size - line)}`;
  // return done.repeat(size);
};
