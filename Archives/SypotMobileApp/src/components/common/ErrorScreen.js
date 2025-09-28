import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../styles/theme';

const ErrorScreen = ({
  error = 'Something went wrong',
  onRetry,
  fullScreen = true,
  icon = true,
}) => {
  const ErrorIcon = () => (
    <Svg width={64} height={64} fill={theme.colors.error} viewBox="0 0 256 256">
      <Path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80a8,8,0,0,0,16,0V80a8,8,0,0,0-16,0Zm20,40a12,12,0,1,1-12-12A12,12,0,0,1,140,176Z" />
    </Svg>
  );

  return (
    <View style={[styles.container, !fullScreen && styles.inline]}>
      {icon && <ErrorIcon />}
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{error}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.lg,
  },
  inline: {
    flex: 0,
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  message: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.md,
  },
  retryButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.white,
  },
});

export default ErrorScreen;
