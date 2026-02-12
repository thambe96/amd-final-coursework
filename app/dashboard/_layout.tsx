import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';

const DashboardLayout = () => {
  const tabs = [
    { name: "home", icon: "home", title: "Home" },
    { name: "addExams", icon: "add-circle-outline", title: "Add" }, // Changed to circle for "Add"
    { name: "exams", icon: "book", title: "Exams" }, // Changed to book for study feel
    { name: "profile", icon: "person-outline", title: "Profile" }
  ] as const;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#6366f1', // Indigo-500
        tabBarInactiveTintColor: '#94a3b8', // Slate-400
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10, // Shadow for Android
          shadowColor: '#000', // Shadow for iOS
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 0,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size, focused }) => (
              <View className={`items-center justify-center ${focused ? 'scale-110' : ''}`}>
                <MaterialIcons 
                  name={tab.icon as any} 
                  color={color} 
                  size={focused ? 28 : 24} 
                />
                {/* Optional: Add a tiny dot under the active icon */}
                {focused && (
                  <View className="w-1 h-1 rounded-full bg-indigo-500 mt-1" />
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default DashboardLayout;