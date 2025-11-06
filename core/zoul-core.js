// Loaded: core/zoul-core.js
console.log("Loaded: core/zoul-core.js");
window.ZF = window.ZF || {};

(function boot() {
  if (!sessionStorage.getItem("zf_greeted")) {
    setTimeout(()=> { ZF.voice?.say?.("Zoul online. Welcome to ZoulForge."); }, 300);
    sessionStorage.setItem("zf_greeted", "1");
  }

  const applyTheme = (t)=>{
    const map = {
      zoul: "radial-gradient(circle at top, #0a0016, #000)",
      veil: "radial-gradient(circle at top, #07070a, #000)",
      verse: "radial-gradient(circle at top, #00160a, #000)",
      voltrix: "radial-gradient(circle at top, #001216, #000)",
      abyzor: "radial-gradient(circle at top, #160000, #000)",
      nyther: "radial-gradient(circle at top, #161200, #000)"
    };
    document.body.style.background = map[t] || map.zoul;
  };

  const s = ZF.getSettings?.() || {};
  applyTheme(s.theme || "zoul");
  window.addEventListener("settings:changed", (e)=>{
    if (e?.detail?.key === "theme") applyTheme(e.detail.value);
  });
})();
