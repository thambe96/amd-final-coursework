import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { addImageToExam } from '../services/examService';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const ImageGallery = () => {
  const { examId, title } = useLocalSearchParams<{ examId: string, title: string }>();
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "exams", examId, "images"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [examId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setUploading(true);
      try {
        // In a real app, upload result.assets[0].uri to Firebase Storage first
        // For now, we save the local URI to demonstrate the UI
        await addImageToExam(examId, result.assets[0].uri, "Diagram");
      } catch (e) {
        Alert.alert("Upload Failed", "Could not save image reference.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-6 pt-14 pb-4 flex-row justify-between items-center">
        <View>
          <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</Text>
          <Text className="text-3xl font-black text-slate-900">Attachments</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <Ionicons name="chevron-down" size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {uploading && <ActivityIndicator color="#10b981" className="mb-4" />}

      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="w-1/2 p-2">
            <TouchableOpacity className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100">
              <Image source={{ uri: item.url }} className="h-48 w-full" resizeMode="cover" />
              <View className="p-3">
                <Text className="text-slate-500 text-[10px] font-bold uppercase">{item.note}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center mt-20 px-10">
            <View className="bg-emerald-50 p-6 rounded-full mb-4">
              <MaterialIcons name="add-a-photo" size={40} color="#10b981" />
            </View>
            <Text className="text-slate-400 text-center">No images yet. Snap photos of your textbook or diagrams.</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={pickImage}
        className="absolute bottom-10 right-8 bg-emerald-500 px-6 py-4 rounded-full shadow-2xl flex-row items-center"
      >
        <MaterialIcons name="photo-camera" size={24} color="white" />
        <Text className="text-white font-bold ml-2">Add Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageGallery;