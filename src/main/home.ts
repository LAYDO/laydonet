import "../styles/site.css";
import "../styles/home.css";
import "../lib/client/site-shell";
import { initHomePage } from "../lib/client/home";

document.addEventListener("DOMContentLoaded", () => {
  initHomePage();

  document.querySelectorAll<HTMLElement>("[data-home-link]").forEach((element) => {
    element.addEventListener("click", () => {
      const href = element.dataset.homeLink;
      if (href) {
        window.location.href = href;
      }
    });
  });
});
