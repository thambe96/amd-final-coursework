import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const StudyMode = () => {
  const { examId, setId, setName } = useLocalSearchParams<{ examId: string, setId: string, setName: string }>();
  const [cards, setCards] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "exams", examId, "flashcardSets", setId, "cards"), orderBy("createdAt", "asc"));
    return onSnapshot(q, (snapshot) => {
      setCards(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator className="flex-1" color="#6366f1" />;
  if (cards.length === 0) return <View className="flex-1 items-center justify-center p-10"><Text className="text-slate-400 text-center">No cards here. Go back and add some!</Text></View>;

  const currentCard = cards[index];

  return (
    <View className="flex-1 bg-slate-50 p-6 pt-12">
      {/* Progress Bar */}
      <View className="mb-8">
        <View className="flex-row justify-between mb-2">
          <Text className="text-slate-400 font-bold">{setName}</Text>
          <Text className="text-indigo-600 font-black">{index + 1} / {cards.length}</Text>
        </View>
        <View className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <View className="h-full bg-indigo-500" style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
        </View>
      </View>

      {/* Card Display */}
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => setShowAnswer(!showAnswer)}
        className={`h-80 w-full rounded-[40px] shadow-xl p-8 items-center justify-center border-b-8 ${showAnswer ? 'bg-indigo-600 border-indigo-800' : 'bg-white border-slate-200'}`}
      >
        <Text className={`font-bold uppercase text-[10px] tracking-widest mb-4 ${showAnswer ? 'text-indigo-200' : 'text-slate-400'}`}>
          {showAnswer ? "The Answer" : "The Question"}
        </Text>
        <Text className={`text-2xl font-bold text-center ${showAnswer ? 'text-white' : 'text-slate-800'}`}>
          {showAnswer ? currentCard.back : currentCard.front}
        </Text>
        <Text className={`mt-10 text-[10px] italic ${showAnswer ? 'text-indigo-300' : 'text-slate-300'}`}>Tap to Flip</Text>
      </TouchableOpacity>

      {/* Navigation */}
      <View className="flex-row justify-between mt-12">
        <TouchableOpacity 
          onPress={() => { setIndex(Math.max(0, index - 1)); setShowAnswer(false); }}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => { if(index < cards.length - 1) { setIndex(index + 1); setShowAnswer(false); } }}
          className="bg-slate-900 flex-1 ml-4 p-5 rounded-3xl items-center justify-center shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Next Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudyMode;