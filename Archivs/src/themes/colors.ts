export const Colors = {
  // Primary Brand Colors
  primary: '#0df2db', // Teal from home feed
  primaryDark: '#14b8a6', // Darker teal
  secondary: '#f26c0d', // Orange from login
  secondaryDark: '#ea580c',

  // Background Colors
  backgroundLight: '#f8f7f5',
  backgroundDark: '#102220',
  backgroundLightAlt: '#f5f8f8',
  backgroundDarkAlt: '#221710',

  // Text Colors
  textLight: '#111817',
  textDark: '#f5f8f8',
  textWhite: '#ffffff',
  textBlack: '#000000',
  textGray: '#666666',
  textSubtle: '#608a86',
  textSubtleDark: '#a0c5c1',

  // Neutral Colors
  neutral100: '#f8fafc',
  neutral200: '#e2e8f0',
  neutral300: '#cbd5e1',
  neutral400: '#94a3b8',
  neutral500: '#64748b',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1e293b',
  neutral900: '#0f172a',

  // Status Colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Transparent Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Gradient Colors
  gradientStart: '#14b8a6',
  gradientEnd: '#f97316',
};

export const GradientColors = {
  splash: {
    colors: ['#14b8a620', 'transparent', '#f9731620'],
    locations: [0, 0.5, 1],
  },
  primary: {
    colors: [Colors.primary, Colors.primaryDark],
    locations: [0, 1],
  },
  secondary: {
    colors: [Colors.secondary, Colors.secondaryDark],
    locations: [0, 1],
  },
  logo: {
    colors: ['#f97316', '#ea580c'],
    locations: [0, 1],
  },
  logoInner: {
    colors: ['#14b8a6', '#0d9488'],
    locations: [0, 1],
  },
};