// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore functions import after initializing Firebase

const firebaseConfig = {
  //apiKey: "AIzaSyDEwXfkRBdKaubahxuCUCBDLqRtML8UdBw",
  authDomain: "mediqr1-628bb.firebaseapp.com",
  projectId: "mediqr1-628bb",
  storageBucket: "mediqr1-628bb.firebasestorage.app",
  messagingSenderId: "866609613370", 
  appId: "1:866609613370:web:c1cb932b0a6726dc460303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it for use in other components
export const db = getFirestore(app);
