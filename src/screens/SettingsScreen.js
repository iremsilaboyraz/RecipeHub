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