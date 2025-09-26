import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import { theme } from '../../styles/theme';

const LoadingScreen = ({ message = 'Loading...', fullScreen = true }) => {
  return (
    <View style={[styles.container, !fullScreen && styles.inline]}>
      <ActivityIndicator 
        size="large" 
        color={theme.colors.primary} 
        style={styles.spinner}
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundLight,
  },
  inline: {
    flex: 0,
    padding: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  spinner: {
    marginBottom: theme.spacing.md,
  },
  message: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    textAlign: 'center',
  },
});

export default LoadingScreen;