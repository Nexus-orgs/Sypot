import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from './types';

// Import profile screens
import ProfileMainScreen from '../screens/profile/ProfileMainScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import MyBookingsScreen from '../screens/profile/MyBookingsScreen';
import MyEventsScreen from '../screens/profile/MyEventsScreen';
import FriendsScreen from '../screens/profile/FriendsScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';
import HelpScreen from '../screens/profile/HelpScreen';

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileMain" component={ProfileMainScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="MyBookings" component={MyBookingsScreen} />
      <ProfileStack.Screen name="MyEvents" component={MyEventsScreen} />
      <ProfileStack.Screen name="Friends" component={FriendsScreen} />
      <ProfileStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
      <ProfileStack.Screen name="Help" component={HelpScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
