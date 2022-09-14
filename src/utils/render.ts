export type HFunc = (
  tag: string,
  style: {
    [key in keyof CSSStyleDeclaration]?: string;
  },
  props: Record<string, unknown>,
  childs?: string[]
) => string;

export const kebabize = (str: string) => {
  return str
    .split("")
    .map((letter, i) => {
      return letter.toUpperCase() === letter
        ? `${i !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
};

export const h: HFunc = (tag, style, props, childs: []) => {
  const tagStyle = Object.keys(style).reduce((accum, key) => {
    return (accum += `${kebabize(key)}: ${
      style[key as keyof CSSStyleDeclaration]
    }; `);
  }, "");
  const tagProps = Object.keys(props).reduce((accum, key) => {
    return (accum += `${key}="${props[key]}" `);
  }, "");
  const body = childs?.reduce((accum, child) => {
    return (accum += child);
  }, "");
  return `<${tag} style="${tagStyle}" ${tagProps}>${body ? body : ""}</${tag}>`;
};
