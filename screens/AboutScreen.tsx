import { View, Text, Pressable, StyleSheet } from "react-native";

export default function AboutScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.body}>
        This app was built using React Native and Expo.
      </Text>

      <Text style={styles.body}>Features:</Text>
      <Text style={styles.body}>• Create Notes</Text>
      <Text style={styles.body}>• View Notes</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
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
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#326273",
  },
  body: {
    fontSize: 18,
    marginBottom: 10,
    color: "#326273",
  },
  button: {
    backgroundColor: "#5c9ead",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});