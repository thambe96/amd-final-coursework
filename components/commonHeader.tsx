import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const ScreenHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  const router = useRouter();

  return (
    <View className="px-6 pt-14 pb-4 flex-row items-center">
      {/* The Actual Back Button */}
      <TouchableOpacity 
        onPress={() => router.back()} 
        className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 active:bg-slate-50"
      >
        <Ionicons name="chevron-back" size={24} color="#1e293b" />
      </TouchableOpacity>
      
      {/* Title Text */}
      <View className="ml-4">
        {subtitle && <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{subtitle}</Text>}
        <Text className="text-xl font-black text-slate-900">{title}</Text>
      </View>
    </View>
  );
};