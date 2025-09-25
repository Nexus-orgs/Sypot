import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);

  const BackIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.textLight} viewBox="0 0 256 256">
      <Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
    </Svg>
  );

  const ChevronIcon = () => (
    <Svg width={20} height={20} fill={theme.colors.gray[400]} viewBox="0 0 256 256">
      <Path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
    </Svg>
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        },
      ]
    );
  };

  const SettingItem = ({ title, subtitle, onPress, rightElement, showDivider = true }) => (
    <>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
        {rightElement || (onPress && <ChevronIcon />)}
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Edit Profile"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <SettingItem
              title="Change Password"
              onPress={() => {}}
            />
            <SettingItem
              title="Privacy Settings"
              subtitle={privateProfile ? "Private account" : "Public account"}
              rightElement={
                <Switch
                  value={privateProfile}
                  onValueChange={setPrivateProfile}
                  trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
                />
              }
            />
            <SettingItem
              title="Blocked Users"
              onPress={() => {}}
              showDivider={false}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Notifications"
              subtitle={notifications ? "Enabled" : "Disabled"}
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
                />
              }
            />
            <SettingItem
              title="Location Services"
              subtitle={locationServices ? "Enabled" : "Disabled"}
              rightElement={
                <Switch
                  value={locationServices}
                  onValueChange={setLocationServices}
                  trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
                />
              }
            />
            <SettingItem
              title="Dark Mode"
              subtitle={darkMode ? "On" : "Off"}
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
                />
              }
            />
            <SettingItem
              title="Language"
              subtitle="English"
              onPress={() => {}}
              showDivider={false}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Help Center"
              onPress={() => navigation.navigate('Help')}
            />
            <SettingItem
              title="Terms of Service"
              onPress={() => {}}
            />
            <SettingItem
              title="Privacy Policy"
              onPress={() => {}}
            />
            <SettingItem
              title="About"
              onPress={() => {}}
              showDivider={false}
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Sypot v1.0.0</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.gray[600],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  sectionContent: {
    backgroundColor: theme.colors.white,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.textLight,
  },
  settingSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.gray[500],
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray[200],
    marginLeft: theme.spacing.md,
  },
  logoutButton: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.error,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  versionText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.gray[500],
  },
});

export default SettingsScreen;