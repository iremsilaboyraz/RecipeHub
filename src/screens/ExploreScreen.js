import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TagBadge from '../components/TagBadge';
import { useTheme } from '../context/ThemeContext'; // <-- Tema eklendi

const MEAL_TYPES = [
    { label: 'Tümü', value: 'all' },
    { label: 'Kahvaltı', value: 'breakfast' },
    { label: 'Öğle Yemeği', value: 'lunch' },
    { label: 'Atıştırmalık', value: 'snack' },
];

const ExploreScreen = ({ navigation }) => {
    // Tema hook'unu ve renk değişkenlerini tanımladık
    const { isDark } = useTheme();
    const currentBg = isDark ? '#121212' : '#FAFAFA';
    const currentText = isDark ? '#FFFFFF' : '#000000';
    const currentSubText = isDark ? '#CCCCCC' : '#555555';
    const currentInputBg = isDark ? '#1E1E1E' : '#FFFFFF';
    const currentBorder = isDark ? '#333333' : '#E0E0E0';
    const currentBadgeBg = isDark ? '#333333' : '#EAEAEA';
    const currentPlaceholder = isDark ? '#AAAAAA' : '#888888';

    const [tags, setTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    // API'den tüm etiketleri çekme
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('https://dummyjson.com/recipes/tags');
                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error("Etiketler yüklenirken hata oluştu:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTags();
    }, []);

    const handleMealTypeSelect = useCallback((type) => {
        setSelectedMealType(type);
    }, []);

    const handleTagPress = useCallback((tag) => {
        navigation.navigate('TagFeed', { tag }); // TagFeed ekranına yönlendirme
    }, [navigation]);

    const filteredTags = useMemo(() => {
        if (!searchQuery.trim()) return tags;
        return tags.filter(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tags, searchQuery]);

    return (
        <View style={[styles.container, { backgroundColor: currentBg }]}>
            {/* Header Alanı */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={currentText} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: currentText }]}>Keşfet</Text>
            </View>

            {/* Meal Type Filtreleri (Yatay Kaydırma) */}
            <View style={styles.mealTypeContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {MEAL_TYPES.map((meal) => (
                        <TouchableOpacity
                            key={meal.value}
                            style={[
                                styles.mealBadge,
                                { backgroundColor: currentBadgeBg }, // Dinamik arka plan
                                selectedMealType === meal.value && styles.mealBadgeActive
                            ]}
                            onPress={() => handleMealTypeSelect(meal.value)}
                        >
                            <Text style={[
                                styles.mealText,
                                { color: currentSubText }, // Dinamik yazı rengi
                                selectedMealType === meal.value && styles.mealTextActive
                            ]}>
                                {meal.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.divider} />

            {/* Arama Çubuğu */}
            <View style={[styles.searchContainer, { backgroundColor: currentInputBg, borderColor: currentBorder }]}>
                <Ionicons name="search-outline" size={20} color={currentPlaceholder} style={styles.searchIcon} />
                <TextInput
                    style={[styles.searchInput, { color: currentText }]}
                    placeholder="Etiket Ara..."
                    placeholderTextColor={currentPlaceholder}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Etiketler Bölümü */}
            <Text style={[styles.sectionTitle, { color: currentText }]}>Etiketler</Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="#FF7700" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.tagsWrapper}>
                    {filteredTags.map((tag) => (
                        <TagBadge
                            key={tag}
                            tag={tag}
                            isSelected={tag === 'Salad' || tag === 'Hamur İşleri'} // Figma'daki görünümü simüle etmek için
                            onPress={handleTagPress}
                        />
                    ))}
                </ScrollView>
            )}

        </View>
    );
};

export default ExploreScreen;

// STYLESHEET (Sabit renkler temizlendi)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    mealTypeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    mealBadge: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
    },
    mealBadgeActive: {
        backgroundColor: '#FF7700', // Turuncu (sabit kalmalı)
    },
    mealText: {
        fontSize: 14,
        fontWeight: '500',
    },
    mealTextActive: {
        color: '#FFF', // Aktifken her zaman beyaz olmalı
    },
    divider: {
        height: 1,
        backgroundColor: '#FF7700',
        opacity: 0.5,
        marginHorizontal: -20,
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        marginBottom: 25,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Inter',
        marginBottom: 15,
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 20,
    },
});