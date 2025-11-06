console.log("Loaded: <chat.js>");

// Loaded: features/chat.js
console.log("Loaded: features/chat.js");

(function chatVoiceBridge(){
  const input = document.getElementById("userInput");
  const send = document.getElementById("sendBtn");
  if (!input || !send) return;

  window.addEventListener("chat:fromVoice", (e)=>{
    input.value = e.detail || "";
    send.click();
  });

  // Disable by settings
  function apply() {
    const s = ZF.getSettings();
    input.disabled = !s.aiChatEnabled;
    send.disabled = !s.aiChatEnabled;
    input.parentElement?.style && (input.parentElement.style.opacity = s.aiChatEnabled? "1" : ".5");
  }
  apply();
  window.addEventListener("settings:changed", apply);
})();
