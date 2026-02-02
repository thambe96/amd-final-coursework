import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { Tabs } from 'expo-router'
import { useRouter } from 'expo-router'
import { logoutUser } from '../services/authService'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'




const CustomHeader = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", query)
    // You can hook this into Firestore or navigation later
  }


  const handleLogout = async () => {
    await logoutUser()
    router.replace('/login')
  }



  return (
    <View style={styles.header}>
      {/* Avatar */}
      <Image
        source={{ uri: "https://res.cloudinary.com/dk0c1qe0x/image/upload/v1767293501/gwwty6fmefkcglekrxi3.jpg" }} // replace with profile photo URL
        style={styles.avatar}
      />

    <TextInput
        style={styles.search}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
    />


      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomHeader


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  search: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },
   logout: {
    color: 'red',
    fontWeight: '600'
  }

})


