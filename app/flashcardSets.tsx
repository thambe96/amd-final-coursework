import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../components/commonHeader';

const FlashcardSetsScreen = () => {
  const { examId, title } = useLocalSearchParams<{ examId: string, title: string }>();
  const [sets, setSets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Listen for sets belonging only to this specific exam
    const q = query(
      collection(db, "exams", examId, "flashcardSets"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const setsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSets(setsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [examId]);

  const renderSetItem = ({ item }: { item: any }) => (
    <View className="bg-white mx-6 mb-4 p-5 rounded-[30px] shadow-sm border border-slate-50 flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="text-slate-900 font-bold text-lg mb-1">{item.name}</Text>
        <View className="flex-row items-center">
          <MaterialIcons name="layers" size={14} color="#94a3b8" />
          <Text className="text-slate-400 text-xs ml-1 font-medium">
            Click to start studying
          </Text>
        </View>
      </View>

      <View className="flex-row gap-2">
        {/* Add more cards to this set */}
        <TouchableOpacity 
          onPress={() => router.push({ pathname: "/addCards", params: { examId, setId: item.id, setName: item.name } })}
          className="bg-slate-100 p-3 rounded-2xl active:bg-slate-200"
        >
          <MaterialIcons name="add" size={24} color="#64748b" />
        </TouchableOpacity>

        {/* Study this set */}
        <TouchableOpacity 
          onPress={() => router.push({ pathname: "/studyMode", params: { examId, setId: item.id, setName: item.name } })}
          className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Ionicons name="play" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      {/* Custom Header */}
      {/* <View className="px-6 pt-12 pb-6">
        <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</Text>
        <Text className="text-3xl font-black text-slate-900">Flashcard Sets</Text>
      </View> */}

      <ScreenHeader title="Flashcard Sets" subtitle={title as string} />

      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" className="mt-10" />
      ) : (
        <FlatList
          data={sets}
          keyExtractor={(item) => item.id}
          renderItem={renderSetItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center justify-center mt-20 px-12">
              <View className="bg-indigo-50 p-6 rounded-full mb-4">
                <MaterialIcons name="Style" size={48} color="#6366f1" />
              </View>
              <Text className="text-slate-800 font-bold text-xl text-center">No sets yet</Text>
              <Text className="text-slate-400 text-center mt-2">
                Break your subject down into smaller sets to study effectively.
              </Text>
            </View>
          }
        />
      )}

      {/* Floating Action Button to Create New Set */}
      <TouchableOpacity 
        onPress={() => router.push({ pathname: "/createSet", params: { examId } })}
        className="absolute bottom-10 right-8 bg-slate-900 flex-row px-6 py-4 rounded-full shadow-2xl items-center"
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text className="text-white font-bold ml-2">New Set</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlashcardSetsScreen;