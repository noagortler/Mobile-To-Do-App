import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [error, setError] = useState('');

  function addNote() {
    if (input.trim() === '') {
      setError('Please write something before adding a note.');
      return;
    }
    setError('');
    setNotes([...notes, input.trim()]);
    setInput('');
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>My Notes</Text>

      {/* Input card */}
      <View style={styles.inputCard}>
        <Text style={styles.sectionTitle}>New Note</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a note..."
          placeholderTextColor="#5c9ead99"
          value={input}
          onChangeText={setInput}
          multiline
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable style={styles.button} onPress={addNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </Pressable>
      </View>

      {/* Notes list */}
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>{item}</Text>
          </View>
        )}
        style={styles.list}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#326273',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#326273',
  },
  inputCard: {
    backgroundColor: '#EBF4F6',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5c9ead',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#5c9ead',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    color: '#326273',
    outlineWidth: 0,
  },
  errorText: {
    color: '#C0392B',
    fontSize: 13,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#5c9ead',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    marginTop: 4,
  },
  noteCard: {
    backgroundColor: '#EBF4F6',
    borderWidth: 1,
    borderColor: '#5c9ead',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  noteText: {
    color: '#326273',
    fontSize: 15,
  },
});