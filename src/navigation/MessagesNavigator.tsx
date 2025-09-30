import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MessagesStackParamList } from './types';

// Import message screens
import MessagesListScreen from '../screens/messages/MessagesListScreen';
import IndividualChatScreen from '../screens/messages/IndividualChatScreen';

const MessagesStack = createStackNavigator<MessagesStackParamList>();

const MessagesNavigator = () => {
  return (
    <MessagesStack.Navigator
      initialRouteName="MessagesList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MessagesStack.Screen
        name="MessagesList"
        component={MessagesListScreen}
      />
      <MessagesStack.Screen
        name="IndividualChat"
        component={IndividualChatScreen}
      />
    </MessagesStack.Navigator>
  );
};

export default MessagesNavigator;
