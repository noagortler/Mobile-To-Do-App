import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  async function saveTasks(updatedTasks: Task[]) {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.log(error);
    }
  }

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
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
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
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    } catch {
      setError("Unable to load a random task.");
    } finally {
      setLoadingActivity(false);
    }
  }

  function toggleTask(id: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function deleteTask(id: string) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My To-Do List</Text>
          <Text style={styles.summary}>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}, {completedCount} done
          </Text>
        </View>
        <Pressable
          style={styles.aboutButton}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.buttonText}>About</Text>
        </Pressable>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.sectionTitle}>New Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a task..."
          placeholderTextColor="#2D4A3E"
          value={input}
          onChangeText={setInput}
          multiline
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Pressable style={[styles.button, styles.addButton]} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.logButton]}
          onPress={() => navigation.navigate("LogTime")}
        >
          <Text style={styles.buttonText}>Log Time</Text>
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
    backgroundColor: "#FAFAF8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  aboutButton: {
    backgroundColor: "#2D4A3E",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D4A3E",
    marginBottom: 4,
  },
  summary: {
    fontSize: 13,
    color: "#2D4A3E",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2D4A3E",
  },
  inputCard: {
    backgroundColor: "#EEF2EE",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C8D8C8",
    marginBottom: 16,
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
    textAlignVertical: "top",
    color: "#2D4A3E",
    marginBottom: 10,
  },
  errorText: {
    color: "#C0392B",
    fontSize: 13,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    minHeight: 44,
  },
  addButton: {
    backgroundColor: "#5A7A6A",
  },
  logButton: {
    backgroundColor: "#2D4A3E",
  },
  randomButton: {
    backgroundColor: "#C1440E",
    marginBottom: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  tasksContainer: {
    flex: 1,
  },
});