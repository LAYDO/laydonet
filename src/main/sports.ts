import "../styles/site.css";
import "../styles/apps.css";
import "../lib/client/site-shell";
import { initSportsLanding, initSportsTeamPage } from "../lib/client/sports";

document.addEventListener("DOMContentLoaded", () => {
  initSportsLanding(document.getElementById("sports-root"));
  void initSportsTeamPage(document.getElementById("sports-team-root"));
});
