// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa9qe-rOvdwBfAwYfPQlpmOEzD609mBDc",
  authDomain: "file-69aa2.firebaseapp.com",
  projectId: "file-69aa2",
  storageBucket: "file-69aa2.appspot.com",
  messagingSenderId: "1000692580279",
  appId: "1:1000692580279:web:d9f84d2808c64eedb6b232"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage, Firestore, and Auth
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

export { storage, db, auth }; // Export the Auth service
