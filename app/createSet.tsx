import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createFlashcardSet } from '../services/examService'; // Ensure this function exists!

const CreateSet = () => {
  const { examId } = useLocalSearchParams();
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!name) return Alert.alert("Error", "Please name your set");
    try {
      // 1. Create the set in Firestore
      const newSet = await createFlashcardSet(examId as string, name);
      
      // 2. Go back to the list (or go straight to adding cards)
      router.back(); 
    } catch (e) {
      Alert.alert("Error", "Could not create set");
      console.log(e)
    }
  };

  return (
    <View className="flex-1 bg-white p-8 justify-center">
      <Text className="text-2xl font-bold mb-4">Name your Flashcard Set</Text>
      <TextInput 
        className="bg-slate-100 p-4 rounded-2xl mb-6 text-lg"
        placeholder="e.g. Chapter 1: Anatomy"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity onPress={handleSave} className="bg-indigo-600 p-5 rounded-2xl items-center">
        <Text className="text-white font-bold text-lg">Create Set</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateSet;