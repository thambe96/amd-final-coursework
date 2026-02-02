import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustomHeader from '@/components/customHeader'
import { MaterialIcons } from '@expo/vector-icons'

const DashboardLayout = () => {

    const tabs = [ 
        { name: "home", icon: "home", title: "Home"},
        { name: "addExams", icon: "add", title: "ADD Exams"},
        { name: "exams", icon: "list", title: "Exams"},
        { name: "profile", icon: "person", title: "Profile"}
    ] as const


  return (
    <Tabs
        screenOptions={{
            header: () => <CustomHeader />  
        }}

    
    >
        {
            tabs.map((tab) => (
                <Tabs.Screen 
                    key={tab.name} 
                    name={tab.name} 
                    options={{tabBarIcon: ({color, size}) => (
                            <MaterialIcons name={tab.icon} color={color} size={size} />
                        ) 
                    }}
                />
            ))
        }




    </Tabs>
  )
}

export default DashboardLayout

const styles = StyleSheet.create({})