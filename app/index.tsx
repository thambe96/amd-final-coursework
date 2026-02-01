import { View, Text, ActivityIndicator } from "react-native"
import React from "react"
import "../global.css"
import { Redirect } from "expo-router"
import { useAuth } from "@/hooks/useAuth"

const Index = () => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
    //   <View className="flex-1 justify-center items-center bg-gray-50">
    //     <ActivityIndicator size="large" color="#4ade80" />
    //   </View>
        null
    )
  }

  if (user) {
    return <Redirect href="/dashboard/home" />
  } else {
    return <Redirect href="/login" />
  }
}

export default Index













// import { Link } from 'expo-router';
// import '../global.css'

// import { Text, View } from "react-native";
 
// export default function App() {
//   return (
//     <View>
//         <Text className='mb-10'>
//             Welcome to Nativewind!
//         </Text>
//         <Link href={"/(auth)/login"} className='ml-10'>Login</ Link>
//         <Link href={"/(auth)/register"} className='ml-10'>Register</ Link>
        
//     </View>

      
//   );
// }