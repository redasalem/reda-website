import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyD3fempHbWWycug5FSP3dBnpNdpZFV53i8",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "portfolio-projects-4d586.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "portfolio-projects-4d586",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "portfolio-projects-4d586.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "907853502682",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:907853502682:web:512da8868d943c0ae72de3",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-TRHHMMT7EZ",
};

export const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "redasalem287@gmail.com"
)
  .trim()
  .toLowerCase();

let firebaseApp: FirebaseApp | null = null;
let analyticsPromise: Promise<import("firebase/analytics").Analytics | null> | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp;
  }

  firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return firebaseApp;
}

export async function loadFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      const analyticsModule = await import("firebase/analytics");

      if (!(await analyticsModule.isSupported())) {
        return null;
      }

      return analyticsModule.getAnalytics(getFirebaseApp());
    })();
  }

  return analyticsPromise;
}
