export const h = (
  tag: keyof SVGElementTagNameMap,
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
h("circle");
