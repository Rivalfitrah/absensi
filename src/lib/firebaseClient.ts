// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { get } from "http";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe95NGZas2fv0Bmkose0oNDEue2qtB8oE",
  authDomain: "myapp-f4827.firebaseapp.com",
  projectId: "myapp-f4827",
  storageBucket: "myapp-f4827.firebasestorage.app",
  messagingSenderId: "993293545604",
  appId: "1:993293545604:web:72c5bc5252458f714412d1",
  measurementId: "G-ZVGPHEL5K8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
