import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { colors, spacing, typography, borderRadius, shadows } from '../../utils/theme';

const menuItems = [
  { title: 'Edit Profile', icon: '✏️', hasArrow: true },
  { title: 'My Bookings', icon: '🎫', hasArrow: true },
  { title: 'Friends', icon: '👥', hasArrow: true },
  { title: 'Achievements', icon: '🏆', hasArrow: true },
  { title: 'Settings', icon: '⚙️', hasArrow: true },
  { title: 'Help & Support', icon: '❓', hasArrow: true },
  { title: 'Sign Out', icon: '🚪', hasArrow: false, isDestructive: true },
];

export default function ProfileScreen() {
  const MenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity 
      style={[styles.menuItem, item.isDestructive && styles.destructiveItem]}
    >
      <View style={styles.menuItemLeft}>
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={[
          styles.menuTitle,
          item.isDestructive && styles.destructiveText
        ]}>
          {item.title}
        </Text>
      </View>
      {item.hasArrow && (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Text style={styles.editAvatarText}>📷</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.textDark,
  },
  headerButton: {
    fontSize: typography.fontSize.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  editAvatarText: {
    fontSize: typography.fontSize.sm,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.fontSize.base,
    color: colors.neutral600,
    marginBottom: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.neutral200,
  },
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: spacing.xs,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  destructiveItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.md,
  },
  menuTitle: {
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    fontWeight: '500',
  },
  destructiveText: {
    color: colors.error,
  },
  arrow: {
    fontSize: typography.fontSize.xl,
    color: colors.neutral400,
  },
});