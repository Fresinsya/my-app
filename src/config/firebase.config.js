import { initializeApp, getApp, getApps } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFZ6icL8CE00yIzolW4iIqiTQP2VReZcM",
  authDomain: "e-canteen-1f99d.firebaseapp.com",
  databaseURL: "https://e-canteen-1f99d-default-rtdb.firebaseio.com",
  projectId: "e-canteen-1f99d",
  storageBucket: "e-canteen-1f99d.appspot.com",
  messagingSenderId: "1036430418844",
  appId: "1:1036430418844:web:f6ae3230de20698bbcde59",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = await doc(firestore, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    try {
      await setDoc(userRef, {
        email: user.email,
        namaLengkap: additionalData.namaLengkap,
        noTelpon: additionalData.noTelpon,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("error in creating user", error);
    }
  }
};