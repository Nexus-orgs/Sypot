import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  containerDark: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
  },
  safeArea: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Typography
  heading1: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
    lineHeight: theme.typography.fontSize['4xl'] * theme.typography.lineHeight.tight,
  },
  heading2: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
    lineHeight: theme.typography.fontSize['3xl'] * theme.typography.lineHeight.tight,
  },
  heading3: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '600',
    color: theme.colors.textLight,
    lineHeight: theme.typography.fontSize['2xl'] * theme.typography.lineHeight.tight,
  },
  bodyText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.textLight,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
  },
  bodyTextMedium: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    color: theme.colors.textLight,
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
  },
  caption: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.subtleLight,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
  },
  // Spacing
  paddingHorizontal: {
    paddingHorizontal: theme.spacing.md,
  },
  paddingVertical: {
    paddingVertical: theme.spacing.md,
  },
  marginHorizontal: {
    marginHorizontal: theme.spacing.md,
  },
  marginVertical: {
    marginVertical: theme.spacing.md,
  },
  // Buttons
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.default,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.white,
  },
  buttonTextSecondary: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  // Cards
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.default,
  },
  cardDark: {
    backgroundColor: theme.colors.gray[800],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.md,
  },
  // Forms
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.default,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.textLight,
  },
  inputDark: {
    backgroundColor: theme.colors.gray[800],
    borderWidth: 1,
    borderColor: theme.colors.gray[600],
    borderRadius: theme.borderRadius.default,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.textDark,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
});