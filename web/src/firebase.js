import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "hobbytan-council",
  appId: "1:868013582007:web:701246ac35acbc0b78cf32",
  storageBucket: "hobbytan-council.firebasestorage.app",
  apiKey: "AIzaSyCbOSNdle_44YlwPc-TtY2zzNJAk6T3rB4",
  authDomain: "hobbytan-council.firebaseapp.com",
  messagingSenderId: "868013582007",
  measurementId: "G-T3VK216GVD",
};

console.log("🔥 Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
console.log("✅ Firebase Initialized:", app.name);

export { app, db, auth };
