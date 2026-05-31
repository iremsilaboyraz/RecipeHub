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
import { useRecipe } from '../context/RecipeContext';

const TagFeedScreen = ({ navigation, route }) => {
    const { tag } = route.params;

    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { liked, likeRecipe } = useRecipe();

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

    const filteredRecipes = useMemo(() => {
        if (!searchQuery.trim()) return recipes;
        return recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [recipes, searchQuery]);


    const handleRecipePress = useCallback((recipe) => {
        console.log("Karta tıklandı, Gidilecek Tarif:", recipe.name);
        // Buradaki 'RecipeDetail' ismi, AppNavigator'daki name ile BİREBİR aynı olmalı
        navigation.navigate('RecipeDetail', { recipe: recipe });
    }, [navigation]);


    const renderItem = useCallback(({ item }) => (
        <RecipeCard
            recipe={item}
            onPress={handleRecipePress}
            onLike={() => likeRecipe(item.id)} // Tıklanınca Context'teki fonksiyon çalışır
            isLiked={liked.includes(item.id)}  // Context'teki liked dizisinde bu ID var mı diye bakar
        />
    ), [handleRecipePress, likeRecipe, liked]);


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{tag} Tarifleri</Text>
            </View>

            {/* Arama Çubuğu */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Bu etikette tarif ara..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Liste Gösterimi */}
            {isLoading ? (
                <View style={styles.centerBox}>
                    <ActivityIndicator size="large" color="#FF7700" />
                </View>
            ) : filteredRecipes.length === 0 ? (
                <View style={styles.centerBox}>
                    <Text style={styles.emptyText}>Bu aramaya uygun tarif bulunamadı.</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={6} // Performans zorunluluğu
                    removeClippedSubviews={true}
                />
            )}
        </View>
    );
};



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
        marginBottom: 15,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        textTransform: 'capitalize',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    centerBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    }
});