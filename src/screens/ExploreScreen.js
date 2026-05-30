import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TagBadge from '../components/TagBadge';


const MEAL_TYPES = [
    { label: 'Tümü', value: 'all' },
    { label: 'Kahvaltı', value: 'breakfast' },
    { label: 'Öğle Yemeği', value: 'lunch' },
    { label: 'Atıştırmalık', value: 'snack' },
];

