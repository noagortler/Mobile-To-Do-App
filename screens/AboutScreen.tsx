import { View, Text, Pressable, StyleSheet } from "react-native";

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.subtitle}>Built with React Native & Expo</Text>

      <Text style={styles.sectionTitle}>Features</Text>

      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <View style={styles.dot} />
          <Text style={styles.featureText}>Add and manage your tasks</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.dot} />
          <Text style={styles.featureText}>Mark tasks as done</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.dot} />
          <Text style={styles.featureText}>Delete tasks</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.dot} />
          <Text style={styles.featureText}>Get random task suggestions</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.dot} />
          <Text style={styles.featureText}>Log time spent on tasks</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D4A3E",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#2D4A3E",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2D4A3E",
    marginBottom: 12,
  },
  featureList: {
    gap: 10,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C1440E",
  },
  featureText: {
    fontSize: 14,
    color: "#2D4A3E",
  },
  button: {
    backgroundColor: "#2D4A3E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});