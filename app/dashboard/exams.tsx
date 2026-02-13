import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { db } from '../../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { deleteExam } from '../../services/examService';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ExamsScreen = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "exams"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setExams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      "Delete Exam",
      `Are you sure you want to delete "${title}"? This will remove all related flashcards and notes.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteExam(id) }
      ]
    );
  };

  const renderExamItem = ({ item }: { item: any }) => {
    const date = item.date?.toDate ? item.date.toDate() : new Date();

    return (
      <View className="bg-white mx-4 mb-4 p-5 rounded-[32px] shadow-sm border border-slate-50">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text className="text-slate-900 font-bold text-xl" numberOfLines={1}>{item.title}</Text>
            <Text className="text-slate-400 text-xs mt-1">
              {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </Text>
          </View>
          
          {/* Priority Tag */}
          <View className="bg-indigo-50 px-3 py-1 rounded-full">
            <Text className="text-indigo-600 text-[10px] font-black uppercase">{item.priority}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-2 border-t border-slate-50 pt-4">
          {/* Main Action: Go to Hub */}
          <TouchableOpacity 
            onPress={() => router.push({ pathname: "/examDetails", params: { examId: item.id, title: item.title } })}
            className="flex-row items-center"
          >
            <View className="bg-slate-900 px-4 py-2 rounded-xl flex-row items-center">
              <Text className="text-white font-bold text-xs mr-2">Open Hub</Text>
              <Ionicons name="arrow-forward" size={14} color="white" />
            </View>
          </TouchableOpacity>

          {/* Management Actions */}
          <View className="flex-row gap-2">
            <TouchableOpacity 
              onPress={() => router.push({ pathname: "/addExams", params: { editId: item.id } })}
              className="bg-slate-100 p-3 rounded-xl"
            >
              <MaterialIcons name="edit" size={20} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleDelete(item.id, item.title)}
              className="bg-red-50 p-3 rounded-xl"
            >
              <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) return <ActivityIndicator className="flex-1" color="#6366f1" />;

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-6 pt-16 pb-6">
        <Text className="text-3xl font-black text-slate-900">Your Exams</Text>
        <Text className="text-slate-400 font-medium">Manage your schedule and study tools</Text>
      </View>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={renderExamItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center mt-20 px-10">
            <Text className="text-slate-400 text-center">No exams scheduled. Tap 'Add' to begin!</Text>
          </View>
        }
      />
    </View>
  );
};

export default ExamsScreen;