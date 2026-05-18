import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateRecipeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Recipe Screen</n    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold" }
});
