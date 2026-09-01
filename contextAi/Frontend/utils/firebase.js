// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "contextai-f9231.firebaseapp.com",
  projectId: "contextai-f9231",
  storageBucket: "contextai-f9231.firebasestorage.app",
  messagingSenderId: "289517388456",
  appId: "1:289517388456:web:b6f644dc10e4118a2f789d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider = new GoogleAuthProvider()

