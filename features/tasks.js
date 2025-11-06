console.log("Loaded: <tasks.js>");

// Loaded: features/tasks.js
console.log("Loaded: features/tasks.js");

(function guardTasks(){
  const form = document.getElementById("taskForm");
  function apply() {
    const s = ZF.getSettings();
    if (!form) return;
    Array.from(form.elements).forEach(el=>{
      if (el.tagName !== "BUTTON") el.disabled = !s.plannerEnabled;
    });
    form.style.opacity = s.plannerEnabled ? "1" : ".5";
  }
  apply();
  window.addEventListener("settings:changed", apply);
})();
