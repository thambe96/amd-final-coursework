import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from "react-native-element-dropdown";
import { addExam } from "../../services/examService";
import { Ionicons } from '@expo/vector-icons';

const AddExamsScreen = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState(false);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const priorityData = [
    { label: "Low Priority", value: "low" },
    { label: "Medium Priority", value: "medium" },
    { label: "High Priority", value: "high" }
  ];

  const handleAddExam = async () => {
    if (!title) {
      Alert.alert("Missing Info", "Please give your exam a name!");
      return;
    }
    try {
      // PASS ALL ARGUMENTS to your service
      await addExam(title, date.toISOString(), notes, reminder, priority);
      Alert.alert("Success 🎉", "Exam added to your study schedule!");
      setTitle("");
      setNotes("");
      setReminder(false);
      setPriority("medium");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-slate-50">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-3xl font-bold text-slate-800 mb-6">New Exam</Text>

        {/* Exam Title Card */}
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-100">
          <Text className="text-slate-500 font-semibold mb-2 uppercase text-xs tracking-widest">General Info</Text>
          <TextInput
            className="text-lg font-medium text-slate-800 py-2 border-b border-slate-100"
            value={title}
            onChangeText={setTitle}
            placeholder="Exam Name (e.g. Physics)"
            placeholderTextColor="#94a3b8"
          />
          <TextInput
            className="text-slate-600 py-3"
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a short note..."
            multiline
          />
        </View>

        {/* Date & Priority Row */}
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-[48%] items-center"
          >
            <Ionicons name="calendar-outline" size={24} color="#6366f1" />
            <Text className="text-slate-400 text-xs mt-1">Date</Text>
            <Text className="text-slate-800 font-bold">{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <View className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-[48%] justify-center">
            <Dropdown
              style={{ paddingHorizontal: 8 }}
              selectedTextStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              data={priorityData}
              labelField="label"
              valueField="value"
              value={priority}
              onChange={item => setPriority(item.value as any)}
            />
          </View>
        </View>

        {/* Reminder Toggle */}
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-row justify-between items-center mb-8">
          <View className="flex-row items-center">
            <View className="bg-indigo-100 p-2 rounded-full mr-3">
              <Ionicons name="notifications-outline" size={20} color="#6366f1" />
            </View>
            <Text className="text-slate-700 font-semibold">Enable Reminder</Text>
          </View>
          <Switch 
            value={reminder} 
            onValueChange={setReminder}
            trackColor={{ false: "#cbd5e1", true: "#818cf8" }}
            thumbColor={reminder ? "#4f46e5" : "#f8fafc"}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleAddExam}
          className="bg-indigo-600 p-5 rounded-2xl shadow-lg shadow-indigo-300 items-center"
        >
          <Text className="text-white text-lg font-bold">Add to Calendar</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddExamsScreen;