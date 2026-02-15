import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { registerUser } from "@/services/authService"
import { useLoader } from "../../hooks/useLoader"
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
  const router = useRouter() // import { useRouter } from "expo-router"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")

  const { showLoader, hideLoader, isLoading } = useLoader()

  

  const handleRegister = async () => {
    if (!name || !email || !password || !conPassword || isLoading) {
      Alert.alert("Please fill all fields...!")
      return
    }
    if (password !== conPassword) {
      Alert.alert("Password do not match...!")
      return
    }
    showLoader()
    try {
      await registerUser(name, email, password)
      Alert.alert("Account created..!")
      router.replace("/login");
    } catch (e) {
      console.error(e)
      Alert.alert("Register fail..!")
    } finally {
      hideLoader()
    }
  }

  return (

        
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* KeyboardAvoidingView is crucial for longer forms like registration */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1 bg-slate-50"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} className="px-8 py-10">
          
          {/* Brand Identity Section */}
          <View className="items-center mb-8">
            <View className="bg-indigo-600 w-14 h-14 rounded-2xl items-center justify-center shadow-lg shadow-indigo-200 mb-3">
              <Ionicons name="rocket" size={28} color="white" />
            </View>
            <Text className="text-3xl font-black text-slate-900 tracking-tight">
              Join the Lifters
            </Text>
            <Text className="text-slate-400 font-medium text-center px-4">
              Start elevating your study sessions today.
            </Text>
          </View>

          {/* Registration Card */}
          <View className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-white">
            
            {/* Full Name */}
            <View className="mb-4">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-2 mb-2">Full Name</Text>
              <TextInput
                placeholder="John Doe"
                placeholderTextColor="#94a3b8"
                className="bg-slate-100 p-4 rounded-2xl text-slate-900 font-semibold"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-2 mb-2">Email Address</Text>
              <TextInput
                placeholder="name@example.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-slate-100 p-4 rounded-2xl text-slate-900 font-semibold"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-2 mb-2">Password</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                className="bg-slate-100 p-4 rounded-2xl text-slate-900 font-semibold"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Confirm Password */}
            <View className="mb-8">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest ml-2 mb-2">Confirm Password</Text>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                className="bg-slate-100 p-4 rounded-2xl text-slate-900 font-semibold"
                value={conPassword}
                onChangeText={setConPassword}
              />
            </View>

            {/* Action Button */}
            <Pressable
              className="bg-indigo-600 py-5 rounded-[24px] shadow-lg shadow-indigo-200 active:scale-95"
              onPress={handleRegister}
            >
              <Text className="text-white text-lg font-black text-center">Create Account</Text>
            </Pressable>

            {/* Footer Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-slate-400 font-medium">Already a member? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-indigo-600 font-bold">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>







    /*
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
            Register
          </Text>
          <TextInput
            placeholder="name"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="email"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="confirm password"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={conPassword}
            onChangeText={setConPassword}
          />
          <Pressable
            className="bg-blue-600/80 px-6 py-3 rounded-2xl"
            onPress={handleRegister}
          >
            <Text className="text-white text-lg text-center">Register</Text>
          </Pressable>
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-700">Alrady have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                // router.push("/login")
                router.back()
                // router.replace("/login")
              }}
            >
              <Text className="text-blue-600 font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback> */

  )
}

export default Register