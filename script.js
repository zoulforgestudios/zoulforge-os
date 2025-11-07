// Loaded: script.js
console.log("Loaded: script.js");

// Wire burger close if clicking outside (optional quick UX)
document.addEventListener("click", (e)=>{
  const drawer = document.getElementById("settingsDrawer");
  if (!drawer) return;
  const isInside = drawer.contains(e.target) || e.target.id === "burgerToggle" || e.target.id === "bb_settings";
  if (!isInside && drawer.style.transform === "translateX(0%)") {
    drawer.style.transform = "translateX(100%)";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.getElementById("settingsDrawer");
  if (drawer) drawer.style.transform = "translateX(100%)";
});
