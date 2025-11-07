if (window.ZF_LOADED_VOICE) { console.log("voice.js already loaded (skipped)"); }
else {
  window.ZF_LOADED_VOICE = true;
// ---- existing voice.js code starts below this line ----

// Loaded: core/voice.js
console.log("Loaded: core/voice.js");
window.ZF = window.ZF || {};

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const voiceStatusEl = ()=> document.getElementById("voiceStatus");
const micButtons = ()=> [document.getElementById("heroMic"), document.getElementById("bb_mic")].filter(Boolean);

ZF.voice = {
  recognizer: new SR(),
  say(text, opts={}) {
    const s = ZF.getSettings?.() || {};
    if (!s.soundEnabled) return;
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? 1;
    u.pitch = opts.pitch ?? 1;
    const vs = speechSynthesis.getVoices();
    u.voice = vs.find(v=>v.lang?.startsWith("en")) || vs[0];
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    r.continuous = true; // keep stream open if allowed

  },
  listen() {
    const s = ZF.getSettings?.() || {};
    if (!s.voiceEnabled) { this.say("Voice disabled in settings."); return; }
    if (!this.recognizer) { alert("Voice recognition not supported in this browser."); return; }
    try { this.recognizer.start(); } catch {}
  }
};

// configure recognizer events + UI pulse
if (ZF.voice.recognizer) {
  const r = ZF.voice.recognizer;
  r.lang = "en-US";
  r.interimResults = false;
  r.maxAlternatives = 1;

  r.onend = ()=>{
  const el = voiceStatusEl(); if (el) el.textContent = "Idle";
  document.body.classList.remove("zf-listening");
  micButtons().forEach(b=> b.style.boxShadow = "none");
  const s = ZF.getSettings?.() || {};
  // auto-restart if hot mic enabled
  if (s.hotMicEnabled) { try { r.start(); } catch{} }
  };

  r.onresult = (e)=>{
  const text = e.results[0][0].transcript.trim();
  const lower = text.toLowerCase();
  const el = voiceStatusEl(); if (el) el.textContent = `Heard: “${text}”`;
  const s = ZF.getSettings?.() || {};
  if (s.wakeWordEnabled && lower === "zoul") {
    ZF.voice.say("Online.");
    return; // “zoul” used as wake/ack
  }
  window.dispatchEvent(new CustomEvent("voice:heard", { detail: text }));
  ZF.voice.handleCommand(text);
};

  r.onerror = (e)=>{
    const el = voiceStatusEl(); if (el) el.textContent = `Voice error: ${e.error}`;
  };
}

// command router
ZF.voice.handleCommand = function(raw){
  const s = raw.toLowerCase();

  // navigation
  const go = (sel)=> {
    const el = document.querySelector(sel);
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };
  if (s.includes("open chat")) { go("#chat-section"); return ZF.voice.say("Opening chat."); }
  if (s.includes("open tasks") || s.includes("planner")) { go("#planner-section"); return ZF.voice.say("Opening planner."); }
  if (s.includes("open sos") || s.includes("emergency")) { go("#sos-section"); return ZF.voice.say("Opening emergency."); }

  // toggles
  const st = ZF.getSettings();
  const save = ()=> { ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); };
  if (s.startsWith("enable ")) {
    if (s.includes("sos")) { st.sosEnabled = true; save(); return ZF.voice.say("SOS enabled."); }
    if (s.includes("voice")) { st.voiceEnabled = true; save(); return ZF.voice.say("Voice enabled."); }
    if (s.includes("planner")) { st.plannerEnabled = true; save(); return ZF.voice.say("Planner enabled."); }
  }
  if (s.startsWith("disable ")) {
    if (s.includes("sos")) { st.sosEnabled = false; save(); return ZF.voice.say("SOS disabled."); }
    if (s.includes("voice")) { st.voiceEnabled = false; save(); return ZF.voice.say("Voice disabled."); }
    if (s.includes("planner")) { st.plannerEnabled = false; save(); return ZF.voice.say("Planner disabled."); }
  }

  // modes
  if (s.startsWith("switch to ")) {
    const name = s.replace("switch to ","").trim();
    window.dispatchEvent(new CustomEvent("ai:switch", { detail: name }));
    return ZF.voice.say(`Switching to ${name} mode.`);
  }
  if (s.includes("activate shadow reaper") || s.includes("zoul activate x")) {
    window.dispatchEvent(new Event("ai:xmode"));
    return ZF.voice.say("Awakening Shadow Reaper.");
  }

  if (s.includes("sign out")) { ZF.auth?.signOut?.(); return ZF.voice.say("Signed out."); }

  // fallback → chat
  window.dispatchEvent(new CustomEvent("chat:fromVoice", { detail: raw }));
  ZF.voice.say("Processing.");
};

// wire buttons
document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("heroMic")?.addEventListener("click", ()=> ZF.voice.listen());
});
} // end guard

