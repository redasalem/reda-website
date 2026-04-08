import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD3fempHbWWycug5FSP3dBnpNdpZFV53i8",
  authDomain: "portfolio-projects-4d586.firebaseapp.com",
  projectId: "portfolio-projects-4d586",
  storageBucket: "portfolio-projects-4d586.firebasestorage.app",
  messagingSenderId: "907853502682",
  appId: "1:907853502682:web:512da8868d943c0ae72de3",
  measurementId: "G-TRHHMMT7EZ",
};

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
