// Loaded: ui/bottom-bar.js
console.log("Loaded: ui/bottom-bar.js");

(function renderBottom(){
  const host = document.getElementById("bottomBar");
  if (!host) return;
  host.className = "bb";
  host.innerHTML = `
    <button id="bb_home" class="bb-btn">🏠</button>
    <button id="bb_chat" class="bb-btn">💬</button>
    <button id="bb_mic" class="bb-btn round">🎙️</button>
    <button id="bb_tasks" class="bb-btn">📅</button>
    <button id="bb_apps" class="bb-btn">🪩</button>
    <button id="bb_updates" class="bb-btn">📰</button>
    <button id="bb_settings" class="bb-btn">⚙️</button>
  `;
  const go = p => location.href = p;
  document.getElementById("bb_home")?.addEventListener("click", ()=>go("index.html"));
  document.getElementById("bb_chat")?.addEventListener("click", ()=>go("chat.html"));
  document.getElementById("bb_tasks")?.addEventListener("click", ()=>go("tasks.html"));
  document.getElementById("bb_apps")?.addEventListener("click", ()=>go("apps.html"));
  document.getElementById("bb_updates")?.addEventListener("click", ()=>go("updates.html"));
  document.getElementById("bb_mic")?.addEventListener("click", ()=> ZF.voice.listen());
  document.getElementById("bb_settings")?.addEventListener("click", ()=>{
    document.getElementById("settingsDrawer").style.transform = "translateX(0%)";
  });
  
})();
