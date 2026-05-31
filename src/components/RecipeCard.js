import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecipeCard = ({ recipe, onPress, onLike, isLiked }) => {

    // BURASI EKLENDİ: Beğeni sayısını anlık hesaplayan mantık (Optimistik UI)
    const displayLikes = useMemo(() => {
        // DummyJSON API'sinde reviewCount dönüyor, bunu temel beğeni sayısı yapıyoruz
        const baseLikes = recipe.reviewCount || 0;
        // Eğer context'te beğenilmiş görünüyorsa anında +1 ekleyerek göster
        return isLiked ? baseLikes + 1 : baseLikes;
    }, [recipe.reviewCount, isLiked]);

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(recipe)} activeOpacity={0.9}>
            <Image source={{ uri: recipe.image }} style={styles.image} />

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={1}>{recipe.name}</Text>

                    {/* Beğeni İkonu ve Sayısı */}
                    <TouchableOpacity onPress={() => onLike(recipe.id)} style={styles.likeContainer}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={26}
                            color={isLiked ? "#661313" : "#888"}
                        />
                        {/* Sayı burada ekrana basılıyor */}
                        <Text style={[styles.likeCount, isLiked && styles.likeCountActive]}>
                            {displayLikes}
                        </Text>
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
                </View>
            </View>
        </TouchableOpacity>
    );
};

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
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
    },
    likeCount: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    likeCountActive: {
        color: '#661313', // İçi dolunca sayının rengi de koyu kırmızı olacak
    },
    subtitle: {
        fontSize: 14,
        color: '#FF7700',
        fontWeight: '500',
        marginBottom: 10,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    infoText: {
        fontSize: 13,
        color: '#555',
        marginLeft: 4,
    }
});