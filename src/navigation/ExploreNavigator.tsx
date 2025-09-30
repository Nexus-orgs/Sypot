import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreStackParamList } from './types';

// Import explore screens
import ExploreScreen from '../screens/explore/ExploreScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';
import BusinessProfileScreen from '../screens/profile/BusinessProfileScreen';

const ExploreStack = createStackNavigator<ExploreStackParamList>();

const ExploreNavigator = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="ExploreScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ExploreStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
      />
      <ExploreStack.Screen name="EventDetails" component={EventDetailsScreen} />
      <ExploreStack.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;
