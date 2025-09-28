export const colors = {
  // Primary brand colors from designs
  primary: '#14b8a6', // Teal from splash
  primaryOrange: '#f97316', // Orange from splash

  // Background colors
  backgroundLight: '#f8fafc',
  backgroundDark: '#0a0a0a',

  // Text colors
  textLight: '#f8fafc',
  textDark: '#1e293b',

  // Neutral colors
  neutral50: '#f8fafc',
  neutral100: '#f1f5f9',
  neutral200: '#e2e8f0',
  neutral300: '#cbd5e1',
  neutral400: '#94a3b8',
  neutral500: '#64748b',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1e293b',
  neutral900: '#0f172a',

  // Semantic colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Home feed specific colors
  homeFeedPrimary: '#0df2db',
  homeFeedBackground: '#f5f8f8',
  homeFeedBackgroundDark: '#102220',
  homeFeedText: '#111817',
  homeFeedTextDark: '#f5f8f8',
  homeFeedSubtle: '#608a86',
  homeFeedSubtleDark: '#a0c5c1',

  // Login specific colors
  loginPrimary: '#f26c0d',
  loginBackground: '#f8f7f5',
  loginBackgroundDark: '#221710',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};

export type Theme = typeof theme;
