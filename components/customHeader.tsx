import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useRouter } from 'expo-router'
import { logoutUser } from '../services/authService'



const CustomHeader = () => {
  const router = useRouter()

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

      <Text style={styles.title}>Dashboard</Text>

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  logout: {
    color: 'red',
    fontWeight: '600'
  }
})

