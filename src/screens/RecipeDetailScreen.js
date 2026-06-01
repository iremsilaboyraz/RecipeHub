import { useTheme } from '../context/ThemeContext';
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
    const { isDark } = useTheme();

    // Karanlık mod için tüm renk değişkenleri
    const currentBg = isDark ? '#121212' : '#FAFAFA';
    const currentCardBg = isDark ? '#1E1E1E' : '#FFFFFF';
    const currentText = isDark ? '#FFFFFF' : '#000000';
    const currentSubText = isDark ? '#CCCCCC' : '#333333';
    const currentBorder = isDark ? '#333333' : '#00000020';
    const currentLikeBtnBg = isDark ? '#333333' : '#EAEAEA';

    const { recipe } = route.params || {};
    const { liked, likeRecipe, favorites, toggleFavorite } = useRecipe();
    const { addToDay } = usePlanner();

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
            <View style={[styles.centerBox, { backgroundColor: currentBg }]}>
                <Text style={{ color: currentText }}>Tarif bulunamadı.</Text>
            </View>
        );
    }

    const isLiked = liked.includes(recipe.id);
    const isFavorite = favorites.includes(recipe.id);

    const handleAddToPlan = (dayId) => {
        addToDay(dayId, recipe);
        setModalVisible(false);
        Alert.alert("Başarılı", `Tarif ${dayId} gününe planlandı!`);
    };

    return (
        <View style={[styles.container, { backgroundColor: currentBg }]}>
            {/* Header Alanı */}
            <View style={[styles.header, { backgroundColor: currentBg }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
                    <Ionicons name="chevron-back" size={28} color={currentText} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: currentText, marginBottom: 0, fontSize: 24 }]}>Tarif Detayı</Text>
                <TouchableOpacity onPress={() => toggleFavorite(recipe.id)} style={styles.headerIcon}>
                    <Ionicons
                        name={isFavorite ? "bookmark" : "bookmark-outline"}
                        size={28}
                        color={isFavorite ? "#DA854D" : currentText}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Hero Görseli */}
                <Animated.Image
                    source={{ uri: recipe.image }}
                    style={[styles.heroImage, { opacity: fadeAnim }]}
                />

                <View style={styles.contentContainer}>
                    {/* Başlık ve Alt Başlık */}
                    <Text style={[styles.title, { color: currentText }]}>{recipe.name}</Text>
                    <Text style={styles.subtitle}>{recipe.cuisine} çeşitleri</Text>

                    {/* İstatistik Kutusu */}
                    <View style={[styles.statsBox, { backgroundColor: currentCardBg, borderColor: currentBorder }]}>
                        <View style={styles.statsRowTop}>
                            <View style={styles.statItem}>
                                <Ionicons name="time-outline" size={20} color={currentText} />
                                <View style={styles.statTextColumn}>
                                    <Text style={styles.statLabel}>Toplam Süre</Text>
                                    <Text style={[styles.statValue, { color: currentText }]}>{recipe.prepTimeMinutes + recipe.cookTimeMinutes}dk</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="flame-outline" size={20} color="#B65311" />
                                <View style={styles.statTextColumn}>
                                    <Text style={styles.statLabel}>Kalori</Text>
                                    <Text style={[styles.statValue, { color: currentText }]}>{recipe.caloriesPerServing}</Text>
                                </View>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="people-outline" size={20} color={currentText} />
                                <View style={styles.statTextColumn}>
                                    <Text style={styles.statLabel}>Porsiyon</Text>
                                    <Text style={[styles.statValue, { color: currentText }]}>{recipe.servings}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: currentBorder }]} />

                        <View style={styles.statsRowBottom}>
                            <Ionicons name="star" size={24} color="#B65311" />
                            <View style={styles.statTextColumn}>
                                <Text style={styles.statLabel}>Puan</Text>
                                <Text style={[styles.statValue, { color: currentText }]}>{recipe.rating}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Aksiyon Butonları */}
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: currentLikeBtnBg }]}
                            onPress={() => likeRecipe(recipe.id)}
                        >
                            <Text style={[styles.likeBtnText, { color: currentText }]}>
                                {isLiked ? "Beğenildi" : "Beğen"}
                            </Text>
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
                    <View style={[styles.ingredientsBox, { backgroundColor: currentCardBg, borderColor: currentBorder }]}>
                        <Text style={[styles.sectionTitle, { color: currentText }]}>Malzemeler</Text>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientRow}>
                                <View style={styles.bulletPoint} />
                                <Text style={[styles.ingredientText, { color: currentSubText }]}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Talimatlar Listesi */}
                    <View style={[styles.ingredientsBox, { backgroundColor: currentCardBg, borderColor: currentBorder, marginTop: 20 }]}>
                        <Text style={[styles.sectionTitle, { color: currentText }]}>Talimatlar</Text>
                        {recipe.instructions && recipe.instructions.map((instruction, index) => (
                            <View key={index} style={styles.instructionRow}>
                                <Text style={styles.instructionNumber}>{index + 1}.</Text>
                                <Text style={[styles.instructionText, { color: currentSubText }]}>{instruction}</Text>
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

// STYLESHEET (Sabit renkler temizlendi, sadece yapısal stiller bırakıldı)
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingTop: 50,
        paddingBottom: 15,
    },
    headerIcon: {
        padding: 5,
    },
    heroImage: {
        width: '100%',
        height: 268,
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
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Inria Sans',
        fontWeight: '300',
        color: '#B65311',
        marginBottom: 20,
    },
    statsBox: {
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
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
    },
    divider: {
        height: 1,
        marginVertical: 15,
        borderStyle: 'dashed',
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
        width: 170,
        height: 46,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    likeBtnText: {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '500',
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
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
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
        backgroundColor: '#B65311',
        marginRight: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        marginBottom: 15,
    },
    ingredientText: {
        fontSize: 16,
        fontFamily: 'Inter',
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
        lineHeight: 22,
    }
});