export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Map: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeFeed: undefined;
  EventDetails: { eventId: string };
  UserProfile: { userId: string };
  BusinessProfile: { businessId: string };
};

export type ExploreStackParamList = {
  ExploreScreen: undefined;
  EventDetails: { eventId: string };
  BusinessProfile: { businessId: string };
};

export type MessagesStackParamList = {
  MessagesList: undefined;
  IndividualChat: { chatId: string; userName: string };
};

export type ProfileStackParamList = {
  UserProfile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  MyBookings: undefined;
  Friends: undefined;
  Notifications: undefined;
  Help: undefined;
  Achievements: undefined;
};
