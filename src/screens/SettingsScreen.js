import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Contexts
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { usePlanner } from '../context/PlannerContext';
import { useRecipe } from '../context/RecipeContext';


const SettingsScreen = () => {
    // Context Verileri
    const { logout } = useAuth(); // Çıkış yap fonksiyonu (App.js'deki Login ekranına atar)
    const { theme, isDark, toggleTheme } = useTheme(); // Karanlık mod kontrolü
    const { weekly, totalPlanned } = usePlanner();
    const { favorites, liked, recipes, toggleFavorite } = useRecipe();

    // Yerel Stateler
    const [activeTab, setActiveTab] = useState('İstatistikler');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Planlanan gün sayısını hesaplama (0/7 kısmı için)
    const plannedDaysCount = Object.values(weekly || {}).filter(dayRecipes => dayRecipes.length > 0).length;

    // Tema Renkleri (Karanlık moda göre otomatik değişir)
    const currentTextColor = isDark ? '#FFFFFF' : '#000000';
    const currentSecondaryText = isDark ? '#AAAAAA' : '#888888';
    const currentCardBg = isDark ? '#1E1E1E' : '#FFFFFF';
    const currentBorderColor = isDark ? '#444444' : '#E0E0E0';
    const currentScreenBg = isDark ? '#121212' : '#FAFAFA';


    return (
        <ScrollView style={[styles.container, { backgroundColor: currentScreenBg }]} showsVerticalScrollIndicator={false}>

            {/* --- KULLANICI BİLGİLERİ VE ÇIKIŞ --- */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={[styles.userName, { color: currentTextColor }]}>Emily</Text>
                    <Text style={[styles.userName, { color: currentTextColor }]}>Johnson</Text>
                    <Text style={[styles.userHandle, { color: currentSecondaryText }]}>@emilys</Text>
                </View>

                {/* Çıkış Yap Butonu */}
                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
                    <Text style={styles.logoutText}>Çıkış</Text>
                </TouchableOpacity>
            </View>

            {/* --- İSTATİSTİK KARTLARI (Figma Birebir Renkler) --- */}
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: 'rgba(48, 100, 212, 0.15)' }]}>
                    <Text style={[styles.statTitle, { color: '#3064D4' }]}>Beğeniler</Text>
                    <Text style={[styles.statValue, { color: '#3064D4' }]}>{liked ? liked.length : 0}</Text>
                </View>

                <View style={[styles.statCard, { backgroundColor: 'rgba(255, 119, 0, 0.15)' }]}>
                    <Text style={[styles.statTitle, { color: '#FF7700' }]}>Favoriler</Text>
                    <Text style={[styles.statValue, { color: '#FF7700' }]}>{favorites ? favorites.length : 0}</Text>
                </View>

                <View style={[styles.statCard, { backgroundColor: 'rgba(52, 168, 83, 0.15)' }]}>
                    <Text style={[styles.statTitle, { color: '#34A853' }]}>Planlanan</Text>
                    <Text style={[styles.statValue, { color: '#34A853' }]}>{totalPlanned || 0}</Text>
                </View>
            </View>

            {/* --- SEKMELER (TABS) --- */}
            <View style={styles.tabsRow}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'İstatistikler' && styles.activeTab]}
                    onPress={() => setActiveTab('İstatistikler')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: activeTab === 'İstatistikler' ? '#FF7700' : currentSecondaryText },
                        activeTab === 'İstatistikler' && { fontWeight: 'bold' }
                    ]}>
                        İstatistikler
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Favori Tarifler' && styles.activeTab]}
                    onPress={() => setActiveTab('Favori Tarifler')}
                >
                    <Text style={[
                        styles.tabText,
                        { color: activeTab === 'Favori Tarifler' ? '#FF7700' : currentSecondaryText },
                        activeTab === 'Favori Tarifler' && { fontWeight: 'bold' }
                    ]}>
                        Favori Tarifler
                    </Text>
                </TouchableOpacity>
            </View>

            {/* --- SEKME İÇERİĞİ --- */}
            {activeTab === 'İstatistikler' ? (
                <View style={styles.tabContent}>

                    {/* Haftalık Plan Özeti Kartı */}
                    <View style={[styles.card, { backgroundColor: currentCardBg, borderColor: currentBorderColor }]}>
                        <Text style={[styles.cardTitle, { color: currentTextColor }]}>Haftalık Plan Özeti</Text>

                        <View style={styles.planSummaryRow}>
                            <View style={styles.planSummaryItem}>
                                <Text style={styles.planSummaryLabel}>Planlanan Günler</Text>
                                <Text style={styles.planSummaryValue}>{plannedDaysCount}/7</Text>
                            </View>
                            <View style={styles.planSummaryItem}>
                                <Text style={styles.planSummaryLabel}>Toplam Öğün</Text>
                                <Text style={styles.planSummaryValue}>{totalPlanned || 0}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Ayarlar Kartı (Karanlık Mod & Bildirimler) */}
                    <View style={[styles.card, { backgroundColor: currentCardBg, borderColor: currentBorderColor, marginTop: 20 }]}>
                        <Text style={[styles.cardTitle, { color: currentTextColor, marginBottom: 20 }]}>Ayarlar</Text>

                        {/* Tema Switch */}
                        <View style={styles.settingRow}>
                            <View style={styles.settingInfo}>
                                <View style={[styles.iconBox, { backgroundColor: '#F0F0F0' }]}>
                                    <Ionicons name="moon" size={20} color="#333" />
                                </View>
                                <View>
                                    <Text style={[styles.settingName, { color: currentTextColor }]}>Tema</Text>
                                    <Text style={styles.settingDesc}>{isDark ? 'Karanlık Mod' : 'Açık Mod'}</Text>
                                </View>
                            </View>
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: "#E0E0E0", true: "#FF7700" }}
                                thumbColor={"#FFF"}
                            />
                        </View>

                        {/* Bildirim Switch */}
                        <View style={[styles.settingRow, { marginTop: 20 }]}>
                            <View style={styles.settingInfo}>
                                <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 119, 0, 0.15)' }]}>
                                    <Ionicons name="notifications" size={20} color="#FF7700" />
                                </View>
                                <View>
                                    <Text style={[styles.settingName, { color: currentTextColor }]}>Bildirimler</Text>
                                    <Text style={styles.settingDesc}>{notificationsEnabled ? 'Bildirimler Açık' : 'Bildirimler Kapalı'}</Text>
                                </View>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                                trackColor={{ false: "#E0E0E0", true: "#FF7700" }}
                                thumbColor={"#FFF"}
                            />
                        </View>

                    </View>

                </View>
            ) : (

                <View style={styles.tabContent}>
                    {/* YENİ EKLENEN FAVORİLER LİSTESİ */}
                    {favorites && favorites.length > 0 ? (
                        favorites.map((recipeId) => {
                            // Favori ID'sine sahip tarifi tüm tarifler arasından bul
                            const recipe = recipes?.find(r => r.id === recipeId);

                            if (!recipe) return null; // Eğer tarif bulunamazsa boş dön

                            return (
                                <View key={recipe.id} style={[styles.favoriteCard, { backgroundColor: currentCardBg, borderColor: currentBorderColor }]}>
                                    {/* Tarif Görseli */}
                                    <Image
                                        source={{ uri: recipe.image || 'https://via.placeholder.com/150' }}
                                        style={styles.favoriteImage}
                                    />

                                    {/* Tarif Bilgileri */}
                                    <View style={styles.favoriteInfo}>
                                        <Text style={[styles.favoriteTitle, { color: currentTextColor }]} numberOfLines={1}>
                                            {recipe.title || recipe.name}
                                        </Text>
                                        <Text style={styles.favoriteTime}>{recipe.time || '35 dk'}</Text>
                                    </View>

                                    {/* Favoriden Çıkarma Butonu */}
                                    <TouchableOpacity
                                        style={styles.removeFavoriteBtn}
                                        onPress={() => toggleFavorite(recipe.id)}
                                    >
                                        <Ionicons name="bookmark" size={24} color="#FF7700" />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    ) : (
                        <Text style={{ color: currentSecondaryText, textAlign: 'center', marginTop: 30 }}>
                            Henüz favori tarifiniz bulunmuyor.
                        </Text>
                    )}
                </View>
            )}

            {/* Alt kısımda biraz boşluk kalması için */}
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 35
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45
    },
    userInfo: {
        marginLeft: 20,
        flex: 1
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        lineHeight: 28
    },
    userHandle: {
        fontSize: 14,
        marginTop: 4
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(211, 47, 47, 0.1)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12
    },
    logoutText: {
        color: '#D32F2F',
        marginLeft: 6,
        fontWeight: '600',
        fontSize: 16
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    statCard: {
        width: 104,
        height: 94,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    tabsRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 25
    },
    tab: {
        paddingVertical: 10,
        marginRight: 25
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF7700'
    },
    tabText: {
        fontSize: 18,
        fontFamily: 'Inria Sans'
    },
    tabContent: {
        flex: 1,
    },
    card: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold'
    },
    planSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    },
    planSummaryItem: {
        alignItems: 'center'
    },
    planSummaryLabel: {
        color: '#888',
        fontSize: 14,
        marginBottom: 8
    },
    planSummaryValue: {
        color: '#B65311',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Inter'
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    settingName: {
        fontSize: 16,
        fontWeight: '600'
    },
    settingDesc: {
        fontSize: 13,
        color: '#888',
        marginTop: 2
    }
});