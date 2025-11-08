// Loaded: ui/burger-menu.js
console.log("Loaded: ui/burger-menu.js");

(function(){
  const root = document.getElementById("burgerMenu");
  const drawer = document.getElementById("settingsDrawer");
  if (!root) return;

  const overlay = root.querySelector(".bm-overlay");
  const closeBtn = document.getElementById("bmClose");

  // openers: any element with id="burgerToggle"
  const openers = Array.from(document.querySelectorAll("#burgerToggle"));

  function openMenu(){
    root.classList.add("open");
    root.setAttribute("aria-hidden","false");
    if (drawer) drawer.style.transform = "translateX(100%)"; // don't overlap
  }
  function closeMenu(){
    root.classList.remove("open");
    root.setAttribute("aria-hidden","true");
  }

  openers.forEach(b=> b?.addEventListener("click", openMenu));
  overlay?.addEventListener("click", closeMenu);
  closeBtn?.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e)=>{ if (e.key === "Escape" && root.classList.contains("open")) closeMenu(); });

  // menu links
  root.querySelectorAll(".bm-item[data-link]").forEach(it=>{
    it.addEventListener("click", ()=>{
      const href = it.getAttribute("data-link");
      closeMenu();
      if (href) location.href = href;
    });
  });

  // highlight current
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  root.querySelectorAll(".bm-item").forEach(it=>{
    if (it.getAttribute("data-link")?.toLowerCase() === file) it.classList.add("active");
  });

  // settings from menu
  document.getElementById("bmSettings")?.addEventListener("click", ()=>{
    closeMenu();
    if (drawer) drawer.style.transform = "translateX(0%)";
  });
})();
