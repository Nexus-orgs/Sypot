import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

// Import all screens
import TestMenuScreen from '../screens/TestMenuScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessagesScreen from '../screens/MessagesScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Placeholder screens (we'll create these shortly)
import EditProfileScreen from '../screens/EditProfileScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MapViewScreen from '../screens/MapViewScreen';
import FriendsScreen from '../screens/FriendsScreen';
import HelpScreen from '../screens/HelpScreen';
import OnboardingInterestsScreen from '../screens/OnboardingInterestsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import OrganizerDashboardScreen from '../screens/OrganizerDashboardScreen';
import TicketPurchaseScreen from '../screens/TicketPurchaseScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Bar Icons
const HomeIcon = ({ color, focused }) => (
  <Svg width={24} height={24} fill={color} viewBox="0 0 256 256">
    <Path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8H96a8,8,0,0,0,8-8V160h48v56a8,8,0,0,0,8,8h56a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H168V152a8,8,0,0,0-8-8H96a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z" />
  </Svg>
);

const ExploreIcon = ({ color, focused }) => (
  <Svg width={24} height={24} fill={color} viewBox="0 0 256 256">
    <Path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z" />
  </Svg>
);

const CreateIcon = ({ color, focused }) => (
  <Svg width={24} height={24} fill={color} viewBox="0 0 256 256">
    <Path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
  </Svg>
);

const MessagesIcon = ({ color, focused }) => (
  <Svg width={24} height={24} fill={color} viewBox="0 0 256 256">
    <Path d="M216,48H40A16,16,0,0,0,24,64V224a15.85,15.85,0,0,0,9.24,14.5A16.13,16.13,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Zm0,144H82.5a16,16,0,0,0-10.3,3.75l-.12.11L40,224V64H216Z" />
  </Svg>
);

const ProfileIcon = ({ color, focused }) => (
  <Svg width={24} height={24} fill={color} viewBox="0 0 256 256">
    <Path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z" />
  </Svg>
);

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} focused={focused} />;
          } else if (route.name === 'Explore') {
            return <ExploreIcon color={color} focused={focused} />;
          } else if (route.name === 'Create') {
            return <CreateIcon color={color} focused={focused} />;
          } else if (route.name === 'Messages') {
            return <MessagesIcon color={color} focused={focused} />;
          } else if (route.name === 'Profile') {
            return <ProfileIcon color={color} focused={focused} />;
          }
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray[200],
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateEventScreen} />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root Navigator
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TestMenu"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {/* Test Menu - Remove this in production */}
        <Stack.Screen name="TestMenu" component={TestMenuScreen} />
        
        {/* Auth Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OnboardingInterests" component={OnboardingInterestsScreen} />
        
        {/* Main App */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
        {/* Individual Screens (for testing) */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        
        {/* Detail Screens */}
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="MapView" component={MapViewScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} />
        <Stack.Screen name="OrganizerDashboard" component={OrganizerDashboardScreen} />
        <Stack.Screen name="TicketPurchase" component={TicketPurchaseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;