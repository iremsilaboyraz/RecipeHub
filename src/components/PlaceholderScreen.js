import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import SPACING from '../constants/spacing';

/**
 * Placeholder screen for unimplemented features
 * Used by Person B and Person C screens
 */
const PlaceholderScreen = ({ title = 'Ekran' }) => {
  const { theme } = useTheme();
  const s = makeStyles(theme);

  return (
    <View style={s.container}>
      <Text style={s.icon}>🚧</Text>
      <Text style={s.title}>{title}</Text>
      <Text style={s.subtitle}>Bu sayfa yakında hazır olacak</Text>
    </View>
  );
};

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingHorizontal: SPACING.lg,
    },
    icon: {
      fontSize: 64,
      marginBottom: SPACING.md,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
      marginBottom: SPACING.xs,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
    },
  });

export default PlaceholderScreen;