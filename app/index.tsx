import { Link } from 'expo-router';
import '../global.css'

import { Text, View } from "react-native";
 
export default function App() {
  return (

    <View>
        <Text className='mb-10'>
            Welcome to Nativewind!
        </Text>
        <Link href={"/(auth)/register"} className='ml-10'>Register</ Link>
    </View>

      
  );
}