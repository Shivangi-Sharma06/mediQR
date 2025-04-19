import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEwXfkRBdKaubahxuCUCBDLqRtML8UdBw",
  authDomain: "mediqr1-628bb.firebaseapp.com",
  projectId: "mediqr1-628bb",
  storageBucket: "mediqr1-628bb.firebasestorage.app",
  messagingSenderId: "866609613370",
  appId: "1:866609613370:web:c1cb932b0a6726dc460303",
  measurementId: "G-S46MRP45N7"
};

// 👇 this avoids initializing multiple times
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
