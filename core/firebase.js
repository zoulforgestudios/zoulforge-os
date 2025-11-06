console.log("Loaded: <firebase.js>");

// Loaded: core/firebase.js
console.log("Loaded: core/firebase.js");

// ---- Replace with your Firebase console config (Project Settings > Web app) ----
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqpviaXc_tqr4n0v17qEsltmPtCh1kl6M",
  authDomain: "zoulforge-os.firebaseapp.com",
  projectId: "zoulforge-os",
  storageBucket: "zoulforge-os.firebasestorage.app",
  messagingSenderId: "390386296141",
  appId: "1:390386296141:web:1998c47555396642ba8304",
  measurementId: "G-TTP7GGHWN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

;
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
