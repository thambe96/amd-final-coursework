import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'


import { addExam } from "../../services/examService"

const AddExamsScreen = () => {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")

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