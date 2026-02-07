import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "hobbytan-council",
  appId: "1:868013582007:web:701246ac35acbc0b78cf32",
  storageBucket: "hobbytan-council.firebasestorage.app",
  // Fallback to the known key if env var is missing during build
  // IMPORTANT: This key is public in client-side code anyway. 
  // Security should be enforced via HTTP Referrer restrictions in Google Cloud Console.
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCbOSNdle_44YlwPc-TtY2zzNJAk6T3rB4",
  authDomain: "hobbytan-council.firebaseapp.com",
  messagingSenderId: "868013582007",
  measurementId: "G-T3VK216GVD",
};

let app;
let db;
let auth;

try {
    console.log("🔥 Initializing Firebase...");
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log("✅ Firebase Initialized:", app.name);
} catch (e) {
    console.error("❌ Firebase Initialization Failed:", e);
    // Prevent app crash on init failure, but functionality will be broken
}

export { app, db, auth };
