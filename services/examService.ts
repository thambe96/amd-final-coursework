import { getAuth } from "firebase/auth"
import { addDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "./firebase"
import { onSnapshot } from "firebase/firestore";

const auth = getAuth()
const examsCollection = collection(db, "exams")

export const addExam = async (
  title: string,
  date: string,
  notes?: string,
  reminder: boolean = false,
  priority: "low" | "medium" | "high" = "medium"
) => {
  const user = auth.currentUser
  if (!user) throw new Error("User not authenticated.")

  await addDoc(examsCollection, {
    title,
    date,
    notes: notes || "",
    userId: user.uid,
    createdAt: new Date().toISOString(),
    reminder,
    priority
  })
}

export const getExams = async () => {
  const user = auth.currentUser
  if (!user) throw new Error("User not authenticated.")

  const q = query(
    examsCollection,
    where("userId", "==", user.uid),
    orderBy("date", "asc")
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }))
}


export const subscribeToExams = (callback: (exams: any[]) => void) => {
  const user = auth.currentUser;
  if (!user) return () => {};

  const q = query(
    examsCollection,
    where("userId", "==", user.uid),
    orderBy("date", "asc")
  );

  // This returns an unsubscribe function to clean up the listener
  return onSnapshot(q, (snapshot) => {
    const exams = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(exams);
  });
};