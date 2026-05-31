import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';  // ← DEĞİŞTİ
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
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          // Special styling for Create button (center)
          if (route.name === 'Create') {
            return (
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: theme.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: Platform.OS === 'ios' ? 10 : 20,
                  shadowColor: theme.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Text style={{ fontSize: 24 }}>{TAB_ICONS[route.name]}</Text>
              </View>
            );
          }

          return (
            <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>
              {TAB_ICONS[route.name]}
            </Text>
          );
        },
        tabBarLabel: route.name === 'Create' ? '' : TAB_LABELS[route.name],
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      })}
    >
        <Tab.Screen name="Feed" component={FeedStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />

        <Tab.Screen name="Create" component={CreateRecipeScreen} />

        <Tab.Screen name="Planner" component={PlannerStack} />
        <Tab.Screen name="Settings" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;