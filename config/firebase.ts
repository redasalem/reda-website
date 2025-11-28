// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3fempHbWWycug5FSP3dBnpNdpZFV53i8",
  authDomain: "portfolio-projects-4d586.firebaseapp.com",
  projectId: "portfolio-projects-4d586",
  storageBucket: "portfolio-projects-4d586.firebasestorage.app",
  messagingSenderId: "907853502682",
  appId: "1:907853502682:web:512da8868d943c0ae72de3",
  measurementId: "G-TRHHMMT7EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const db = getFirestore(app);