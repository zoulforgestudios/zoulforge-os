// Loaded: ui/burger-menu.js
console.log("Loaded: ui/burger-menu.js");

(function(){
  const root = document.getElementById("burgerMenu");
  if (!root) return;

  const overlay = root.querySelector(".bm-overlay");
  const closeBtn = document.getElementById("bmClose");
  const openBtn1 = document.getElementById("burgerToggle");   // topbar button
  const openBtn2 = document.getElementById("bb_settings");     // optional bottom bar settings button (if exists)
  const settingsBtn = document.getElementById("bmSettings");
  const drawer = document.getElementById("settingsDrawer");

  function openMenu(){
    root.classList.add("open");
    root.setAttribute("aria-hidden","false");
    // if settings drawer was open, close it (avoid overlap)
    if (drawer) drawer.style.transform = "translateX(100%)";
  }
  function closeMenu(){
    root.classList.remove("open");
    root.setAttribute("aria-hidden","true");
  }

  openBtn1?.addEventListener("click", openMenu);
  overlay?.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);

  // ESC key to close
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape" && root.classList.contains("open")) closeMenu();
  });

  // Settings inside burger → open settings drawer
  settingsBtn?.addEventListener("click", ()=>{
    closeMenu();
    if (drawer) drawer.style.transform = "translateX(0%)";
  });

  // Navigation items
  root.querySelectorAll(".bm-item[data-link]").forEach(el=>{
    const link = el.getAttribute("data-link");
    el.addEventListener("click", ()=>{
      closeMenu();
      if (link) location.href = link;
    });
  });

  // Highlight current page in the list
  const pageKey = document.body.getAttribute("data-page") || "";
  const pageToFile = {
    home: "index.html",
    chat: "chat.html",
    tasks:"tasks.html",
    apps: "apps.html",
    updates:"updates.html",
    ais:  "ais.html"
  };
  const current = pageToFile[pageKey];
  if (current) {
    root.querySelectorAll(".bm-item").forEach(it=>{
      if (it.getAttribute("data-link") === current) it.classList.add("active");
    });
  }
})();
