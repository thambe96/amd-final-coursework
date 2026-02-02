import { getAuth } from "firebase/auth"
import { addDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "./firebase"

const auth = getAuth()
const examsCollection = collection(db, "exams")

// Add a new exam
export const addExam = async (title: string, date: string, notes?: string) => {
  const user = auth.currentUser
  if (!user) throw new Error("User not authenticated.")

  await addDoc(examsCollection, {
    title,
    date,
    notes: notes || "",
    userId: user.uid,
    createdAt: new Date().toISOString()
  })
}

// Get all exams for current user
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