// Loaded: ui/layout.js
console.log("Loaded: ui/layout.js");

(function(){
  // set active icons based on data-page attr
  const page = document.body.getAttribute("data-page") || "home";
  const map = {
    home: "nav-home",
    chat: "nav-chat",
    tasks:"nav-tasks",
    apps:"nav-apps",
    updates:"nav-updates",
    settings:"nav-settings"
  };
  const activeId = map[page];
  if (activeId) document.getElementById(activeId)?.classList.add("active");

  // click handlers (full-page nav)
  const go = (p)=> location.href = p;
  document.getElementById("nav-home")?.addEventListener("click", ()=>go("index.html"));
  document.getElementById("nav-chat")?.addEventListener("click", ()=>go("chat.html"));
  document.getElementById("nav-tasks")?.addEventListener("click", ()=>go("tasks.html"));
  document.getElementById("nav-apps")?.addEventListener("click", ()=>go("apps.html"));
  document.getElementById("nav-updates")?.addEventListener("click", ()=>go("updates.html"));
  document.getElementById("nav-settings")?.addEventListener("click", ()=>{
    document.getElementById("settingsDrawer").style.transform = "translateX(0%)";
  });

  // channels list highlight (optional)
  document.querySelectorAll(".channel[data-link]").forEach(ch=>{
    if (ch.dataset.page === page) ch.classList.add("active");
    ch.addEventListener("click", ()=> go(ch.dataset.link));
  });
})();
