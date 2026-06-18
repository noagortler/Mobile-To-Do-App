import { View, Text, StyleSheet } from "react-native";

type NoteCardProps = {
  note: string;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.noteText}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EBF4F6",
    borderWidth: 1,
    borderColor: "#5c9ead",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  noteText: {
    color: "#1a3d47",
    fontSize: 15,
  },
});