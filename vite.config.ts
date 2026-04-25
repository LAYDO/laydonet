import { resolve } from "node:path";
import { defineConfig } from "vite";

const page = (path: string) => resolve(__dirname, path, "index.html");

export default defineConfig({
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
});
