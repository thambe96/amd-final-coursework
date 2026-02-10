import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dropdown } from "react-native-element-dropdown"






import { addExam } from "../../services/examService"


const AddExamsScreen = () => {

  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const [reminder, setReminder] = useState(false)
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  const data = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ]




  const handleAddExam = async () => {
    try {
      await addExam(title, date.toISOString(), notes)
      Alert.alert("Success", "Exam added successfully!")
      setTitle("")
      setDate(date)
      setNotes("")
    } catch (err: any) {
      Alert.alert("Error", err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Exam Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter exam title"
      />

      <Text style={styles.label}>Exam Date</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          if (selectedDate) setDate(selectedDate)
        }}
      />

      


      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Optional notes"
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Reminder</Text>
        <Switch value={reminder} onValueChange={setReminder} />
      </View>



    <View className="p-4">
      <Text className="text-base font-semibold mb-2">Priority</Text>
      <Dropdown
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8 }}
        data={data}
        labelField="label"
        valueField="value"
        value={priority}
        onChange={item => setPriority(item.value)}
        placeholder="Select priority"
      />
    </View>



      <Button title="Add Exam" onPress={handleAddExam} />
    </View>
  )
}

export default AddExamsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  label: {
    fontSize: 16,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12
  }
})