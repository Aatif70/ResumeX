// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsEFV2QAoY6DFpAFwAjOz7xDKVqprD6hM",
  authDomain: "resumex-56f49.firebaseapp.com",
  projectId: "resumex-56f49",
  storageBucket: "resumex-56f49.appspot.com",
  messagingSenderId: "705776116624",
  appId: "1:705776116624:web:93ba8f4ac9d35ad6c64915",
  measurementId: "G-B08DR1LQZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };