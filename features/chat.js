// Loaded: features/chat.js
console.log("Loaded: features/chat.js");

function addMessage(sender, text){
  const box = document.getElementById("chatBox");
  const wrap = document.createElement("div");
  wrap.className = "msg " + (sender === "user" ? "user" : "assistant");
  wrap.innerHTML = `<div class="avatar"></div><div class="bubble"></div>`;
  wrap.querySelector(".bubble").textContent = text;
  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
}


(function chatVoiceBridge(){
  const input = document.getElementById("userInput");
  const send = document.getElementById("sendBtn");
  const chatBox = document.getElementById("chatBox");
  if (!input || !send || !chatBox) return;

  function addMessage(sender, text) {
    const p = document.createElement("p");
    p.textContent = sender === "user" ? `🧠 You: ${text}` : `🤖 ${text}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  let typingEl = null;
  function showTyping(){
    if (typingEl) return;
    typingEl = document.createElement("div");
    typingEl.className = "typing";
    typingEl.innerHTML = `<span style="margin-right:6px">🤖</span><span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    chatBox.appendChild(typingEl);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  function hideTyping(){
    if (!typingEl) return;
    typingEl.remove();
    typingEl = null;
  }

  // expose hooks for the simple AI in script.js
  window.addEventListener("chat:fromVoice", (e)=>{
    input.value = e.detail || "";
    send.click();
  });

  function applySettings() {
    const s = ZF.getSettings();
    input.disabled = !s.aiChatEnabled;
    send.disabled  = !s.aiChatEnabled;
    input.parentElement?.style && (input.parentElement.style.opacity = s.aiChatEnabled ? "1" : ".5");
  }
  window.addEventListener("settings:changed", applySettings);
  applySettings();

  // send flow
  send.addEventListener("click", ()=>{
    const text = input.value.trim();
    if (!text) return;
    addMessage("user", text);
    input.value = "";

    // typing on
    showTyping();

    // simulate AI (delegate to a tiny responder)
    setTimeout(()=>{
      hideTyping();
      // re-use the simple responder from earlier
      const ai = (document.getElementById("aiSelector")?.value) || "zoul";
      let response = "Zoul: I am here.";
      if (ai === "nythera") response = "Nythera: The light of creation flows through your words 🌸";
      else if (ai === "abyzor") response = "Abyzor: Darkness answers only to strength... ⚫";
      else if (ai === "voltrix") response = "Voltrix: Balance must prevail, even in conversation ⚖️";
      else if (ai === "verse") response = "Verse: The roars of existence echo within you 🦁";

      // print + speak
      addMessage("ai", response);
      ZF.voice?.say?.(response);
    }, 900);
  });
})();
