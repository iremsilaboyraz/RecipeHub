import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DAYS_OF_WEEK = [
    { id: 'Monday', label: 'Pazartesi' },
    { id: 'Tuesday', label: 'Salı' },
    { id: 'Wednesday', label: 'Çarşamba' },
    { id: 'Thursday', label: 'Perşembe' },
    { id: 'Friday', label: 'Cuma' },
    { id: 'Saturday', label: 'Cumartesi' },
    { id: 'Sunday', label: 'Pazar' },
];

const DayPickerModal = ({ visible, onClose, onSelectDay }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Günü Seçin</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={DAYS_OF_WEEK}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dayItem}
                                onPress={() => {
                                    onSelectDay(item.id);
                                    onClose();
                                }}
                            >
                                <Text style={styles.dayText}>{item.label}</Text>
                                <Ionicons name="chevron-forward" size={20} color="#DA854D" />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default DayPickerModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '60%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter',
    },
    dayItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    dayText: {
        fontSize: 16,
        fontFamily: 'Inter',
    }
});