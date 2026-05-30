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

        </View>
    );
};