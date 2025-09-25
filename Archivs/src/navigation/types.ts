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
  ResetPassword: {token: string};
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Create: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeFeed: undefined;
  EventDetails: {eventId: string};
  UserProfile: {userId: string};
  BusinessProfile: {businessId: string};
};

export type ExploreStackParamList = {
  ExploreEvents: undefined;
  MapView: undefined;
  SearchResults: {query: string};
  EventDetails: {eventId: string};
};

export type CreateStackParamList = {
  CreateEvent: undefined;
  EventPreview: {eventData: any};
  UploadMedia: undefined;
};

export type MessagesStackParamList = {
  MessagesList: undefined;
  ChatView: {chatId: string; recipientName: string};
  GroupChat: {groupId: string; groupName: string};
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Settings: undefined;
  MyBookings: undefined;
  MyEvents: undefined;
  Friends: undefined;
  Notifications: undefined;
  Help: undefined;
};