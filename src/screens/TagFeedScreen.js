import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const TagFeedScreen = ({ navigation, route }) => {

    const { tag } = route.params;