import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';  // ← DEĞİŞTİ
import SPACING from '../constants/spacing';
/**
 * StepIndicator
 * Props:
 *   currentStep  - 1-indexed current step (e.g. 1, 2, 3)
 *   totalSteps   - total number of steps (default 3)
 *   labels       - optional string array of step labels
 */
const StepIndicator = ({ currentStep = 1, totalSteps = 3, labels }) => {
  const { theme } = useTheme();
  const s = makeStyles(theme);
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <View style={s.wrapper}>
      {/* Progress bar track */}
      <View style={s.trackContainer}>
        <View style={s.track}>
          <View style={[s.fill, { width: `${progress}%` }]} />
        </View>

        {/* Step dots */}
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum    = i + 1;
          const isComplete = stepNum < currentStep;
          const isActive   = stepNum === currentStep;

          return (
            <View
              key={stepNum}
              style={[
                s.dot,
                isComplete && s.dotComplete,
                isActive && s.dotActive,
                { left: `${(i / (totalSteps - 1)) * 100}%` },
              ]}
            >
              {isComplete ? (
                <Text style={s.checkMark}>✓</Text>
              ) : (
                <Text style={[s.dotLabel, isActive && s.dotLabelActive]}>{stepNum}</Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Text labels below dots */}
      {labels && labels.length === totalSteps && (
        <View style={s.labelsRow}>
          {labels.map((lbl, i) => {
            const stepNum  = i + 1;
            const isActive = stepNum === currentStep;
            return (
              <View key={i} style={s.labelCell}>
                <Text style={[s.labelText, isActive && s.labelTextActive]}>{lbl}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const DOT_SIZE = 28;

const makeStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: SPACING.md,
      paddingTop: SPACING.sm,
      paddingBottom: SPACING.md,
    },
    // Track
    trackContainer: {
      height: DOT_SIZE,
      justifyContent: 'center',
      position: 'relative',
    },
    track: {
      height: 4,
      backgroundColor: theme.border,
      borderRadius: 2,
      marginHorizontal: DOT_SIZE / 2,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      backgroundColor: theme.primary,
      borderRadius: 2,
    },
    // Dots
    dot: {
      position: 'absolute',
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: DOT_SIZE / 2,
      backgroundColor: theme.surface,
      borderWidth: 2.5,
      borderColor: theme.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -(DOT_SIZE / 2),
    },
    dotActive: {
      borderColor: theme.primary,
      backgroundColor: theme.primary,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 4,
    },
    dotComplete: {
      borderColor: theme.primary,
      backgroundColor: theme.primary,
    },
    dotLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    dotLabelActive: {
      color: '#FFFFFF',
    },
    checkMark: {
      fontSize: 13,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    // Labels
    labelsRow: {
      flexDirection: 'row',
      marginTop: SPACING.xs,
    },
    labelCell: {
      flex: 1,
      alignItems: 'center',
    },
    labelText: {
      fontSize: 11,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    labelTextActive: {
      color: theme.primary,
      fontWeight: '700',
    },
  });

export default StepIndicator;