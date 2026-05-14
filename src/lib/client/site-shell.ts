const themeKey = "laydo-theme";

function setTheme(theme: "theme-light" | "theme-dark") {
  document.documentElement.classList.remove("theme-light", "theme-dark");
  document.documentElement.classList.add(theme);
  localStorage.setItem(themeKey, theme);
}

function toggleTheme() {
  const current = document.documentElement.classList.contains("theme-dark") ? "theme-dark" : "theme-light";
  setTheme(current === "theme-dark" ? "theme-light" : "theme-dark");
}

function toggleOverlay(force?: boolean) {
  const overlay = document.getElementById("laydoOverlay");
  const navIcon = document.getElementById("laydoNavIcon");
  if (!overlay || !navIcon) {
    return;
  }

  const open = typeof force === "boolean" ? force : !overlay.classList.contains("is-open");
  overlay.classList.toggle("is-open", open);
  overlay.setAttribute("aria-hidden", String(!open));
  navIcon.classList.toggle("change", open);
  navIcon.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("shell-locked", open);
}

function installScrollHide() {
  const navbar = document.getElementById("laydoMNavbar");
  if (!navbar) {
    return;
  }

  let last = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const current = window.scrollY;
      if (current < 24 || current < last) {
        navbar.classList.remove("is-hidden");
      } else {
        navbar.classList.add("is-hidden");
      }
      last = current;
    },
    { passive: true }
  );
}

function installNavigation() {
  document.getElementById("themeIcon")?.addEventListener("click", toggleTheme);
  document.getElementById("laydoNavIcon")?.addEventListener("click", () => toggleOverlay());
  document.getElementById("laydoNavTitle")?.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.pathname = "/";
  });

  document.querySelectorAll<HTMLElement>("[data-shell-link]").forEach((link) => {
    link.addEventListener("click", () => toggleOverlay(false));
  });

  document.getElementById("laydoOverlay")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      toggleOverlay(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggleOverlay(false);
    }
  });
}

function installTheme() {
  const saved = localStorage.getItem(themeKey);
  setTheme(saved === "theme-dark" ? "theme-dark" : "theme-light");
}

function installSocialLinks() {
  const map: Record<string, string> = {
    twitterIcon: "https://www.twitter.com/laydo1213",
    linkedIcon: "https://www.linkedin.com/in/landen-robinson-97683620/",
    githubIcon: "https://github.com/LAYDO"
  };

  Object.entries(map).forEach(([id, href]) => {
    document.getElementById(id)?.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  installTheme();
  installNavigation();
  installSocialLinks();
  installScrollHide();
});
