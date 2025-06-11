
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmVO_odnaryiyi9jfsoGeoLHPZcakYww4",
  authDomain: "hangout-app-40038.firebaseapp.com",
  projectId: "hangout-app-40038",
  storageBucket: "hangout-app-40038.firebasestorage.app",
  messagingSenderId: "129868118855",
  appId: "1:129868118855:web:6364c737ea93431f62ea62"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
