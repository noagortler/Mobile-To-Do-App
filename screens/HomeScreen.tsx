import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import TaskCard from "../components/TaskCard";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function HomeScreen({ navigation }: any) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [loadingActivity, setLoadingActivity] = useState(false);

  function addTask() {
    if (input.trim() === "") {
      setError("Please write something before adding a task.");
      return;
    }
    setError("");
    const newTask: Task = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  }

  async function addRandomTask() {
    try {
      setLoadingActivity(true);
      setError("");

      const response = await fetch("https://bored-api.appbrewery.com/random");
      const data = await response.json();

      const newTask: Task = {
        id: Date.now().toString(),
        text: data.activity,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    } catch {
      setError("Unable to load a random task.");
    } finally {
      setLoadingActivity(false);
    }
  }

  function toggleTask(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.buttonText}>About</Text>
      </Pressable>

      <View style={styles.inputCard}>
        <Text style={styles.sectionTitle}>New Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          placeholderTextColor="#5c9ead99"
          value={input}
          onChangeText={setInput}
          multiline
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.randomButton]}
          onPress={addRandomTask}
          disabled={loadingActivity}
        >
          <Text style={styles.buttonText}>
            {loadingActivity ? "Loading..." : "Add Random Task"}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.tasksContainer}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            text={task.text}
            completed={task.completed}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
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
  randomButton: {
    backgroundColor: "#326273",
    marginBottom: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  tasksContainer: {
    flex: 1,
  },
});