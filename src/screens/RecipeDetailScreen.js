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