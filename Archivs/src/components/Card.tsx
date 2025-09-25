import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
}

export default function Card({
  children,
  variant = 'default',
  onPress,
  style,
  padding = 'md',
}: CardProps) {
  const cardStyle = [
    styles.base,
    styles[variant],
    { padding: spacing[padding] },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.95}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  default: {
    backgroundColor: 'white',
    ...shadows.sm,
  },
  elevated: {
    backgroundColor: 'white',
    ...shadows.lg,
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.neutral200,
  },
  flat: {
    backgroundColor: colors.neutral50,
  },
});