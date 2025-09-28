import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MessagesStackParamList } from './types';

// Import message screens
import MessagesListScreen from '../screens/messages/MessagesListScreen';
import ChatViewScreen from '../screens/messages/ChatViewScreen';
import GroupChatScreen from '../screens/messages/GroupChatScreen';

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
      <MessagesStack.Screen name="ChatView" component={ChatViewScreen} />
      <MessagesStack.Screen name="GroupChat" component={GroupChatScreen} />
    </MessagesStack.Navigator>
  );
};

export default MessagesNavigator;
