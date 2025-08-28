import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Check if Firebase keys are available
const hasFirebaseConfig = !!(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID && 
  import.meta.env.VITE_FIREBASE_APP_ID
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:demo-app-id",
};

// Only add databaseURL if we have a real Firebase project configured
if (hasFirebaseConfig) {
  (firebaseConfig as any).databaseURL = `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`;
}

let app: any;
let auth: any;
let db: any;
let storage: any;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  if (hasFirebaseConfig) {
    db = getDatabase(app);
    storage = getStorage(app);
  } else {
    // Running without database - auth only mode
    db = null;
    storage = null;
    console.warn('Firebase not fully configured - limited functionality. Please set up Firebase project for full features.');
  }
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  auth = null;
  db = null;
  storage = null;
}

export { auth, db, storage };
export default app;
export const isFirebaseConfigured = hasFirebaseConfig;
