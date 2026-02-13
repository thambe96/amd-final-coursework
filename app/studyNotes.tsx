import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const StudyNotesScreen = () => {
  const { examId, title } = useLocalSearchParams<{ examId: string, title: string }>();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "exams", examId, "notes"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
  }, [examId]);

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-6 pt-14 pb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</Text>
          <Text className="text-3xl font-black text-slate-900">Study Notes</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.back()}
          className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100"
        >
          <Ionicons name="close" size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#6366f1" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => router.push({ pathname: "/noteEditor", params: { examId, noteId: item.id, initialTitle: item.title, initialContent: item.content } })}
              className="bg-white p-6 rounded-[30px] mb-4 shadow-sm border border-slate-50"
            >
              <Text className="text-slate-900 font-bold text-lg mb-2">{item.title}</Text>
              <Text className="text-slate-400 text-sm" numberOfLines={3}>{item.content}</Text>
              <View className="mt-4 flex-row items-center">
                <MaterialIcons name="access-time" size={14} color="#cbd5e1" />
                <Text className="text-slate-300 text-[10px] ml-1 uppercase font-bold">Updated Recently</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <View className="bg-blue-50 p-6 rounded-full mb-4">
                <MaterialIcons name="description" size={40} color="#3b82f6" />
              </View>
              <Text className="text-slate-400 text-center px-10">No notes yet. Capture your thoughts and summaries here.</Text>
            </View>
          }
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={() => router.push({ pathname: "/noteEditor", params: { examId } })}
        className="absolute bottom-10 right-8 bg-blue-600 px-6 py-4 rounded-full shadow-2xl flex-row items-center"
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text className="text-white font-bold ml-2">New Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudyNotesScreen;