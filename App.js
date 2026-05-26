import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Providers
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { RecipeProvider } from './src/context/RecipeContext';
import { PlannerProvider } from './src/context/PlannerContext';

// Hooks - Context'lerden import
import { useAuth } from './src/context/AuthContext';  // ← DEĞİŞTİ
import { useTheme } from './src/context/ThemeContext';  // ← DEĞİŞTİ

// Screens & Navigation
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';
const Stack = createNativeStackNavigator();

// Root Navigator — switches between Login and App based on auth
const RootNavigator = () => {
    const { isSignedIn, isLoading } = useAuth();
    const { theme, isDark } = useTheme();

    // Show splash while restoring token
    if (isLoading) {
        return (
            <View style={[styles.splash, { backgroundColor: theme.background }]}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                {isSignedIn ? (
                    <Stack.Screen name="Main" component={AppNavigator} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// App — Provider Tree
export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RecipeProvider>
                    <PlannerProvider>
                        <RootNavigator />
                    </PlannerProvider>
                </RecipeProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});