import "../styles/site.css";
import "../styles/apps.css";
import "../lib/client/site-shell";
import { initTrackIss } from "../lib/client/trackiss";

document.addEventListener("DOMContentLoaded", () => {
  initTrackIss(document.getElementById("iss-root"));
});
