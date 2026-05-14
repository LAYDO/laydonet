import "../styles/site.css";
import "../styles/apps.css";
import "../lib/client/site-shell";
import { initMtg } from "../lib/client/mtg";

document.addEventListener("DOMContentLoaded", () => {
  initMtg(document.getElementById("mtg-root"));
});
