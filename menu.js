const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector("#primary-navigation");

if (menuButton && menu) {
  const menuLabel = menuButton.querySelector("span:first-child");
  const menuIcon = menuButton.querySelector(".nav-toggle-icon");

  const setExpanded = (expanded) => {
    menuButton.setAttribute("aria-expanded", String(expanded));
    menu.classList.toggle("is-open", expanded);

    if (menuLabel) menuLabel.textContent = expanded ? "Close menu" : "Menu";
    if (menuIcon) menuIcon.textContent = expanded ? "×" : "☰";
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    setExpanded(!isExpanded);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setExpanded(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setExpanded(false);
      menuButton.focus();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen && !menu.contains(event.target) && !menuButton.contains(event.target)) {
      setExpanded(false);
    }
  });

  const desktopBreakpoint = window.matchMedia("(min-width: 801px)");
  if (desktopBreakpoint.addEventListener) {
    desktopBreakpoint.addEventListener("change", () => setExpanded(false));
  } else {
    desktopBreakpoint.addListener(() => setExpanded(false));
  }
}
