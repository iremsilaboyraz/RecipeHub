import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const TagFeedScreen = ({ navigation, route }) => {

    const { tag } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{tag} Tarifleri</Text>
            </View>

            <View style={styles.content}>
                <Text>Burada "{tag}" etiketine ait yemek kartları listelenecek.</Text>
            </View>
        </View>
    );
};