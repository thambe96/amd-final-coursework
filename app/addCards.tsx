import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addCardToSet } from '../services/examService';
import { Ionicons } from '@expo/vector-icons';

const AddCards = () => {
  const { examId, setId, setName } = useLocalSearchParams<{ examId: string, setId: string, setName: string }>();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!front || !back) return Alert.alert("Wait!", "Both sides need content.");
    
    setSaving(true);
    try {
      await addCardToSet(examId, setId, front, back);
      setFront(''); // Clear for next card
      setBack('');
    } catch (e) {
      Alert.alert("Error", "Could not save card.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-slate-50">
      <View className="p-6">
        <Text className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Adding to: {setName}</Text>
        <Text className="text-2xl font-black text-slate-900 mb-6">Create Cards</Text>

        {/* Card Input UI */}
        <View className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <View className="p-6 border-b border-slate-50">
            <Text className="text-indigo-600 font-bold text-xs mb-2 uppercase">Front (Question)</Text>
            <TextInput
              placeholder="e.g. What is the powerhouse of the cell?"
              className="text-lg text-slate-800"
              multiline
              value={front}
              onChangeText={setFront}
            />
          </View>
          <View className="p-6 bg-slate-50/30">
            <Text className="text-emerald-600 font-bold text-xs mb-2 uppercase">Back (Answer)</Text>
            <TextInput
              placeholder="e.g. Mitochondria"
              className="text-lg text-slate-800"
              multiline
              value={back}
              onChangeText={setBack}
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleSave}
          disabled={saving}
          className="bg-slate-900 mt-8 p-5 rounded-2xl items-center shadow-lg active:scale-95"
        >
          <Text className="text-white font-bold text-lg">{saving ? "Saving..." : "Save & Next Card"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} className="mt-4 items-center">
          <Text className="text-slate-400 font-medium">Done Adding Cards</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddCards;