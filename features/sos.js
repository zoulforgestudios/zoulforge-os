console.log("Loaded: <sos.js>");

// Loaded: features/sos.js
console.log("Loaded: features/sos.js");

(function guardSOS(){
  const btn = document.getElementById("sosBtn");
  function apply() {
    const s = ZF.getSettings();
    if (!btn) return;
    btn.disabled = !s.sosEnabled;
    btn.style.opacity = s.sosEnabled ? "1" : ".5";
    btn.title = s.sosEnabled ? "SOS — SEND HELP" : "SOS disabled in Settings";
  }
  apply();
  window.addEventListener("settings:changed", apply);
})();
