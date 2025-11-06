console.log("Loaded: <firebase.js>");

// Loaded: core/firebase.js
console.log("Loaded: core/firebase.js");

// ---- Replace with your Firebase console config (Project Settings > Web app) ----
const ZOULFORGE_FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  appId: "your-app-id"
};
// -----------------------------------------------------------------------------

// Safe init (don’t double init if scripts reload)
window.ZF = window.ZF || {};
(function initFirebase() {
  try {
    if (!window.firebase?.apps?.length) {
      firebase.initializeApp(ZOULFORGE_FIREBASE_CONFIG);
      console.log("Firebase initialized");
    }
    const auth = firebase.auth();
    ZF.auth = auth;

    // UI elements
    const loginBtn = document.getElementById("googleLoginBtn");
    const logoutBtn = document.getElementById("googleLogoutBtn");
    const userBadge = document.getElementById("userBadge");

    const provider = new firebase.auth.GoogleAuthProvider();

    loginBtn?.addEventListener("click", async () => {
      try {
        await auth.signInWithPopup(provider);
      } catch (e) {
        alert("Login failed: " + e.message);
      }
    });

    logoutBtn?.addEventListener("click", async () => {
      await auth.signOut();
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        userBadge.textContent = user.displayName || "User";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
      } else {
        userBadge.textContent = "Guest";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
      }
    });
  } catch (err) {
    console.error("Firebase init error", err);
  }
})();
