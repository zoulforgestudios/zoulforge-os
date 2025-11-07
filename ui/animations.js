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

// core burst when switching AI
(function coreBursts(){
  function burst(color){
    const orb = document.querySelector(".zf-orb"); if(!orb) return;
    const ring = document.createElement("div");
    ring.style.position="absolute";
    ring.style.inset="20px";
    ring.style.borderRadius="50%";
    ring.style.border=`2px solid ${color}`;
    ring.style.boxShadow=`0 0 18px ${color}`;
    ring.style.opacity="0.9";
    orb.appendChild(ring);
    ring.animate([
      { transform:"scale(0.8)", opacity:0.9 },
      { transform:"scale(1.25)", opacity:0 }
    ], { duration: 700, easing:"cubic-bezier(.2,.6,.2,1)" }).onfinish=()=> ring.remove();
  }

  const themeColor = ()=>{
    const cs = getComputedStyle(document.body);
    return cs.getPropertyValue("--zf-primary")?.trim() || "#b46bff";
  };

  window.addEventListener("ai:switch", (e)=>{
    burst(themeColor());
  });
  window.addEventListener("ai:xmode", ()=>{
    // triple burst
    const c = themeColor();
    burst(c); setTimeout(()=>burst(c),130); setTimeout(()=>burst(c),260);
  });
})();
