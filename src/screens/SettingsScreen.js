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
    const { favorites, liked } = useRecipe();

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
                    <Text style={{ color: currentSecondaryText, textAlign: 'center', marginTop: 30 }}>
                        Favori tarifleriniz burada listelenecek...
                    </Text>
                </View>
            )}

            {/* Alt kısımda biraz boşluk kalması için */}
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};