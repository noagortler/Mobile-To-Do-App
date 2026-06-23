import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function LogTimeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [minutes, setMinutes] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function submitLog() {
    if (!selectedTask) {
      setError("Please select a task.");
      return;
    }
    if (minutes.trim() === "" || isNaN(Number(minutes))) {
      setError("Please enter a valid number of minutes.");
      return;
    }
    setError("");
    try {
      await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: selectedTask.text,
          body: `Time spent: ${minutes} minutes`,
          userId: 1,
        }),
      });
      setMessage(`Log submitted! "${selectedTask.text}" took ${minutes} mins.`);
      setSelectedTask(null);
      setMinutes("");
    } catch {
      setError("Unable to submit log. Please try again.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Log Time</Text>
          <Text style={styles.subtitle}>Track how long your tasks take</Text>
        </View>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.sectionTitle}>Select a task</Text>
        <ScrollView style={styles.taskList}>
          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>No tasks yet. Add some on the Home Screen.</Text>
          ) : (
            tasks.map((task) => (
              <Pressable
                key={task.id}
                style={[styles.taskOption, selectedTask?.id === task.id && styles.taskOptionSelected]}
                onPress={() => setSelectedTask(task)}
              >
                <Text style={[styles.taskOptionText, selectedTask?.id === task.id && styles.taskOptionTextSelected]}>
                  {task.text}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.sectionTitle}>Time spent (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 30"
          placeholderTextColor="#2D4A3E"
          value={minutes}
          onChangeText={setMinutes}
          keyboardType="numeric"
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {message ? <Text style={styles.successText}>{message}</Text> : null}

      <Pressable style={styles.button} onPress={submitLog}>
        <Text style={styles.buttonText}>Submit Log</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#FAFAF8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D4A3E",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#2D4A3E",
  },
  backButton: {
    backgroundColor: "#2D4A3E",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D4A3E",
    marginBottom: 10,
  },
  inputCard: {
    backgroundColor: "#EEF2EE",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C8D8C8",
    marginBottom: 16,
  },
  taskList: {
    maxHeight: 180,
  },
  emptyText: {
    fontSize: 14,
    color: "#2D4A3E",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  taskOption: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C8D8C8",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    minHeight: 44,
    justifyContent: "center",
  },
  taskOptionSelected: {
    backgroundColor: "#2D4A3E",
    borderColor: "#2D4A3E",
  },
  taskOptionText: {
    fontSize: 14,
    color: "#2D4A3E",
  },
  taskOptionTextSelected: {
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C8D8C8",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    minHeight: 44,
    color: "#2D4A3E",
  },
  errorText: {
    color: "#C0392B",
    fontSize: 13,
    marginBottom: 8,
  },
  successText: {
    color: "#2D4A3E",
    fontSize: 13,
    marginBottom: 8,
    backgroundColor: "#EEF2EE",
    borderLeftWidth: 4,
    borderLeftColor: "#C1440E",
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#2D4A3E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});