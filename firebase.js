// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZij2sKItgweVCJh4zFh-DM3xp4V4MnpU",
  authDomain: "frontend-gdgoc.firebaseapp.com",
  projectId: "frontend-gdgoc",
  storageBucket: "frontend-gdgoc.firebasestorage.app",
  messagingSenderId: "868930502898",
  appId: "1:868930502898:web:911658b3f9ede245e9106b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
