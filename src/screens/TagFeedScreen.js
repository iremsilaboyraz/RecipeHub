import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeCard from '../components/RecipeCard';

const TagFeedScreen = ({ navigation, route }) => {
    const { tag } = route.params;

    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // API'den etikete ait tarifleri çekme
    useEffect(() => {
        const fetchRecipesByTag = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/recipes/tag/${tag}`);
                const data = await response.json();
                setRecipes(data.recipes);
            } catch (error) {
                console.error("Tarifler yüklenirken hata:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipesByTag();
    }, [tag]);


export default TagFeedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});