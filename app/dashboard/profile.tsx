import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { auth, db } from '../../services/firebase';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const router = useRouter();
  const [stats, setStats] = useState({ exams: 0, sets: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      // Fetch total exams count
      const examColl = collection(db, "exams");
      const examSnapshot = await getCountFromServer(examColl);
      
      setStats({
        exams: examSnapshot.data().count,
        sets: 0 // You can add logic here to count sub-collections if needed
      });
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => signOut(auth) }
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-slate-50">
      {/* Header / Cover Area */}
      <View className="bg-indigo-600 h-40 w-full" />
      
      <View className="px-6 -mt-16">
        {/* Avatar Card */}
        <View className="bg-white p-6 rounded-[40px] shadow-xl shadow-indigo-30 items-center">
          <View className="w-24 h-24 bg-slate-200 rounded-full border-4 border-white overflow-hidden -mt-12 mb-4 shadow-sm">
            <Image 
              source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} 
              className="w-full h-full"
            />
          </View>
          <Text className="text-2xl font-black text-slate-900">{user?.displayName || 'Student Name'}</Text>
          <Text className="text-slate-400 font-medium">{user?.email}</Text>
          
          {/* Quick Stats Grid */}
          <View className="flex-row mt-8 border-t border-slate-50 pt-6 w-full">
            <View className="flex-1 items-center border-r border-slate-50">
              <Text className="text-2xl font-black text-indigo-600">{stats.exams}</Text>
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Exams</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-2xl font-black text-emerald-500">Active</Text>
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Status</Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View className="mt-8">
          <Text className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-4 ml-2">Account Settings</Text>
          
          <TouchableOpacity className="bg-white p-5 rounded-3xl mb-3 flex-row items-center justify-between border border-slate-50">
            <View className="flex-row items-center">
              <View className="bg-slate-100 p-2 rounded-xl mr-4">
                <Ionicons name="person-outline" size={20} color="#64748b" />
              </View>
              <Text className="text-slate-700 font-bold">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-5 rounded-3xl mb-3 flex-row items-center justify-between border border-slate-50">
            <View className="flex-row items-center">
              <View className="bg-slate-100 p-2 rounded-xl mr-4">
                <Ionicons name="notifications-outline" size={20} color="#64748b" />
              </View>
              <Text className="text-slate-700 font-bold">Study Reminders</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
          </TouchableOpacity>

          {/* Danger Zone */}
          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-red-50 p-5 rounded-3xl mt-6 flex-row items-center justify-center border border-red-100"
          >
            <MaterialIcons name="logout" size={20} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="h-20" /> {/* Spacer for bottom tabs */}
    </ScrollView>
  );
};

export default ProfileScreen;