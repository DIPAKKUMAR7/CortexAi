import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-bf9a3.firebaseapp.com",
  projectId: "cortexai-bf9a3",
  storageBucket: "cortexai-bf9a3.firebasestorage.app",
  messagingSenderId: "233437917172",
  appId: "1:233437917172:web:7c71875e119f9da2edd3a1",
  measurementId: "G-KT6820XS56"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();
