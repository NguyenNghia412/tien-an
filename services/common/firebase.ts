// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSrttzHtsYLctUEuN_RN_JUVIua_S-Hgg",
  authDomain: "tienan-93c69.firebaseapp.com",
  projectId: "tienan-93c69",
  storageBucket: "tienan-93c69.firebasestorage.app",
  messagingSenderId: "1080775384579",
  appId: "1:1080775384579:web:c6f85a0cd97b294614f836",
  measurementId: "G-TPX03VE76K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);