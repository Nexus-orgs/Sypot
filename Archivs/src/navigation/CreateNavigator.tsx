import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CreateStackParamList} from './types';

// Import create screens
import CreateEventScreen from '../screens/events/CreateEventScreen';
import EventPreviewScreen from '../screens/events/EventPreviewScreen';
import UploadMediaScreen from '../screens/events/UploadMediaScreen';

const CreateStack = createStackNavigator<CreateStackParamList>();

const CreateNavigator = () => {
  return (
    <CreateStack.Navigator
      initialRouteName="CreateEvent"
      screenOptions={{
        headerShown: false,
      }}>
      <CreateStack.Screen name="CreateEvent" component={CreateEventScreen} />
      <CreateStack.Screen name="EventPreview" component={EventPreviewScreen} />
      <CreateStack.Screen name="UploadMedia" component={UploadMediaScreen} />
    </CreateStack.Navigator>
  );
};

export default CreateNavigator;