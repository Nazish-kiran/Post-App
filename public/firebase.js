import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDGGTNECtwKAwpfUXBdIZblLJ17e7-l1ig",
  authDomain: "coranu-c91ab.firebaseapp.com",
  projectId: "coranu-c91ab",
  storageBucket: "coranu-c91ab.firebasestorage.app",
  messagingSenderId: "203489120912",
  messagingSenderId: "203489120912",
  appId: "1:203489120912:web:39e8ab085eed7841b5be15"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
};
