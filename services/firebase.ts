// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCSdEF9_t3C6eJ0ISBmJR7Z8nc9yIuNTms",
  authDomain: "extesi-lifter.firebaseapp.com",
  projectId: "extesi-lifter",
  storageBucket: "extesi-lifter.firebasestorage.app",
  messagingSenderId: "913498063789",
  appId: "1:913498063789:web:581184189bc0cb711a5724"
};

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)