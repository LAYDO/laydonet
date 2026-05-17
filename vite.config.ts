import { resolve } from "node:path";
import { defineConfig, type HtmlTagDescriptor, type IndexHtmlTransformHook } from "vite";

const page = (path: string) => resolve(__dirname, path, "index.html");

const themeBootstrap = `try{const theme=localStorage.getItem("laydo-theme")==="theme-dark"?"theme-dark":"theme-light";document.documentElement.classList.remove("theme-light","theme-dark");document.documentElement.classList.add(theme)}catch{}`;

const devCssByPath: Array<[RegExp, string[]]> = [
  [/^\/(?:index\.html)?$/, ["/src/styles/site.css", "/src/styles/home.css"]],
  [/^\/(?:about|retired)(?:\/(?:index\.html)?)?$/, ["/src/styles/site.css", "/src/styles/home.css"]],
  [/^\/resume(?:\/(?:index\.html)?)?$/, ["/src/styles/site.css", "/src/styles/resume.css"]],
  [/^\/wedding(?:\/ourstory)?(?:\/(?:index\.html)?)?$/, ["/src/styles/wedding.css"]],
  [/^\/(?:weather|sports|jwst|mtg|trackiss|webgl)(?:\/.*)?$/, ["/src/styles/site.css", "/src/styles/apps.css"]]
];

function findDevCssLinks(path: string) {
  const normalizedPath = path.endsWith("/") ? path : path.replace(/\/index\.html$/, "/");
  return devCssByPath.find(([pattern]) => pattern.test(normalizedPath))?.[1] ?? [];
}

function laydoHtmlShellPlugin(dev: boolean) {
  const transformIndexHtml: IndexHtmlTransformHook = (html, context) => {
    const tags: HtmlTagDescriptor[] = [
      {
        tag: "script",
        attrs: { "data-laydo-theme": "" },
        children: themeBootstrap,
        injectTo: "head-prepend" as const
      }
    ];

    if (dev) {
      tags.push(
        ...findDevCssLinks(context.path).map((href) => ({
          tag: "link",
          attrs: { rel: "stylesheet", href, "data-laydo-dev-css": "" },
          injectTo: "head" as const
        }))
      );
    }

    return { html, tags };
  };

  return {
    name: "laydo-html-shell",
    transformIndexHtml
  };
}

export default defineConfig(({ command }) => ({
  plugins: [laydoHtmlShellPlugin(command === "serve")],
  publicDir: "static",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        about: page("about"),
        resume: page("resume"),
        weather: page("weather"),
        sports: page("sports"),
        sportsMariners: resolve(__dirname, "sports/mlb/team/12/index.html"),
        sportsPackers: resolve(__dirname, "sports/nfl/team/9/index.html"),
        sportsCougars: resolve(__dirname, "sports/ncaaf/team/265/index.html"),
        sportsBulls: resolve(__dirname, "sports/nba/team/4/index.html"),
        sportsPga: resolve(__dirname, "sports/golf/pga/index.html"),
        jwst: page("jwst"),
        mtg: page("mtg"),
        trackiss: page("trackiss"),
        webgl: page("webgl"),
        wedding: page("wedding"),
        weddingStory: resolve(__dirname, "wedding/ourstory/index.html"),
        retired: page("retired")
      }
    }
  }
}));
