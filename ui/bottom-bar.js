console.log("Loaded: <bottom-bar.js>");
// Loaded: ui/bottom-bar.js
console.log("Loaded: ui/bottom-bar.js");

(function renderBottom(){
  const host = document.getElementById("bottomBar");
  if (!host) return;
  host.innerHTML = `
    <button id="bb_chat" title="Chat" style="background:#161616;border:1px solid #242424;color:#ddd;padding:10px 14px;border-radius:12px;cursor:pointer">💬</button>
    <button id="bb_tasks" title="Tasks" style="background:#161616;border:1px solid #242424;color:#ddd;padding:10px 14px;border-radius:12px;cursor:pointer">📅</button>
    <button id="bb_mic" title="Zoul Voice" style="background:#2a1a44;border:1px solid #4b2d7f;color:#ddd;padding:12px 16px;border-radius:50%;cursor:pointer">🎙️</button>
    <button id="bb_sos" title="SOS" style="background:#3a1010;border:1px solid #5a1a1a;color:#fff;padding:10px 14px;border-radius:12px;cursor:pointer">🚨</button>
    <button id="bb_settings" title="Settings" style="background:#161616;border:1px solid #242424;color:#ddd;padding:10px 14px;border-radius:12px;cursor:pointer">⚙️</button>
  `;

  const go = (id, sel)=> document.getElementById(id)?.addEventListener("click", ()=>{
    const el = document.querySelector(sel);
    if (el) window.scrollTo({ top: el.offsetTop, behavior:"smooth" });
  });

  go("bb_chat", "#chat-section");
  go("bb_tasks", "#planner-section");
  go("bb_sos", "#sos-section");

  document.getElementById("bb_mic")?.addEventListener("click", ()=> ZF.voice.listen());
  document.getElementById("bb_settings")?.addEventListener("click", ()=>{
    document.getElementById("settingsDrawer").style.transform = "translateX(0%)";
  });
})();
