import { Ionicons, Feather } from '@expo/vector-icons';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Platform } from 'react-native';
import SPACING from '../constants/spacing';
// Screens
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import TagFeedScreen from '../screens/TagFeedScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import PlaceholderScreen from '../components/PlaceholderScreen';

const Tab = createBottomTabNavigator();

// Tab bar icons
const TAB_ICONS = {
  Feed: '🏠',
  Explore: '🔍',
  Create: '➕',
  Planner: '📅',
  Settings: '⚙️',
};

const TAB_LABELS = {
  Feed: 'Ana Sayfa',
  Explore: 'Keşfet',
  Create: 'Oluştur',
  Planner: 'Plan',
  Settings: 'Ayarlar',
};

const Stack = createNativeStackNavigator();

const FeedStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FeedMain" component={FeedScreen} />
        {/* İleride Kişi C buraya RecipeDetailScreen ekleyecek */}
    </Stack.Navigator>
);
const ExploreStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ExploreMain" component={ExploreScreen} />
        <Stack.Screen name="TagFeed" component={TagFeedScreen} />

        {/* İşte köprü burası! name="RecipeDetail" kısmı birebir eşleşmeli */}
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
);
const PlannerStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PlannerMain" component={PlannerScreen} />
        {/* İleride buraya ShoppingListScreen eklenecek */}
    </Stack.Navigator>
);
const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SettingsMain" component={SettingsScreen} />
        {/* İleride buraya ProfileScreen eklenecek */}
    </Stack.Navigator>
);

// Placeholder screens for Person B & C
const FeedScreen = () => <PlaceholderScreen title="Ana Sayfa (Feed)" />;
const PlannerScreen = () => <PlaceholderScreen title="Haftalık Plan (Planner)" />;

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Üstteki varsayılan başlıkları gizle
                tabBarShowLabel: false, // FIGMA TASARIMINDAKİ GİBİ ALT YAZILARI GİZLE
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#EAEAEA',
                    height: 80, // Tıklama alanı için ideal yükseklik
                    paddingBottom: 20, // iOS cihazlar için alt boşluk
                    paddingTop: 10,
                },
                tabBarIcon: ({ focused }) => {
                    // Renk ayarları
                    const iconColor = focused ? '#DA854D' : '#000000';
                    const iconSize = 28;

                    if (route.name === 'Ana Sayfa') {
                        return <Ionicons name={focused ? 'home' : 'home-outline'} size={iconSize} color={iconColor} />;
                    } else if (route.name === 'Keşfet') {
                        return <Ionicons name={focused ? 'search' : 'search-outline'} size={iconSize} color={iconColor} />;
                    } else if (route.name === 'Ekle') {
                        // Soru işaretini çözen kısım: Ionicons kütüphanesinden garantili "add" ikonu.
                        // Tıklansa da tıklanmasa da hep artı (+) olarak kalacak.
                        // İstersen daha belirgin olması için size={34} gibi bir tık daha büyük yapabilirsin.
                        return <Ionicons name="add" size={32} color={iconColor} />;
                    } else if (route.name === 'Plan') {
                        return <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={iconSize} color={iconColor} />;
                    } else if (route.name === 'Profil') {
                        return <Ionicons name={focused ? 'person' : 'person-outline'} size={iconSize} color={iconColor} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Ana Sayfa" component={FeedScreen} />
            <Tab.Screen name="Keşfet" component={ExploreStack} />
            <Tab.Screen name="Ekle" component={CreateRecipeScreen} />
            <Tab.Screen name="Plan" component={PlannerScreen} />
            <Tab.Screen name="Profil" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;