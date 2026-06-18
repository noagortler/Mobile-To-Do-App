import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import NoteCard from "../components/NoteCard";

export default function HomeScreen({ navigation }: any) {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [error, setError] = useState("");

  function addNote() {
    if (input.trim() === "") {
      setError("Please write something before adding a note.");
      return;
    }
    setError("");
    setNotes([...notes, input.trim()]);
    setInput("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.buttonText}>About</Text>
      </Pressable>

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

      <ScrollView style={styles.notesContainer}>
        {notes.map((item, index) => (
          <NoteCard key={index} note={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#326273",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#326273",
  },
  inputCard: {
    backgroundColor: "#EBF4F6",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5c9ead",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#5c9ead",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    color: "#326273",
  },
  errorText: {
    color: "#C0392B",
    fontSize: 13,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#5c9ead",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  notesContainer: {
    flex: 1,
  },
});