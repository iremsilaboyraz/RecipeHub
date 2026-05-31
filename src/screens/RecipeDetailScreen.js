import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipe } from '../context/RecipeContext';
import DayPickerModal from '../components/DayPickerModal';


const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe } = route.params || {};
    const { liked, likeRecipe, favorites, toggleFavorite } = useRecipe();

    // PlannerContext'i ileride bağlayacağın için şimdilik boş bir fonksiyon oluşturuyoruz
    // import { usePlanner } from '../context/PlannerContext';
    // const { addToDay } = usePlanner();

    const [isModalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    if (!recipe) {
        return (
            <View style={styles.centerBox}>
                <Text>Tarif bulunamadı.</Text>
            </View>
        );
    }

    const isLiked = liked.includes(recipe.id);
    const isFavorite = favorites.includes(recipe.id);

    const handleAddToPlan = (dayId) => {
        // İleride buraya: addToDay(dayId, recipe.id);
        Alert.alert("Başarılı", `Tarif ${dayId} gününe eklendi!`);
    };


    return (
        <View style={styles.container}>
            {/* Header Alanı */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tarif Detayı</Text>
                <TouchableOpacity onPress={() => toggleFavorite(recipe.id)} style={styles.headerIcon}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#000" : "#000"} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

                {/* Hero Görseli */}
                <Animated.Image
                    source={{ uri: recipe.image }}
                    style={[styles.heroImage, { opacity: fadeAnim }]}
                />

                <View style={styles.contentContainer}>
                    {/* Başlık ve Alt Başlık (Inria Sans) */}
                    <Text style={styles.title}>{recipe.name}</Text>
                    <Text style={styles.subtitle}>{recipe.cuisine} çeşitleri</Text>

                    {/* İstatistik Kutusu */}
                    <View style={styles.statsBox}>
                        <View style={styles.statsRowTop}>
                            <View style={styles.statItem}>
                                <Ionicons name="time-outline" size={20} color="#000" />
                                <View style={styles.statTextColumn}>
                                    <Text style={styles.statLabel}>Toplam Süre</Text>
                                    <Text style={styles.statValue}>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}dk</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="flame-outline" size={20} color="#B65311" />
                                <View style={styles.statTextColumn}>
                                    <Text style={styles.statLabel}>Kalori</Text>
                                    <Text style={styles.statValue}>{recipe.caloriesPerServing}</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="people-outline" size={20} color="#000" />
                                <View style={styles.statTextColumn}>
                                    <Text style={styles.statLabel}>Porsiyon</Text>
                                    <Text style={styles.statValue}>{recipe.servings}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.statsRowBottom}>
                            <Ionicons name="star" size={24} color="#B65311" />
                            <View style={styles.statTextColumn}>
                                <Text style={styles.statLabel}>Puan</Text>
                                <Text style={styles.statValue}>{recipe.rating}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Aksiyon Butonları */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.likeBtn, isLiked && styles.likeBtnActive]}
                            onPress={() => likeRecipe(recipe.id)}
                        >
                            <Text style={[styles.likeBtnText, isLiked && styles.likeBtnTextActive]}>Beğen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionBtn, styles.planBtn]}
                            onPress={() => setModalVisible(true)}
                        >
                            <Ionicons name="add" size={20} color="#FFF" />
                            <Text style={styles.planBtnText}>Haftaya Ekle</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Malzemeler Listesi */}
                    <View style={styles.ingredientsBox}>
                        <Text style={styles.sectionTitle}>Malzemeler</Text>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientRow}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.ingredientText}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Talimatlar Listesi */}
                    <View style={[styles.ingredientsBox, { marginTop: 20 }]}>
                        <Text style={styles.sectionTitle}>Talimatlar</Text>
                        {recipe.instructions && recipe.instructions.map((instruction, index) => (
                            <View key={index} style={styles.instructionRow}>
                                <Text style={styles.instructionNumber}>{index + 1}.</Text>
                                <Text style={styles.instructionText}>{instruction}</Text>
                            </View>
                        ))}
                    </View>

                </View>
            </ScrollView>

            {/* Plan Seçici Modal */}
            <DayPickerModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSelectDay={handleAddToPlan}
            />
        </View>
    );
};

export default RecipeDetailScreen;