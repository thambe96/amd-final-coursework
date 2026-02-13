import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, setDoc } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const registerUser = async (
  fullname: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  try {
    await updateProfile(userCredential.user, { displayName: fullname })
    console.log("profile updated successfully!")
  } catch(err) {  
    console.error("update profile faild", err)
  }

  try {
    console.log("Attempting Firestore write...")
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: fullname,
      role: "",
      email,
      createAt: Date.now()
    })
    console.log("Firestore write finished")


    return userCredential.user

  } catch(err) {
    console.error("doc update faild", err)
  }
  

}

export const logoutUser = async () => {
  await signOut(auth)
  AsyncStorage.clear()
  return
}


export const updateUserProfile = async (displayName: string, photoURL: string) => {
  const user = auth.currentUser;
  if (user) {
    return await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL,
    });
  }
  throw new Error("No user logged in");
};