// Loaded: ui/animations.js
console.log("Loaded: ui/animations.js");
window.ZF = window.ZF || {};

(function mountOrb(){
  const host = document.getElementById("zfParticles");
  if (!host) return;

  function spawnParticle(){
    const p = document.createElement("div");
    p.className = "zf-particle";
    // random direction
    const r = (min,max)=> Math.random()*(max-min)+min;
    const radius = r(60, 100);
    const angle = r(0, Math.PI*2);
    const dx = Math.cos(angle)*radius;
    const dy = Math.sin(angle)*radius;
    p.style.setProperty("--dx", `${dx}px`);
    p.style.setProperty("--dy", `${dy}px`);
    // start near center
    p.style.left = "calc(50% - 3px)";
    p.style.top  = "calc(50% - 3px)";
    host.appendChild(p);
    setTimeout(()=> p.remove(), 3000);
  }

  // gentle particle loop
  setInterval(spawnParticle, 260);
})();

// react to theme to add a subtle halo
(function halo(){
  const orb = document.querySelector(".zf-orb");
  if (!orb) return;
  const apply = ()=>{
    // we could adapt filter intensity if needed
    // left for future: different glows per theme
  };
  apply();
  window.addEventListener("settings:changed", (e)=>{
    if (e?.detail?.key === "theme") apply();
  });
})();
