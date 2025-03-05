import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const API_KEY = import.meta.env.VITE_API_KEY;



const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }
