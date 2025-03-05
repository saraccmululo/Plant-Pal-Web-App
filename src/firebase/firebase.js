import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const API_KEY = import.meta.env.VITE_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_Key,
  authDomain: "plant-pals-webpage.firebaseapp.com",
  projectId: "plant-pals-webpage",
  storageBucket: "plant-pals-webpage.firebasestorage.app",
  messagingSenderId: "151908866050",
  appId: "1:151908866050:web:79bd4a5303bc286590ef1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }
