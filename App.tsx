import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  function handleSubmit() {
    // don't add empty notes
    if (input.trim() === '') {
      return;
    }
    setNotes([...notes, input.trim()]);
    setInput('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={input}
        onChangeText={setInput}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      {/* submitted notes show up here */}
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text>{item}</Text>
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
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top', // keeps cursor at top on Android
  },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    marginTop: 24,
  },
  noteCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
});