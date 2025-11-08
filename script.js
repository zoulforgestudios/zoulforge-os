// Loaded: script.js (bootstrap)
console.log("Loaded: script.js");

document.addEventListener("DOMContentLoaded", () => {
  // Keep settings drawer closed at start
  const drawer = document.getElementById("settingsDrawer");
  if (drawer) drawer.style.transform = "translateX(100%)";

  // Settings openers
  document.getElementById("openSettingsQL")?.addEventListener("click", ()=> {
    drawer && (drawer.style.transform = "translateX(0%)");
  });
  document.getElementById("closeDrawer")?.addEventListener("click", ()=> {
    drawer && (drawer.style.transform = "translateX(100%)");
  });

  // Voice mic (works even if voice is disabled gracefully)
  document.getElementById("bb_mic")?.addEventListener("click", ()=> {
    try{ ZF.voice.listen(); }catch(e){ console.warn("Voice not ready", e); }
  });
  document.getElementById("heroMic")?.addEventListener("click", ()=> {
    try{ ZF.voice.listen(); }catch(e){ console.warn("Voice not ready", e); }
  });

  // Generic navigation: anything with data-link
  document.querySelectorAll("[data-link]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const href = el.getAttribute("data-link");
      if (href) location.href = href;
    });
  });

  // Chat page: map composer IDs to your chat logic if present
  const composerInput = document.getElementById("composerInput");
  const composerSend  = document.getElementById("composerSend");
  if (composerInput && composerSend){
    // Ensure features/chat.js can find standard IDs
    if (!document.getElementById("userInput")) composerInput.id = "userInput";
    if (!document.getElementById("sendBtn"))   composerSend.id  = "sendBtn";
    if (!document.getElementById("chatBox")){
      const box = document.createElement("div");
      box.id = "chatBox";
      box.className = "gpt-scroll";
      composerInput.closest(".gpt-main")?.insertBefore(box, document.querySelector(".composer-wrap"));
    }
  }
});
