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