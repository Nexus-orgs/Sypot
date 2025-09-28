import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../utils/theme';
import Card from '../../components/Card';

interface SettingsState {
  pushNotifications: boolean;
  eventReminders: boolean;
  messageNotifications: boolean;
  emailNotifications: boolean;
  locationServices: boolean;
  darkMode: boolean;
  autoJoinEvents: boolean;
  showActivity: boolean;
}

export default function SettingsScreen() {
  const navigation = useNavigation();

  const [settings, setSettings] = useState<SettingsState>({
    pushNotifications: true,
    eventReminders: true,
    messageNotifications: true,
    emailNotifications: false,
    locationServices: true,
    darkMode: false,
    autoJoinEvents: false,
    showActivity: true,
  });

  const toggleSetting = (key: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLanguageChange = () => {
    Alert.alert('Language', 'Select your preferred language', [
      { text: 'English', onPress: () => console.log('English selected') },
      { text: 'Spanish', onPress: () => console.log('Spanish selected') },
      { text: 'French', onPress: () => console.log('French selected') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'We will prepare your data for download and send you an email with the download link.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Data export requested') },
      ],
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data and may improve app performance. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully.');
          },
        },
      ],
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Account Deleted',
              'Your account has been scheduled for deletion.',
            );
          },
        },
      ],
    );
  };

  const SettingsItem = ({
    icon,
    title,
    description,
    value,
    onToggle,
    showArrow = false,
    onPress,
  }: {
    icon: string;
    title: string;
    description?: string;
    value?: boolean;
    onToggle?: () => void;
    showArrow?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={!onPress && !onToggle}
    >
      <Text style={styles.settingsIcon}>{icon}</Text>
      <View style={styles.settingsContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingsDescription}>{description}</Text>
        )}
      </View>
      {onToggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.neutral300, true: colors.primary }}
          thumbColor={value ? 'white' : colors.neutral100}
        />
      )}
      {showArrow && <Text style={styles.settingsArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <SettingsItem
            icon="🔔"
            title="Push Notifications"
            description="Receive notifications on your device"
            value={settings.pushNotifications}
            onToggle={() => toggleSetting('pushNotifications')}
          />

          <SettingsItem
            icon="📅"
            title="Event Reminders"
            description="Get reminded about upcoming events"
            value={settings.eventReminders}
            onToggle={() => toggleSetting('eventReminders')}
          />

          <SettingsItem
            icon="💬"
            title="Message Notifications"
            description="Receive chat message alerts"
            value={settings.messageNotifications}
            onToggle={() => toggleSetting('messageNotifications')}
          />

          <SettingsItem
            icon="📧"
            title="Email Notifications"
            description="Receive updates via email"
            value={settings.emailNotifications}
            onToggle={() => toggleSetting('emailNotifications')}
          />
        </Card>

        {/* Privacy & Security */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <SettingsItem
            icon="📍"
            title="Location Services"
            description="Allow location-based features"
            value={settings.locationServices}
            onToggle={() => toggleSetting('locationServices')}
          />

          <SettingsItem
            icon="👁️"
            title="Show Activity"
            description="Let others see your event activity"
            value={settings.showActivity}
            onToggle={() => toggleSetting('showActivity')}
          />

          <SettingsItem
            icon="🔒"
            title="Privacy Settings"
            description="Manage who can see your information"
            showArrow
            onPress={() =>
              Alert.alert(
                'Privacy',
                'Privacy settings will open detailed options.',
              )
            }
          />

          <SettingsItem
            icon="🛡️"
            title="Security"
            description="Two-factor authentication, passwords"
            showArrow
            onPress={() =>
              Alert.alert(
                'Security',
                'Security settings will open password and 2FA options.',
              )
            }
          />
        </Card>

        {/* App Preferences */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>

          <SettingsItem
            icon="🌙"
            title="Dark Mode"
            description="Use dark theme throughout the app"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
          />

          <SettingsItem
            icon="🌍"
            title="Language"
            description="English"
            showArrow
            onPress={handleLanguageChange}
          />

          <SettingsItem
            icon="🎯"
            title="Auto-Join Events"
            description="Automatically join public events in your area"
            value={settings.autoJoinEvents}
            onToggle={() => toggleSetting('autoJoinEvents')}
          />
        </Card>

        {/* Data & Storage */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Storage</Text>

          <SettingsItem
            icon="📊"
            title="Data Usage"
            description="See how much data the app uses"
            showArrow
            onPress={() =>
              Alert.alert(
                'Data Usage',
                'Data usage details: 45.2 MB this month',
              )
            }
          />

          <SettingsItem
            icon="💾"
            title="Cache Size"
            description="Clear cached data to free up space"
            showArrow
            onPress={handleClearCache}
          />

          <SettingsItem
            icon="📤"
            title="Export Data"
            description="Download a copy of your data"
            showArrow
            onPress={handleDataExport}
          />
        </Card>

        {/* Support */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <SettingsItem
            icon="❓"
            title="Help Center"
            description="Get help and find answers"
            showArrow
            onPress={() => Alert.alert('Help', 'Opening help center...')}
          />

          <SettingsItem
            icon="📞"
            title="Contact Support"
            description="Get in touch with our team"
            showArrow
            onPress={() => Alert.alert('Support', 'Opening contact form...')}
          />

          <SettingsItem
            icon="⭐"
            title="Rate App"
            description="Rate Sypot on the App Store"
            showArrow
            onPress={() =>
              Alert.alert('Rate App', 'Opening App Store rating...')
            }
          />

          <SettingsItem
            icon="📋"
            title="Send Feedback"
            description="Help us improve Sypot"
            showArrow
            onPress={() => Alert.alert('Feedback', 'Opening feedback form...')}
          />
        </Card>

        {/* About */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <SettingsItem
            icon="ℹ️"
            title="App Version"
            description="1.0.0 (Build 100)"
            showArrow
            onPress={() =>
              Alert.alert(
                'Version',
                'You are using the latest version of Sypot.',
              )
            }
          />

          <SettingsItem
            icon="📄"
            title="Terms of Service"
            description="Read our terms and conditions"
            showArrow
            onPress={() => Alert.alert('Terms', 'Opening terms of service...')}
          />

          <SettingsItem
            icon="🔒"
            title="Privacy Policy"
            description="Learn how we protect your data"
            showArrow
            onPress={() =>
              Alert.alert('Privacy Policy', 'Opening privacy policy...')
            }
          />
        </Card>

        {/* Account Actions */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>

          <SettingsItem
            icon="🚪"
            title="Sign Out"
            description="Sign out of your account"
            showArrow
            onPress={() =>
              Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', onPress: () => console.log('Sign out') },
              ])
            }
          />

          <TouchableOpacity
            style={[styles.settingsItem, styles.dangerItem]}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.settingsIcon}>🗑️</Text>
            <View style={styles.settingsContent}>
              <Text style={[styles.settingsTitle, styles.dangerText]}>
                Delete Account
              </Text>
              <Text style={styles.settingsDescription}>
                Permanently delete your account and all data
              </Text>
            </View>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  settingsIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.md,
    width: 24,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  settingsDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: 2,
  },
  settingsArrow: {
    fontSize: typography.fontSize.xl,
    color: colors.neutral400,
  },
  dangerText: {
    color: colors.error,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});
