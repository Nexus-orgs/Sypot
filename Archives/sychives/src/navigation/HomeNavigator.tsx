import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from './types';

// Import home screens
import HomeFeedScreen from '../screens/main/HomeFeedScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import BusinessProfileScreen from '../screens/profile/BusinessProfileScreen';

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeFeed"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeFeed" component={HomeFeedScreen} />
      <HomeStack.Screen name="EventDetails" component={EventDetailsScreen} />
      <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
      <HomeStack.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
