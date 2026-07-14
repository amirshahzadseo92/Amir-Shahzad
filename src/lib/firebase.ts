import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "quiet-grammar-bszp9",
  appId: "1:695437400606:web:d826909de9e173bb092c0f",
  apiKey: "AIzaSyCrhPkOKv4bw_s_wOZ6EHoFW02pb3bB2WI",
  authDomain: "quiet-grammar-bszp9.firebaseapp.com",
  storageBucket: "quiet-grammar-bszp9.firebasestorage.app",
  messagingSenderId: "695437400606",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-apexos-91042d7f-dd34-4bfc-8d63-9ac624eaf6b2");
