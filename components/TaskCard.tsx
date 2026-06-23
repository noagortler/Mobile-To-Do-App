import { View, Text, Pressable, StyleSheet } from "react-native";

type TaskCardProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskCard({ text, completed, onToggle, onDelete }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Pressable style={styles.checkboxRow} onPress={onToggle} hitSlop={8}>
        <View style={styles.checkboxHitArea}>
          <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>
        <Text style={[styles.taskText, completed && styles.taskTextCompleted]}>
          {text}
        </Text>
      </Pressable>

      <Pressable style={styles.deleteHitArea} onPress={onDelete} hitSlop={8}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EEF2EE",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#C8D8C8",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkboxHitArea: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2D4A3E",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#C1440E",
    borderColor: "#C1440E",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  taskText: {
    color: "#2D4A3E",
    fontSize: 14,
    flexShrink: 1,
  },
  taskTextCompleted: {
    color: "#5A7A6A",
    textDecorationLine: "line-through",
  },
  deleteHitArea: {
    minWidth: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  deleteText: {
    color: "#C1440E",
    fontSize: 13,
    fontWeight: "600",
  },
});