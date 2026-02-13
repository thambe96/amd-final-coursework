import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../components/commonHeader';



const ExamDetailsScreen = () => {
  const { examId, title } = useLocalSearchParams(); // Get the ID from the card click
  const router = useRouter();

  // Define the sub-features for this subject
  const features = [
    { 
      name: 'Flashcards', 
      icon: 'style', 
      color: 'bg-orange-50', 
      iconColor: '#f97316', 
      route: '/flashcardSets' 
    },
    { 
      name: 'Study Notes', 
      icon: 'note-add', 
      color: 'bg-blue-50', 
      iconColor: '#3b82f6', 
      route: '/studyNotes' 
    },
    { 
      name: 'Attachments', 
      icon: 'image', 
      color: 'bg-emerald-50', 
      iconColor: '#10b981', 
      route: '/imageGallery' 
    },
  ];

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      {/* Subject Header */}
      {/* <View className="mb-8 mt-4">
        <Text className="text-slate-400 text-sm font-bold uppercase tracking-widest">Subject Hub</Text>
        <Text className="text-3xl font-extrabold text-slate-900">{title || "Exam Details"}</Text>
      </View> */}

      <ScreenHeader title="Subject Hub" subtitle={title as string} />

      {/* Grid Menu */}
      <View className="flex-row flex-wrap justify-between">
        {features.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => router.push({ 
                pathname: item.route, 
                params: { examId } // Pass the ID deeper to the next screen
            })}
            className="bg-white w-[48%] p-6 rounded-3xl shadow-sm border border-slate-50 mb-4 items-center active:scale-95"
          >
            <View className={`${item.color} p-4 rounded-2xl mb-3`}>
              <MaterialIcons name={item.icon as any} size={32} color={item.iconColor} />
            </View>
            <Text className="text-slate-700 font-bold">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Big Action: Start Study Mode */}
      <TouchableOpacity 
        onPress={() => router.push({ pathname: '/studyMode', params: { examId } })}
        className="bg-indigo-600 flex-row p-5 rounded-2xl items-center justify-center mt-4 shadow-lg shadow-indigo-200"
      >
        <Ionicons name="play" size={24} color="white" />
        <Text className="text-white font-bold text-lg ml-2">Start Study Session</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ExamDetailsScreen;