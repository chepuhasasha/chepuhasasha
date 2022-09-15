export default class SVGService {
  langColors(name: string) {
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
  }

  h(
    tag: keyof SVGElementTagNameMap,
    attrs?: Record<string, string>,
    childs?: string[]
  ): string {
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
  }

  linePie(
    x: number,
    y: number,
    width: number,
    langs: { name: string; percent: number }[]
  ) {
    let _width = x;
    return this.h("g", {}, [
      langs.reduce((accum, lang) => {
        let lineWidth = width * (lang.percent / 100) - 2;
        const rect = {
          x: `${_width}`,
          y: `${y}`,
          width: `${lineWidth}`,
          height: "8px",
          fill: this.langColors(lang.name),
        };
        _width += lineWidth + 2;
        return (accum += this.h("rect", rect));
      }, ""),
    ]);
  }

  lang(x: number, y: number, name: string, percent?: number) {
    return this.h("g", {}, [
      this.h("circle", {
        cx: `${x + 4}`,
        cy: `${y - 4 + 15}`,
        r: "4",
        fill: this.langColors(name),
      }),
      this.h(
        "text",
        { x: `${x + 16}`, y: `${y + 15}`, fill: "#C9D1D9", class: "text" },
        [name]
      ),
      percent
        ? this.h(
            "text",
            {
              x: `${x + 32 + name.length * 5}`,
              y: `${y + 15}`,
              fill: "#8B949E",
              class: "text",
            },
            [`${percent}%`]
          )
        : "",
    ]);
  }

  langsSVG(langs: { name: string; percent: number }[], width: number = 200) {
    return this.h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${width} ${langs.length * 25 + 23}`,
        width: `${width}`,
        height: `${langs.length * 25 + 23}`,
        style: "background: #0D1117; border-radius: 6px;",
      },
      [
        this.h("style", {}, [".text { font: normal 12px sans-serif; }"]),
        this.linePie(10, 10, width - 20, langs),
        langs.reduce((accum, lang, i) => {
          return (accum += this.lang(10, 26 + i * 23, lang.name, lang.percent));
        }, ""),
      ]
    );
  }
}
