import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { subscribeToExams } from "../../services/examService";
import { auth } from "../../services/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // If using Expo Router

const HomeScreen = () => {
  const [exams, setExams] = useState<any[]>([]);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    // Start the live listener
    const unsubscribe = subscribeToExams((data) => {
      setExams(data);
    });

    // Stop listening when the screen is closed
    return () => unsubscribe();
  }, []);

  const renderExamCard = ({ item }: { item: any }) => {
    const date = new Date(item.date);
    
    // Logic for priority colors
    const priorityColor = 
      item.priority === 'high' ? 'bg-red-100 text-red-600' : 
      item.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600';

    return (
      <TouchableOpacity 
        onPress={() => router.push({ pathname: "/examDetails", params: { examId: item.id } })}
        className="bg-white mx-4 mb-4 p-4 rounded-3xl shadow-sm border border-slate-50 flex-row items-center"
      >
        {/* Date Icon */}
        <View className="bg-indigo-50 p-3 rounded-2xl items-center justify-center mr-4 w-16">
          <Text className="text-indigo-600 font-bold text-lg">{date.getDate()}</Text>
          <Text className="text-indigo-400 text-xs uppercase">{date.toLocaleString('default', { month: 'short' })}</Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-slate-800 font-bold text-lg" numberOfLines={1}>{item.title}</Text>
          <Text className="text-slate-400 text-sm mb-2" numberOfLines={1}>{item.notes || "No notes"}</Text>
          
          <View className="flex-row items-center">
            <View className={`px-2 py-1 rounded-lg ${priorityColor.split(' ')[0]}`}>
              <Text className={`text-[10px] font-bold uppercase tracking-wider ${priorityColor.split(' ')[1]}`}>
                {item.priority}
              </Text>
            </View>
            {item.reminder && (
              <Ionicons name="notifications" size={14} color="#6366f1" style={{ marginLeft: 8 }} />
            )}
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header Section */}
      <View className="p-6">
        <Text className="text-slate-400 font-medium">Welcome back,</Text>
        <Text className="text-2xl font-bold text-slate-800">{user?.displayName || "Student"}</Text>
      </View>

      {/* Stats Summary */}
      <View className="flex-row px-6 mb-6 justify-between">
        <View className="bg-indigo-600 p-4 rounded-3xl flex-1 mr-2 shadow-md shadow-indigo-200">
          <Text className="text-indigo-100 text-xs font-semibold uppercase">Total Exams</Text>
          <Text className="text-white text-2xl font-bold">{exams.length}</Text>
        </View>
        <View className="bg-white p-4 rounded-3xl flex-1 ml-2 border border-slate-100">
          <Text className="text-slate-400 text-xs font-semibold uppercase">Next Up</Text>
          <Text className="text-slate-800 text-lg font-bold" numberOfLines={1}>
            {exams.length > 0 ? exams[0].title : "None"}
          </Text>
        </View>
      </View>

      <Text className="px-6 mb-4 text-slate-800 font-bold text-xl">Upcoming Exams</Text>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        renderItem={renderExamCard}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Ionicons name="book-outline" size={60} color="#cbd5e1" />
            <Text className="text-slate-400 mt-4 text-lg">No exams added yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;