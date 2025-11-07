if (window.ZF_LOADED_SETTINGS) { console.log("settings.js already loaded (skipped)"); }
else {
  window.ZF_LOADED_SETTINGS = true;
// ---- existing settings.js code starts below this line ----

// Loaded: core/settings.js
console.log("Loaded: core/settings.js");
window.ZF = window.ZF || {};

const DEFAULT_SETTINGS = {
  voiceEnabled: true,
  aiChatEnabled: true,
  plannerEnabled: true,
  sosEnabled: true,
  soundEnabled: true,
  theme: "zoul",
  aiModes: {
    Zoul: true, Sypher: true, Havion: true, Auralis: true, Draxen: true, Oblivion: true,
    Wyntra: true, Raithe: true, Elyndra: true, Aetherion: true, Eclix: true, Requiem: true
  }
};
const SETTINGS_KEY = "zoulforge_settings";

ZF.getSettings = ()=> {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { ...DEFAULT_SETTINGS }; }
  catch { return { ...DEFAULT_SETTINGS }; }
};
ZF.saveSettings = (next)=> localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));

function buildSettingsUI(){
  const host = document.getElementById("settingsBody");
  if (!host) return;

  const s = ZF.getSettings();
  host.innerHTML = `
    <div>
      <div style="opacity:.8;margin-bottom:6px;">Core</div>
      ${t("voiceEnabled","Voice recognition")}
      ${t("aiChatEnabled","AI chat")}
      ${t("plannerEnabled","Task planner")}
      ${t("sosEnabled","SOS (prototype)")}
      ${t("soundEnabled","Sound / TTS")}
    </div>
    <div style="margin-top:12px">
      <div style="opacity:.8;margin-bottom:6px;">Theme</div>
      <select id="zf_theme" style="width:100%;padding:8px;border-radius:8px;background:#131318;border:1px solid #242433;color:#ddd">
        ${["zoul","veil","verse","voltrix","abyzor","nythera"].map(v=>`<option value="${v}" ${s.theme===v?"selected":""}>${v.toUpperCase()}</option>`).join("")}
      </select>
    </div>
    <div style="margin-top:12px">
      <div style="opacity:.8;margin-bottom:6px;">AI Modes (Shadow Reaper)</div>
      <div id="zf_ai_modes" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;"></div>
    </div>
  `;

  ["voiceEnabled","aiChatEnabled","plannerEnabled","sosEnabled","soundEnabled"].forEach(key=>{
    const el = document.getElementById(`zf_${key}`);
    el.checked = !!s[key];
    el.onchange = ()=> {
      const cur = ZF.getSettings();
      cur[key] = !!el.checked;
      ZF.saveSettings(cur);
      window.dispatchEvent(new CustomEvent("settings:changed", { detail:{ key, value:cur[key] }}));
    };
  });

  const theme = document.getElementById("zf_theme");
  theme.onchange = ()=>{
    const cur = ZF.getSettings();
    cur.theme = theme.value;
    ZF.saveSettings(cur);
    window.dispatchEvent(new CustomEvent("settings:changed", { detail:{ key:"theme", value:cur.theme }}));
  };

  const grid = document.getElementById("zf_ai_modes");
  grid.innerHTML = Object.keys(s.aiModes).map(name=>{
    const id = `ai_${name}`;
    return `<label style="display:flex;gap:8px;align-items:center;background:#0f0f14;border:1px solid #1f1f26;padding:8px;border-radius:8px">
      <input id="${id}" type="checkbox" ${s.aiModes[name]?"checked":""}/>
      <span>${name}</span>
    </label>`;
  }).join("");
  Object.keys(s.aiModes).forEach(name=>{
    const el = document.getElementById(`ai_${name}`);
    el.onchange = ()=>{
      const cur = ZF.getSettings();
      cur.aiModes[name] = !!el.checked;
      ZF.saveSettings(cur);
      window.dispatchEvent(new CustomEvent("settings:changed", { detail:{ key:"aiModes", value:{...cur.aiModes} }}));
    };
  });

  function t(key,label){
    return `<label style="display:flex;justify-content:space-between;align-items:center;background:#0f0f14;border:1px solid #1f1f26;padding:10px 12px;border-radius:10px;margin-bottom:8px">
      <span>${label}</span>
      <input id="zf_${key}" type="checkbox"/>
    </label>`;
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  buildSettingsUI();
  const drawer = document.getElementById("settingsDrawer");
  const openBtn = document.getElementById("burgerToggle");
  const closeBtn = document.getElementById("closeDrawer");
  const open = ()=> drawer.style.transform = "translateX(0%)";
  const close = ()=> drawer.style.transform = "translateX(100%)";
  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  document.getElementById("openSettingsQL")?.addEventListener("click", open);
});
}