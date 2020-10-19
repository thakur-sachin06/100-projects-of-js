const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

const navItems = [nav1, nav2, nav3, nav4, nav5];

function toggleNavItems(navItem, classToAdd, classToRemove) {
  navItem.classList.add(classToAdd);
  navItem.classList.remove(classToRemove);
}

function toggleNavigation() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-active");

  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");

    navItems.forEach((navItem, i) =>
      toggleNavItems(navItem, `slide-in-${i + 1}`, `slide-out-${i + 1}`)
    );
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    navItems.forEach((navItem, i) =>
      toggleNavItems(navItem, `slide-out-${i + 1}`, `slide-in-${i + 1}`)
    );
  }
}
menuBars.addEventListener("click", toggleNavigation);
navItems.forEach((navItem, i) =>
  navItem.addEventListener("click", toggleNavigation)
);
