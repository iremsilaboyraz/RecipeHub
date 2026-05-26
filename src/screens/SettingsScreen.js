import React from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';  // ← DEĞİŞTİ
import { useTheme } from '../context/ThemeContext';  // ← DEĞİŞTİ
import SPACING from '../constants/spacing';
const SettingsScreen = () => {
    const { user, logout } = useAuth();
    const { theme, isDark, toggleTheme } = useTheme();
    const s = makeStyles(theme);

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Hesabından çıkmak istediğine emin misin?',
            [
                { text: 'Vazgeç', style: 'cancel' },
                { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
            ]
        );
    };

    return (
        <ScrollView
            style={s.screen}
            contentContainerStyle={s.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={s.header}>
                <Text style={s.headerTitle}>Ayarlar</Text>
            </View>

            {/* Profile Card */}
            <View style={s.profileCard}>
                <View style={s.avatarCircle}>
                    <Text style={s.avatarEmoji}>👩‍🍳</Text>
                </View>
                <View style={s.profileInfo}>
                    <Text style={s.profileName}>
                        {user?.firstName ?? ''} {user?.lastName ?? ''}
                    </Text>
                    <Text style={s.profileUsername}>@{user?.username ?? 'kullanici'}</Text>
                </View>
            </View>

            {/* Dark Mode Toggle */}
            <View style={s.section}>
                <Text style={s.sectionTitle}>GÖRÜNÜM</Text>
                <View style={s.card}>
                    <View style={s.row}>
                        <View style={s.iconBox}>
                            <Text style={s.icon}>{isDark ? '🌙' : '☀️'}</Text>
                        </View>
                        <View style={s.textBlock}>
                            <Text style={s.label}>Karanlık Mod</Text>
                            <Text style={s.subtitle}>
                                {isDark ? 'Açık — karanlık tema aktif' : 'Kapalı — aydınlık tema aktif'}
                            </Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: theme.border, true: theme.primary }}
                            thumbColor={Platform.OS === 'android' ? (isDark ? theme.primary : '#f4f3f4') : undefined}
                            ios_backgroundColor={theme.border}
                        />
                    </View>
                </View>
            </View>

            {/* Logout */}
            <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
                <Text style={s.logoutText}>🚪  Çıkış Yap</Text>
            </TouchableOpacity>

            <View style={{ height: SPACING.xl }} />
        </ScrollView>
    );
};

const makeStyles = (theme) =>
    StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.background },
        content: { padding: SPACING.md },
        header: { marginBottom: SPACING.lg, paddingTop: SPACING.sm },
        headerTitle: {
            fontSize: 30,
            fontWeight: '800',
            color: theme.text,
        },
        // Profile card
        profileCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: SPACING.md,
            marginBottom: SPACING.lg,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
        },
        avatarCircle: {
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: theme.primary + '22',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: SPACING.sm,
        },
        avatarEmoji: { fontSize: 28 },
        profileInfo: { flex: 1 },
        profileName: { fontSize: 17, fontWeight: '700', color: theme.text },
        profileUsername: { fontSize: 13, color: theme.textSecondary, marginTop: 2 },
        // Section
        section: { marginBottom: SPACING.lg },
        sectionTitle: {
            fontSize: 12,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            color: theme.textSecondary,
            marginBottom: SPACING.xs,
            paddingHorizontal: SPACING.md,
        },
        card: {
            backgroundColor: theme.surface,
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SPACING.sm + 2,
            paddingHorizontal: SPACING.md,
        },
        iconBox: {
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: theme.inputBg,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: SPACING.sm,
        },
        icon: { fontSize: 20 },
        textBlock: { flex: 1 },
        label: { fontSize: 15, fontWeight: '600', color: theme.text },
        subtitle: { fontSize: 12, color: theme.textSecondary, marginTop: 2 },
        // Logout
        logoutBtn: {
            backgroundColor: theme.error + '18',
            borderRadius: 14,
            paddingVertical: SPACING.md,
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: theme.error + '44',
        },
        logoutText: {
            color: theme.error,
            fontSize: 15,
            fontWeight: '700',
        },
    });

export default SettingsScreen;