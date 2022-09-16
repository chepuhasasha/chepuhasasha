export default class SVGService {
  langColors(name: string) {
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

  lang(
    x: number,
    y: number,
    name: string,
    width: number = 200,
    height: number = 13,
    percent?: number
  ) {
    return this.h("g", {}, [
      this.h("circle", {
        cx: `${x + 4}`,
        cy: `${y + 2 + height / 2}`,
        r: "4",
        fill: this.langColors(name),
      }),
      this.h(
        "text",
        { x: `${x + 16}`, y: `${y + height}`, fill: "#C9D1D9", class: "text" },
        [name]
      ),
      percent
        ? this.h(
            "text",
            {
              x: `${
                x +
                (width -
                  (Math.floor(percent) + "%").length * ((height - 4) / 2))
              }`,
              y: `${y + height}`,
              fill: "#8B949E",
              class: "text_percent",
            },
            [`${Math.floor(percent)}%`]
          )
        : "",
    ]);
  }

  langsSVG(
    langs: { name: string; percent: number }[],
    options: { width: number; fontStyle: string; fontSize: number }
  ) {
    return this.h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${options.width} ${
          langs.length * (options.fontSize + 11) + 23
        }`,
        width: `${options.width}`,
        height: `${langs.length * (options.fontSize + 11) + 23}`,
        style: "background: #0D1117; border-radius: 6px;",
      },
      [
        this.h("style", {}, [
          `
          .text { font: ${options.fontStyle} ${options.fontSize}px sans-serif; }
          .text_percent { font: ${options.fontStyle} ${options.fontSize}px monospace; }
          `,
        ]),
        this.linePie(10, 10, options.width - 20, langs),
        langs.reduce((accum, lang, i) => {
          return (accum += this.lang(
            10,
            26 + i * (options.fontSize + 10),
            lang.name,
            options.width - 30,
            options.fontSize,
            lang.percent
          ));
        }, ""),
      ]
    );
  }
}
