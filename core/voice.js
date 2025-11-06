console.log("Loaded: <voice.js>");

// Loaded: core/voice.js
console.log("Loaded: core/voice.js");
window.ZF = window.ZF || {};

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
ZF.voice = {
  recognizer: SR ? new SR() : null,
  speaking: false,
  say(text, opts={}) {
    const settings = ZF.getSettings();
    if (!settings.soundEnabled) return;
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? 1;
    u.pitch = opts.pitch ?? 1;
    const voices = speechSynthesis.getVoices();
    const en = voices.find(v=>v.lang?.startsWith("en")) || voices[0];
    if (en) u.voice = en;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
};

// configure recognizer
if (ZF.voice.recognizer) {
  const r = ZF.voice.recognizer;
  r.lang = "en-US";
  r.interimResults = false;
  r.maxAlternatives = 1;

  r.onresult = (e)=>{
    const transcript = e.results[0][0].transcript.trim();
    console.log("Heard:", transcript);
    window.dispatchEvent(new CustomEvent("voice:heard", { detail: transcript }));
    ZF.voice.handleCommand(transcript);
  };
  r.onerror = (e)=> console.warn("Voice error:", e.error);
}

ZF.voice.listen = function(){
  const settings = ZF.getSettings();
  if (!settings.voiceEnabled) {
    ZF.voice.say("Voice is disabled in settings.");
    return;
  }
  if (!ZF.voice.recognizer) {
    alert("Voice recognition not supported in this browser.");
    return;
  }
  try { ZF.voice.recognizer.start(); } catch {}
};

// basic command router
ZF.voice.handleCommand = function(raw){
  const s = raw.toLowerCase();

  // navigation
  if (s.includes("open chat")) { window.scrollTo({ top: document.getElementById("chat-section")?.offsetTop || 0, behavior:"smooth"}); return ZF.voice.say("Opening chat."); }
  if (s.includes("open tasks") || s.includes("planner")) { window.scrollTo({ top: document.getElementById("planner-section")?.offsetTop || 0, behavior:"smooth"}); return ZF.voice.say("Opening planner."); }
  if (s.includes("open sos") || s.includes("emergency")) { window.scrollTo({ top: document.getElementById("sos-section")?.offsetTop || 0, behavior:"smooth"}); return ZF.voice.say("Opening emergency."); }

  // enable/disable modules
  const st = ZF.getSettings();
  if (s.startsWith("enable ")) {
    if (s.includes("sos")) { st.sosEnabled = true; ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); return ZF.voice.say("SOS enabled."); }
    if (s.includes("voice")) { st.voiceEnabled = true; ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); return ZF.voice.say("Voice enabled."); }
    if (s.includes("planner")) { st.plannerEnabled = true; ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); return ZF.voice.say("Planner enabled."); }
  }
  if (s.startsWith("disable ")) {
    if (s.includes("sos")) { st.sosEnabled = false; ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); return ZF.voice.say("SOS disabled."); }
    if (s.includes("voice")) { st.voiceEnabled = false; ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); return ZF.voice.say("Voice disabled."); }
    if (s.includes("planner")) { st.plannerEnabled = false; ZF.saveSettings(st); window.dispatchEvent(new Event("settings:changed")); return ZF.voice.say("Planner disabled."); }
  }

  // AI switching (examples)
  if (s.startsWith("switch to ")) {
    const name = s.replace("switch to ","").trim();
    window.dispatchEvent(new CustomEvent("ai:switch", { detail: name }));
    return ZF.voice.say(`Switching to ${name} mode.`);
  }

  if (s.includes("activate shadow reaper") || s.includes("zoul activate x")) {
    window.dispatchEvent(new Event("ai:xmode"));
    return ZF.voice.say("Awakening Shadow Reaper.");
  }

  if (s.includes("sign out")) {
    ZF.auth?.signOut?.();
    return ZF.voice.say("Signed out.");
  }

  // fallback: send to chat sim if available
  window.dispatchEvent(new CustomEvent("chat:fromVoice", { detail: raw }));
  ZF.voice.say("Processing.");
};
