import "../styles/site.css";
import "../styles/apps.css";
import "../lib/client/site-shell";
import { startWebGLDemo } from "../lib/client/webgl";

document.addEventListener("DOMContentLoaded", () => {
  startWebGLDemo("webgl-canvas");
});
