// Loaded: ui/bottom-bar.js
console.log("Loaded: ui/bottom-bar.js");

(function renderBottom(){
  const host = document.getElementById("bottomBar");
  if (!host) return;
  host.style.position = "fixed";
  host.style.bottom = "0";
  host.style.left = "0";
  host.style.right = "0";
  host.style.height = "70px";
  host.style.background = "#0b0b0f";
  host.style.borderTop = "1px solid #1f1f26";
  host.style.display = "flex";
  host.style.justifyContent = "space-around";
  host.style.alignItems = "center";
  host.style.zIndex = "55";

  host.innerHTML = `
    <button id="bb_chat" title="Chat" class="bb">💬</button>
    <button id="bb_tasks" title="Tasks" class="bb">📅</button>
    <button id="bb_mic" title="Zoul Voice" class="bb" style="border-radius:50%;padding:12px 16px">🎙️</button>
    <button id="bb_sos" title="SOS" class="bb">🚨</button>
    <button id="bb_settings" title="Settings" class="bb">⚙️</button>
  `;
  Array.from(host.querySelectorAll(".bb")).forEach(b=>{
    b.style.background = "#16161b";
    b.style.border = "1px solid #242433";
    b.style.color = "#ddd";
    b.style.padding = "10px 14px";
    b.style.borderRadius = "12px";
    b.style.cursor = "pointer";
  });

  const go = (sel)=> {
    const el = document.querySelector(sel);
    if (el) window.scrollTo({ top: el.offsetTop, behavior:"smooth" });
  };

  document.getElementById("bb_chat")?.addEventListener("click", ()=> go("#chat-section"));
  document.getElementById("bb_tasks")?.addEventListener("click", ()=> go("#planner-section"));
  document.getElementById("bb_sos")?.addEventListener("click", ()=> go("#sos-section"));
  document.getElementById("bb_mic")?.addEventListener("click", ()=> ZF.voice.listen());
  document.getElementById("bb_settings")?.addEventListener("click", ()=> {
    document.getElementById("settingsDrawer").style.transform = "translateX(0%)";
  });

  // quick links on home
  document.querySelectorAll(".quick-link").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const t = btn.getAttribute("data-target");
      if (t) go(t);
      if (btn.id === "openSettingsQL") {
        document.getElementById("settingsDrawer").style.transform = "translateX(0%)";
      }
    });
  });
})();
