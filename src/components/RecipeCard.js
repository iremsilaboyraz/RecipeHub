import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipeCard = ({ recipe, onPress, onLike, isLiked }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(recipe)}
            activeOpacity={0.9}
        >
            <Image source={{ uri: recipe.image }} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>{recipe.name}</Text>
                    {/* Beğeni İkonu */}
                    <TouchableOpacity onPress={() => onLike(recipe.id)} style={styles.likeButton}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? "#661313" : "#888"}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>{recipe.cuisine} • {recipe.difficulty}</Text>

                <View style={styles.footerRow}>
                    <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={16} color="#555" />
                        <Text style={styles.infoText}>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} dk</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="flame-outline" size={16} color="#555" />
                        <Text style={styles.infoText}>{recipe.caloriesPerServing} kcal</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Ionicons name="star-outline" size={16} color="#555" />
                        <Text style={styles.infoText}>{recipe.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// React.memo optimizasyonu
export default React.memo(RecipeCard);


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
    },
    content: {
        padding: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
        color: '#000',
    },
    likeButton: {
        padding: 2,
    },


});