// types.ts
import { Timestamp } from 'firebase/firestore';

export interface Exam {
  id: string;
  name: string;
  note: string;
  date: Timestamp;
  priority: 'Low' | 'Medium' | 'High';
  reminder: boolean;
  userId: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
}