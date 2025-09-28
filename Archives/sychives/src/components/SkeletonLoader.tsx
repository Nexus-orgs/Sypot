import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../utils/theme';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function SkeletonLoader({
  width = '100%',
  height = 20,
  borderRadius: borderRadius.md,
  style,
}: SkeletonLoaderProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.neutral200, colors.neutral300],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
}

// Pre-built skeleton components
export function EventCardSkeleton() {
  return (
    <View style={styles.eventCard}>
      <SkeletonLoader height={120} borderRadius={borderRadius.lg} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <SkeletonLoader height={20} width="80%" style={styles.marginBottom} />
        <SkeletonLoader height={16} width="100%" style={styles.marginBottom} />
        <SkeletonLoader height={16} width="60%" style={styles.marginBottom} />
        <View style={styles.eventFooter}>
          <SkeletonLoader height={14} width="40%" />
          <SkeletonLoader height={14} width="20%" />
        </View>
      </View>
    </View>
  );
}

export function ChatItemSkeleton() {
  return (
    <View style={styles.chatItem}>
      <SkeletonLoader 
        width={50} 
        height={50} 
        borderRadius={25} 
        style={styles.avatar} 
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <SkeletonLoader height={16} width="40%" />
          <SkeletonLoader height={12} width="20%" />
        </View>
        <SkeletonLoader height={14} width="70%" />
      </View>
    </View>
  );
}

export function ProfileSkeleton() {
  return (
    <View style={styles.profileCard}>
      <SkeletonLoader 
        width={80} 
        height={80} 
        borderRadius={40} 
        style={styles.profileAvatar} 
      />
      <SkeletonLoader height={24} width="50%" style={styles.marginBottom} />
      <SkeletonLoader height={16} width="70%" style={styles.marginBottom} />
      <View style={styles.statsContainer}>
        {[1, 2, 3].map((index) => (
          <View key={index} style={styles.statItem}>
            <SkeletonLoader height={20} width={30} />
            <SkeletonLoader height={14} width={40} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral200,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  eventImage: {
    marginBottom: 0,
  },
  eventContent: {
    padding: spacing.md,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  marginBottom: {
    marginBottom: spacing.sm,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
  },
  avatar: {
    marginRight: spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileAvatar: {
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
});