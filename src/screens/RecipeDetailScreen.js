import { usePlanner } from '../context/PlannerContext';
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
    const { addToDay } = usePlanner();
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
        // dayId (örneğin 'Monday') ve recipe objesinin tamamını gönderiyoruz
        addToDay(dayId, recipe);
        setModalVisible(false); // Modalı kapatmayı unutma!
        Alert.alert("Başarılı", `Tarif ${dayId} gününe planlandı!`);
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
                    {/* Favori ikonu bookmark (ayraç) olarak değiştirildi ve seçilince turuncu olacak */}
                    <Ionicons name={isFavorite ? "bookmark" : "bookmark-outline"} size={28} color={isFavorite ? "#DA854D" : "#000"} />
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    centerBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 50, // SafeArea
        paddingBottom: 15,
        backgroundColor: '#FAFAFA',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: '600', // Semi Bold karşılığı
        color: '#000',
    },
    headerIcon: {
        padding: 5,
    },
    heroImage: {
        width: '100%',
        height: 268, // Figma'daki ölçü
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inria Sans',
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Inria Sans',
        fontWeight: '300', // Light karşılığı
        color: '#B65311',
        marginBottom: 20,
    },
    statsBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#00000020', // %20 opak siyah kenarlık (Figma'daki opacity görünümü)
        marginBottom: 25,
    },
    statsRowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statTextColumn: {
        marginLeft: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'Inter',
    },
    statValue: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#00000020',
        marginVertical: 15,
        borderStyle: 'dashed', // Kesik çizgi tasarımı için
    },
    statsRowBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    actionBtn: {
        width: 170, // Figma: 170x46
        height: 46,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    likeBtn: {
        backgroundColor: '#EAEAEA',
    },
    likeBtnActive: {
        backgroundColor: '#000',
    },
    likeBtnText: {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        color: '#000',
    },
    likeBtnTextActive: {
        color: '#FFF',
    },
    planBtn: {
        backgroundColor: '#DA854D',
    },
    planBtnText: {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
        color: '#FFF',
        marginLeft: 5,
    },
    ingredientsBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#00000020',
    },

    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    bulletPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#B65311', // Figma'daki yuvarlak im rengi
        marginRight: 15,
    },
    sectionTitle: {
        fontSize: 20, // Malzemeler başlığı biraz daha tok durmalı
        fontWeight: 'bold',
        fontFamily: 'Inter',
        marginBottom: 15,
        color: '#000',
    },
    ingredientText: {
        fontSize: 16,
        fontFamily: 'Inter',
        color: '#333',
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingRight: 15,
    },
    instructionNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DA854D',
        marginRight: 10,
        width: 20,
    },
    instructionText: {
        fontSize: 15,
        fontFamily: 'Inter',
        color: '#333',
        lineHeight: 22,
    }
});