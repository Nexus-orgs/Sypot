import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../styles/theme';

const EmptyState = ({
  title = 'No Data Found',
  message = "There's nothing to show here yet",
  actionText,
  onAction,
  icon = true,
}) => {
  const EmptyIcon = () => (
    <Svg
      width={80}
      height={80}
      fill={theme.colors.gray[300]}
      viewBox="0 0 256 256"
    >
      <Path d="M216,88H176V48a16,16,0,0,0-16-16H96A16,16,0,0,0,80,48V88H40a8,8,0,0,0,0,16H48V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V104h8a8,8,0,0,0,0-16ZM96,48h64V88H96Zm96,160H64V104H192ZM112,136v40a8,8,0,0,1-16,0V136a8,8,0,0,1,16,0Zm48,0v40a8,8,0,0,1-16,0V136a8,8,0,0,1,16,0Z" />
    </Svg>
  );

  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconContainer}>
          <EmptyIcon />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionText && onAction && (
        <TouchableOpacity style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>{actionText}</Text>
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
    padding: theme.spacing.xl,
    minHeight: 300,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
    opacity: 0.5,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[500],
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.white,
  },
});

export default EmptyState;
