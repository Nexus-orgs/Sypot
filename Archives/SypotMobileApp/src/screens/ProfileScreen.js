import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const ProfileScreen = ({ navigation }) => {
  const userProfile = {
    name: 'Alex Johnson',
    username: '@alexj',
    bio: 'Adventure seeker | Music lover | Food enthusiast',
    followers: 892,
    following: 456,
    events: 28,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    badges: ['Verified', 'Top Contributor', 'Event Host'],
  };

  const SettingsIcon = () => (
    <Svg
      width={24}
      height={24}
      fill={theme.colors.textLight}
      viewBox="0 0 256 256"
    >
      <Path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187.72,173a8,8,0,0,0-4.11,4.1,58.35,58.35,0,0,1-6.11,6.11,8,8,0,0,0-4.1,4.11l-2.64,23.88a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5.48-1.74,73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,217.4a91.57,91.57,0,0,1-15-6.23L83,187.29a8,8,0,0,0-4.1-4.11,58.35,58.35,0,0,1-6.11-6.11,8,8,0,0,0-4.11-4.1l-23.88-2.64a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L38.6,100.45a91.57,91.57,0,0,1,6.23-15L68.71,83a8,8,0,0,0,4.11-4.1,58.35,58.35,0,0,1,6.11-6.11,8,8,0,0,0,4.1-4.11l2.64-23.88a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,38.6a91.57,91.57,0,0,1,15,6.23L173,68.71a8,8,0,0,0,4.1,4.11,58.35,58.35,0,0,1,6.11,6.11,8,8,0,0,0,4.11,4.1l23.88,2.64a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.9,123.66Z" />
    </Svg>
  );

  const EditIcon = () => (
    <Svg width={20} height={20} fill={theme.colors.white} viewBox="0 0 256 256">
      <Path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
    </Svg>
  );

  const StatItem = ({ label, value }) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.username}>{userProfile.username}</Text>
          <Text style={styles.bio}>{userProfile.bio}</Text>

          {/* Edit Profile Button */}
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <EditIcon />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatItem label="Followers" value={userProfile.followers} />
          <StatItem label="Following" value={userProfile.following} />
          <StatItem label="Events" value={userProfile.events} />
        </View>

        {/* Badges */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          >
            {userProfile.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Attended "Summer Music Festival"
            </Text>
            <Text style={styles.activityDate}>2 days ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Saved "Tech Conference 2024"
            </Text>
            <Text style={styles.activityDate}>5 days ago</Text>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              Created event "Yoga in the Park"
            </Text>
            <Text style={styles.activityDate}>1 week ago</Text>
          </View>
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
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  username: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.subtleLight,
    marginBottom: theme.spacing.sm,
  },
  bio: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.sm,
  },
  editButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  statLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.subtleLight,
  },
  badgesSection: {
    paddingVertical: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textLight,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  badgesContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.white,
  },
  activitySection: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  activityCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.default,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  activityText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  activityDate: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'normal',
    color: theme.colors.subtleLight,
  },
});

export default ProfileScreen;
