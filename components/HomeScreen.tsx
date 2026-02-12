import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { db, auth } from '../services/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Exam } from '../types/types';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }: any) => {
  const [nextExam, setNextExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    // Query for the single nearest exam
    const q = query(
      collection(db, 'exams'),
      where('userId', '==', user.uid),
      orderBy('date', 'asc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setNextExam({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Exam);
      } else {
        setNextExam(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return '#FF6B6B'; // Reddish
      case 'Medium': return '#FFD93D'; // Yellowish
      default: return '#6BCB77'; // Greenish
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>{user?.displayName || 'Student'} 👋</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
           <Image 
            source={{ uri: user?.photoURL || 'https://ui-avatars.com/api/?name=User+Name' }} 
            style={styles.profilePicSmall} 
          />
        </TouchableOpacity>
      </View>

      {/* Hero Card: Next Exam */}
      <Text style={styles.sectionTitle}>Up Next</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : nextExam ? (
        <View style={styles.heroCard}>
          <View style={[styles.priorityStrip, { backgroundColor: getPriorityColor(nextExam.priority) }]} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{nextExam.name}</Text>
            <Text style={styles.heroDate}>
              {new Date(nextExam.date.seconds * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{nextExam.priority} Priority</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-circle" size={40} color="#6200ea" style={{ opacity: 0.5 }} />
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No upcoming exams! Time to relax? 🌴</Text>
        </View>
      )}

      {/* Quick Actions Grid */}
   

      {/* Motivational Quote or Stat (Optional) */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>The secret to getting ahead is getting started.</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  greeting: { fontSize: 16, color: '#888' },
  username: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  profilePicSmall: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ddd' },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15 },
  
  // Hero Card
  heroCard: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
    overflow: 'hidden'
  },
  priorityStrip: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 },
  heroContent: { flex: 1, marginLeft: 10 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  heroDate: { fontSize: 14, color: '#666', marginVertical: 5 },
  heroBadge: { backgroundColor: '#f0f0f0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, alignSelf: 'flex-start' },
  heroBadgeText: { fontSize: 12, fontWeight: '600', color: '#555' },

  emptyCard: { padding: 30, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', marginBottom: 30 },
  emptyText: { color: '#888', fontStyle: 'italic' },

  // Grid
  grid: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  actionCard: { 
    flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 
  },
  iconBox: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionText: { fontWeight: '600', color: '#333' },

  quoteContainer: { marginTop: 30, padding: 20, borderLeftWidth: 4, borderLeftColor: '#6200ea', backgroundColor: '#F5F3FF', borderRadius: 5 },
  quoteText: { fontStyle: 'italic', color: '#555' }
});

export default HomeScreen;