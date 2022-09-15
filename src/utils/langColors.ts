export default (name: string) => {
  const colors: Record<string, string> = {
    Vue: "#41B883",
    TypeScript: "#3178C6",
    CSS: "#563D7C",
    JavaScript: "#f1e05a",
    Pyrhon: "#3572A5",
    "Jupyter Notebook": "#DA5B0B",
    default: "#58A6FF",
  };
  return colors[name] ? colors[name] : colors.default;
};
