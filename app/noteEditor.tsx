import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createNote, updateNote } from '../services/examService';
import { Ionicons } from '@expo/vector-icons';

const NoteEditor = () => {
  const { examId, noteId, initialTitle, initialContent } = useLocalSearchParams<{ examId: string, noteId?: string, initialTitle?: string, initialContent?: string }>();
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !content) return Alert.alert("Hold on", "Notes need a title and content!");
    
    try {
      if (noteId) {
        await updateNote(examId, noteId, content);
      } else {
        await createNote(examId, title, content);
      }
      router.back();
    } catch (e) {
      Alert.alert("Error", "Could not save note.");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-14 pb-4 flex-row justify-between items-center border-b border-slate-50">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} className="bg-blue-600 px-6 py-2 rounded-full">
          <Text className="text-white font-bold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-6">
        <TextInput
          placeholder="Note Title"
          className="text-3xl font-black text-slate-900 mb-4"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#cbd5e1"
          multiline
        />
        <TextInput
          placeholder="Start writing your thoughts..."
          className="text-lg text-slate-600 leading-7"
          value={content}
          onChangeText={setContent}
          multiline
          scrollEnabled={false}
          placeholderTextColor="#cbd5e1"
        />
      </ScrollView>
    </View>
  );
};

export default NoteEditor;