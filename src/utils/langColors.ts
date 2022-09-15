export default (name: string) => {
  const colors: Record<string, string> = {
    Vue: "#41B883",
    TypeScript: "#3178C6",
    CSS: "#563D7C",
    default: "#58A6FF",
  };
  return colors[name] ? colors[name] : colors.default;
};
