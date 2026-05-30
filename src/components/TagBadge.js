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

export default React.memo(TagBadge);

const styles = StyleSheet .create({
    badge: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    badgeUnselected: {
        backgroundColor:'#EAEAEA'
    },
badgeSelected: {
        backgroundColor:'#661313',
},
text:{
        fontSize:14,
    fontWeight:'500',
    fontFamily:'Inter',
},
textUnselected: {
        backgroundColor:'#555555',
},
textSelected: {
        backgroundColor:'#FFFFFF',
},
})