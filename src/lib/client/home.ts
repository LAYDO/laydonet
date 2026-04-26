export function initHomePage() {
  const arrow = document.getElementById("laydoArrowDown");
  if (!arrow) {
    return;
  }

  const syncArrow = () => {
    arrow.classList.toggle("fade-out-bottom", window.scrollY > window.innerHeight * 0.1);
  };

  window.addEventListener("scroll", syncArrow, { passive: true });
  syncArrow();
}
