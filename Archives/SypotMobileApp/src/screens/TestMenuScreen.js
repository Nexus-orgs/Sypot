import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../styles/theme';

const TestMenuScreen = ({ navigation }) => {
  const screens = [
    { name: 'Splash', title: 'Splash Screen', screen: 'Splash' },
    { name: 'Login', title: 'Login / Sign Up', screen: 'Login' },
    { name: 'Home', title: 'Home Feed', screen: 'Home' },
    { name: 'Explore', title: 'Explore Events', screen: 'Explore' },
    { name: 'CreateEvent', title: 'Create Event', screen: 'CreateEvent' },
    { name: 'EventDetails', title: 'Event Details', screen: 'EventDetails' },
    { name: 'Messages', title: 'Messages / Chat List', screen: 'Messages' },
    { name: 'Profile', title: 'User Profile', screen: 'Profile' },
    { name: 'Settings', title: 'Settings', screen: 'Settings' },
    { name: 'EditProfile', title: 'Edit Profile', screen: 'EditProfile' },
    { name: 'MyBookings', title: 'My Bookings', screen: 'MyBookings' },
    { name: 'Notifications', title: 'Notifications', screen: 'Notifications' },
    { name: 'MapView', title: 'Map View', screen: 'MapView' },
    { name: 'Friends', title: 'Friends / Connections', screen: 'Friends' },
    { name: 'Help', title: 'Help / Support', screen: 'Help' },
    {
      name: 'OnboardingInterests',
      title: 'Onboarding - Interests',
      screen: 'OnboardingInterests',
    },
    {
      name: 'ForgotPassword',
      title: 'Forgot Password',
      screen: 'ForgotPassword',
    },
    {
      name: 'Achievements',
      title: 'Achievements / Badges',
      screen: 'Achievements',
    },
    {
      name: 'OrganizerDashboard',
      title: 'Organizer Dashboard',
      screen: 'OrganizerDashboard',
    },
    {
      name: 'TicketPurchase',
      title: 'Ticket Purchase',
      screen: 'TicketPurchase',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sypot - All Screens</Text>
        <Text style={styles.headerSubtitle}>Test Navigation Menu</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Available Screens</Text>

        {screens.map((screen, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              try {
                navigation.navigate(screen.screen);
              } catch (error) {
                console.log(`Screen ${screen.screen} not yet implemented`);
              }
            }}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemNumber}>{index + 1}</Text>
              <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemTitle}>{screen.title}</Text>
                <Text style={styles.menuItemScreen}>
                  Navigate to: {screen.screen}
                </Text>
              </View>
            </View>
            <View style={styles.arrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Total Screens: {screens.length}</Text>
          <Text style={styles.footerNote}>
            Some screens may show placeholder content for testing purposes
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.white,
    marginTop: 4,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textLight,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.default,
    ...theme.shadows.sm,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  menuItemTextContainer: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  menuItemScreen: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.gray[500],
    marginTop: 2,
  },
  arrow: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    color: theme.colors.gray[400],
  },
  footer: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  footerNote: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.gray[500],
    marginTop: 4,
    textAlign: 'center',
  },
});

export default TestMenuScreen;
