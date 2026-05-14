export function initWeddingShell() {
  const overlay = document.getElementById("aplOverlay");
  const navIcon = document.getElementById("aplNavIcon");
  const footerButton = document.getElementById("btt");
  const navTitle = document.getElementById("aplNavTitle");

  const setOpen = (open: boolean) => {
    if (!overlay || !navIcon) {
      return;
    }
    overlay.style.width = open ? "67%" : "0";
    navIcon.classList.toggle("is-open", open);
  };

  navIcon?.addEventListener("click", () => {
    setOpen(overlay?.style.width !== "67%");
  });

  navTitle?.addEventListener("click", () => {
    window.location.href = "/";
  });

  overlay?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!overlay || !navIcon || overlay.style.width !== "67%") {
      return;
    }
    const target = event.target as Node;
    if (!overlay.contains(target) && !navIcon.contains(target)) {
      setOpen(false);
    }
  });

  footerButton?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
