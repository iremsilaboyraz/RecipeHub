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


const MEAL_TYPES = [
    { label: 'Tümü', value: 'all' },
    { label: 'Kahvaltı', value: 'breakfast' },
    { label: 'Öğle Yemeği', value: 'lunch' },
    { label: 'Atıştırmalık', value: 'snack' },
];

const ExploreScreen = ({ navigation }) => {
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
        <View style={styles.container}>
            {/* Header Alanı */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Keşfet</Text>
            </View>

            {/* Meal Type Filtreleri (Yatay Kaydırma) */}
            <View style={styles.mealTypeContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {MEAL_TYPES.map((meal) => (
                        <TouchableOpacity
                            key={meal.value}
                            style={[
                                styles.mealBadge,
                                selectedMealType === meal.value && styles.mealBadgeActive
                            ]}
                            onPress={() => handleMealTypeSelect(meal.value)}
                        >
                            <Text style={[
                                styles.mealText,
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
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Etiket Ara..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Etiketler Bölümü */}
            <Text style={styles.sectionTitle}>Etiketler</Text>

        </View>
    );
};