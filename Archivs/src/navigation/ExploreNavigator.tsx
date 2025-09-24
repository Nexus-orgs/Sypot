import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ExploreStackParamList} from './types';

// Import explore screens
import ExploreEventsScreen from '../screens/main/ExploreEventsScreen';
import MapViewScreen from '../screens/main/MapViewScreen';
import SearchResultsScreen from '../screens/main/SearchResultsScreen';
import EventDetailsScreen from '../screens/events/EventDetailsScreen';

const ExploreStack = createStackNavigator<ExploreStackParamList>();

const ExploreNavigator = () => {
  return (
    <ExploreStack.Navigator
      initialRouteName="ExploreEvents"
      screenOptions={{
        headerShown: false,
      }}>
      <ExploreStack.Screen name="ExploreEvents" component={ExploreEventsScreen} />
      <ExploreStack.Screen name="MapView" component={MapViewScreen} />
      <ExploreStack.Screen name="SearchResults" component={SearchResultsScreen} />
      <ExploreStack.Screen name="EventDetails" component={EventDetailsScreen} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;