import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TagBadge = ({ tag, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.badge,
                isSelected ? styles.badgeSelected : styles.badgeUnselected
            ]}
            onPress={() => onPress(tag)}
            activeOpacity={0.7}
        >
            <Text style={[
                styles.text,
                isSelected ? styles.textSelected : styles.textUnselected
            ]}>
                {tag}
            </Text>
        </TouchableOpacity>
    );
};

// React.memo optimizasyonu zorunluluğu (Performans için)
export default React.memo(TagBadge);

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeUnselected: {
        backgroundColor: '#EAEAEA', // Sadece DIŞ KUTUNUN açık gri arka planı
    },
    badgeSelected: {
        backgroundColor: '#661313', // Seçili dış kutunun koyu kırmızı arka planı
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: 'transparent', // YAZININ ARKASINDAKİ GRİ KUTUYU SİLEN KISIM
    },
    textUnselected: {
        color: '#555555', // Yazının kendi rengi (Koyu Gri)
    },
    textSelected: {
        color: '#FFFFFF', // Seçili yazının kendi rengi (Beyaz)
    },
});