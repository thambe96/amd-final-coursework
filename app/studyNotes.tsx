import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const studyNotes = () => {

    const router = useRouter()



  return (
    <View>
      <Text>studyNotes</Text>

        <View className="px-6 pt-12 pb-4 flex-row items-center">
            <TouchableOpacity 
            onPress={() => router.back()} 
            className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100"
            >
            <Ionicons name="chevron-back" size={24} color="#1e293b" />
            </TouchableOpacity>

            <Text className="ml-4 text-slate-900 font-bold text-lg">Back to Sets</Text>
        </View>

    </View>
  )
}

export default studyNotes