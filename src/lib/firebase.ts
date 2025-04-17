// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:  "AIzaSyDEwXfkRBdKaubahxuCUCBDLqRtML8UdBw",
  authDomain: "mediqr1-628bb.firebaseapp.com",
  projectId:  "mediqr1-628bb",
  storageBucket:  "mediqr1-628bb.firebasestorage.app",
  messagingSenderId:"866609613370", 
  appId: "1:866609613370:web:c1cb932b0a6726dc460303"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { createUserWithEmailAndPassword } from "firebase/auth";
// Removed redundant import of auth

const handleSignup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up:", userCredential.user);
  } catch (error) {
    console.error("Signup error:", error);
  }
};


import { signInWithEmailAndPassword } from "firebase/auth";

const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCredential.user);
  } catch (error) {
    console.error("Login error:", error);
  }
};


import { signOut } from "firebase/auth";

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
  }
};


import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

