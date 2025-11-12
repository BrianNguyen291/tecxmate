// Firebase configuration and initialization
// This file is safe to import on both client and server, but analytics only runs on client

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp | undefined;
if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
}

// Get Analytics instance (client-side only)
export const getFirebaseAnalytics = (): Analytics | null => {
  if (typeof window === "undefined") {
    return null; // Server-side: return null
  }

  if (!app) {
    return null; // Firebase not initialized
  }

  try {
    return getAnalytics(app);
  } catch (error) {
    // Analytics already initialized or error occurred
    console.warn("Firebase Analytics initialization error:", error);
    return null;
  }
};

export { app };
