export const h = (
  tag: keyof SVGElementTagNameMap | "div",
  attrs?: Record<string, string>,
  childs?: string[]
): string => {
  let strAttrs = "";
  if (attrs)
    strAttrs = Object.keys(attrs).reduce((accum, key) => {
      return (accum += `${key}="${attrs[key]}" `);
    }, "");
  if (attrs)
    if (childs)
      return `<${tag} ${strAttrs}>${childs.reduce((accum, val) => {
        return (accum += val);
      }, "")}</${tag}>`;
  return `<${tag} ${strAttrs}/>`;
};

export const color = (name: string) => {
  const colors: Record<string, string> = {
    Vue: "#41B883",
    TypeScript: "#3178C6",
    CSS: "#563D7C",
    JavaScript: "#f1e05a",
    Pyrhon: "#3572A5",
    "Jupyter Notebook": "#DA5B0B",
    HTML: "#e34c26",
    PowerShell: "#012456",
    Shell: "#89e051",
    Go: "#00ADD8",
    default: "#58A6FF",
  };
  return colors[name] ? colors[name] : colors.default;
};
