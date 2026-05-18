import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RecipeCard = React.memo(({ recipe }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe ? recipe.name : "Title"}</Text>
    </View>
  );
});

RecipeCard.displayName = "RecipeCard";

const styles = StyleSheet.create({
  card: { height: 240, padding: 16, backgroundColor: "#fff", borderRadius: 12, marginVertical: 8 },
  title: { fontSize: 16, fontWeight: "bold" }
});

export default RecipeCard;
