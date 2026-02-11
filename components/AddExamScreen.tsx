import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Switch, 
  StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { db, auth } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const AddExamScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [reminder, setReminder] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Wait!", "Please give your exam a name.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");

      await addDoc(collection(db, 'exams'), {
        userId: user.uid,
        name: name,
        note: note,
        date: Timestamp.fromDate(date),
        priority: priority,
        reminder: reminder,
        createdAt: Timestamp.now()
      });

      Alert.alert("Success", "Exam added to your schedule!");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Create Exam</Text>

        {/* Exam Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exam Name</Text>
          <TextInput 
            style={styles.input}
            placeholder="e.g. Advanced Mathematics"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Date Picker Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Exam Date</Text>
          <TouchableOpacity 
            style={styles.dateSelector} 
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#6200ea" />
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Priority Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority Level</Text>
          <View style={styles.priorityRow}>
            {(['Low', 'Medium', 'High'] as const).map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityBtn,
                  priority === p && styles.priorityBtnSelected,
                  priority === p && { backgroundColor: p === 'High' ? '#FF6B6B' : p === 'Medium' ? '#FFD93D' : '#6BCB77' }
                ]}
                onPress={() => setPriority(p)}
              >
                <Text style={[styles.priorityText, priority === p && styles.whiteText]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Note Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Short Note</Text>
          <TextInput 
            style={styles.input}
            placeholder="e.g. Room 402, bring calculator"
            value={note}
            onChangeText={setNote}
            maxLength={50}
          />
        </View>

        {/* Reminder Toggle */}
        <View style={styles.reminderCard}>
          <View>
            <Text style={styles.reminderTitle}>Set Reminder</Text>
            <Text style={styles.reminderSub}>Get notified before the exam</Text>
          </View>
          <Switch 
            value={reminder}
            onValueChange={setReminder}
            trackColor={{ false: "#ddd", true: "#b39ddb" }}
            thumbColor={reminder ? "#6200ea" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Exam</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 25, marginTop: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8, marginLeft: 4 },
  input: { 
    backgroundColor: '#fff', padding: 16, borderRadius: 12, fontSize: 16,
    borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, elevation: 2
  },
  dateSelector: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#eee', gap: 10
  },
  dateText: { fontSize: 16, color: '#333' },
  priorityRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  priorityBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  priorityBtnSelected: { borderColor: 'transparent' },
  priorityText: { fontWeight: '600', color: '#888' },
  whiteText: { color: '#fff' },
  reminderCard: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F5F3FF', padding: 20, borderRadius: 15, marginBottom: 30
  },
  reminderTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  reminderSub: { fontSize: 12, color: '#7E57C2' },
  saveBtn: { backgroundColor: '#6200ea', padding: 18, borderRadius: 15, alignItems: 'center', marginBottom: 40 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddExamScreen;