import { getAuth } from "firebase/auth"
import { addDoc, collection, getDocs, query, where, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, deleteDoc} from "firebase/firestore"
import { db } from "./firebase"
// import { onSnapshot } from "firebase/firestore";

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




// 1. Create a "Set" inside a specific Exam
export const createFlashcardSet = async (examId: string, setName: string) => {
  // Path: exams/[examId]/flashcardSets

  console.log("examId: ", examId)

  const setRef = collection(db, "exams", examId, "flashcardSets");
  return await addDoc(setRef, {
    name: setName,
    createdAt: serverTimestamp(),
  });
};

// 2. Add an Individual Card to a Set
export const addCardToSet = async (examId: string, setId: string, front: string, back: string) => {
  // Path: exams/[examId]/flashcardSets/[setId]/cards
  const cardsRef = collection(db, "exams", examId, "flashcardSets", setId, "cards");
  return await addDoc(cardsRef, {
    front,
    back,
    createdAt: serverTimestamp()
  });
};


// Update an existing exam
export const updateExam = async (examId: string, updatedData: any) => {
  const examRef = doc(db, "exams", examId);
  return await updateDoc(examRef, updatedData);
};

// Delete an exam
export const deleteExam = async (examId: string) => {
  const examRef = doc(db, "exams", examId);
  return await deleteDoc(examRef);
};




// Create a new note
export const createNote = async (examId: string, title: string, content: string) => {
  const notesRef = collection(db, "exams", examId, "notes");
  return await addDoc(notesRef, {
    title,
    content,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp()
  });
};

// Update an existing note
export const updateNote = async (examId: string, noteId: string, content: string) => {
  const noteRef = doc(db, "exams", examId, "notes", noteId);
  return await updateDoc(noteRef, {
    content,
    lastUpdated: serverTimestamp()
  });
};