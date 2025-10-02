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

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  interests: string[];
  friendsCount: number;
  eventsAttended: number;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  organizerId: string;
  attendeeCount: number;
  price?: number;
  category: string;
  latitude?: number;
  longitude?: number;
};

export type Business = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: string;
  rating: number;
  location: string;
  latitude?: number;
  longitude?: number;
};

export type Message = {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: Date;
  avatar?: string;
};

export type Chat = {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
};
