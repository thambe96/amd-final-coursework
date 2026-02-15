import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { useLoader } from "@/hooks/useLoader"
import { login } from "@/services/authService"
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const router = useRouter() // import { useRouter } from "expo-router"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { showLoader, hideLoader, isLoading } = useLoader()

  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      Alert.alert("Please enter email and password")
      return
    }
    showLoader()
    try {
      await login(email, password)
      router.replace("../dashboard/home")
    } catch (e) {
      console.error(e)
      Alert.alert("Login fail")
    } finally {
      hideLoader()
    }
  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 justify-center bg-slate-50 p-8">
        
        {/* Brand Identity Section */}
        <View className="items-center mb-10">
          <View className="bg-indigo-600 w-16 h-16 rounded-3xl items-center justify-center shadow-lg shadow-indigo-200 mb-4">
            <Ionicons name="fitness" size={32} color="white" />
          </View>
          <Text className="text-4xl font-black text-slate-900 tracking-tight">
            Extesi-Lifter
          </Text>
          <Text className="text-slate-400 font-medium mt-1">Elevate your study routine</Text>
        </View>

        {/* Login Card */}
        <View className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-white">
          <Text className="text-2xl font-black mb-8 text-slate-800">
            Login
          </Text>

          {/* Email Input */}
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

          {/* Password Input */}
          <View className="mb-8">
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

          {/* Action Button */}
          <Pressable
            className="bg-indigo-600 py-5 rounded-[24px] shadow-lg shadow-indigo-200 active:scale-95"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg font-black text-center">Let's Go</Text>
          </Pressable>

          {/* Footer Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-slate-400 font-medium">New here? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text className="text-indigo-600 font-bold">Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>


    /*
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
            Login
          </Text>
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
          <Pressable
            className="bg-blue-600/80 px-6 py-3 rounded-2xl"
            onPress={handleLogin}
          >
            <Text className="text-white text-lg text-center">Login</Text>
          </Pressable>
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-700">Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/register")
              }}
            >
              <Text className="text-blue-600 font-semibold">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

    */




   
  )
}

export default Login