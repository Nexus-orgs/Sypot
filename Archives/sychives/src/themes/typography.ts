import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const LineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
};

export const Typography = StyleSheet.create({
  // Display styles (for headers and titles)
  displayLarge: {
    fontSize: FontSizes['5xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['5xl'] * LineHeights.tight,
    color: Colors.textBlack,
  },
  displayMedium: {
    fontSize: FontSizes['4xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
    color: Colors.textBlack,
  },
  displaySmall: {
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
    color: Colors.textBlack,
  },

  // Heading styles
  headingLarge: {
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
    color: Colors.textBlack,
  },
  headingMedium: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.xl * LineHeights.tight,
    color: Colors.textBlack,
  },
  headingSmall: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.lg * LineHeights.normal,
    color: Colors.textBlack,
  },

  // Body text styles
  bodyLarge: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.lg * LineHeights.normal,
    color: Colors.textBlack,
  },
  bodyMedium: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.base * LineHeights.normal,
    color: Colors.textBlack,
  },
  bodySmall: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.sm * LineHeights.normal,
    color: Colors.textGray,
  },

  // Caption and label styles
  caption: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.xs * LineHeights.normal,
    color: Colors.textGray,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * LineHeights.normal,
    color: Colors.textBlack,
  },

  // Special text styles
  buttonText: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.base * LineHeights.tight,
    color: Colors.textWhite,
    textAlign: 'center' as const,
  },
  link: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.base * LineHeights.normal,
    color: Colors.primary,
    textDecorationLine: 'underline' as const,
  },
  error: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.sm * LineHeights.normal,
    color: Colors.error,
  },
});

// Font family constants
export const FontFamily = {
  display: 'Plus Jakarta Sans',
  body: 'Plus Jakarta Sans',
};
