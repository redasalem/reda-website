"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export function getStudioFirebase() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  if (Object.values(config).some(value => !value)) throw new Error("Firebase is not configured. Set the four NEXT_PUBLIC_FIREBASE variables and rebuild.");
  const app = getApps().find(item => item.name === "studio") || initializeApp(config, "studio");
  return { auth: getAuth(app), db: getFirestore(app) };
}
