import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../services/firebase';
import { updateUserProfile } from '../services/authService';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const EditProfile = () => {
  const user = auth.currentUser;
  const router = useRouter();
  
  const [name, setName] = useState(user?.displayName || '');
  const [image, setImage] = useState(user?.photoURL || null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square for profile pictures
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim()) return Alert.alert("Error", "Name cannot be empty");
    
    setLoading(true);
    try {
      await updateUserProfile(name, image || '');
      Alert.alert("Success", "Profile updated!");
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      {/* Header */}
      <View className="flex-row items-center mb-10 pt-10">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-2xl font-black text-slate-900 ml-4">Edit Profile</Text>
      </View>

      {/* Profile Image Picker */}
      <View className="items-center mb-10">
        <TouchableOpacity onPress={pickImage} className="relative">
          <View className="w-32 h-32 bg-slate-100 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm">
            {image ? (
              <Image source={{ uri: image }} className="w-full h-full" />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Ionicons name="person" size={50} color="#cbd5e1" />
              </View>
            )}
          </View>
          <View className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full border-2 border-white">
            <MaterialIcons name="photo-camera" size={18} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="text-slate-400 mt-4 font-medium">Tap to change photo</Text>
      </View>

      {/* Input Fields */}
      <View className="space-y-6">
        <View>
          <Text className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-2 ml-1">Display Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="bg-slate-50 p-4 rounded-2xl text-lg text-slate-800 border border-slate-100"
            placeholder="Your name"
          />
        </View>

        <TouchableOpacity 
          onPress={handleUpdate}
          disabled={loading}
          className="bg-slate-900 p-5 rounded-2xl items-center shadow-lg mt-10"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;