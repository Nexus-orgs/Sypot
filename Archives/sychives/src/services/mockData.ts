import { Event, User, Message, Chat, Business } from '../types/navigation';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: '👩‍💼',
    bio: 'Music lover and event enthusiast. Always looking for new experiences!',
    interests: ['Music', 'Art', 'Food & Drink'],
    friendsCount: 42,
    eventsAttended: 15,
  },
  {
    id: 'user2',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    avatar: '👨‍💻',
    bio: 'Tech professional and foodie. Love networking events and trying new restaurants.',
    interests: ['Technology', 'Food & Drink', 'Business'],
    friendsCount: 128,
    eventsAttended: 23,
  },
  {
    id: 'user3',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    avatar: '👩‍🎨',
    bio: 'Artist and creative soul. Passionate about local art scene and cultural events.',
    interests: ['Art', 'Photography', 'Music'],
    friendsCount: 67,
    eventsAttended: 31,
  },
  {
    id: 'user4',
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    avatar: '🏃‍♂️',
    bio: 'Fitness enthusiast and outdoor adventure lover. Marathon runner and hiking guide.',
    interests: ['Sports', 'Health & Fitness', 'Outdoor Activities'],
    friendsCount: 89,
    eventsAttended: 19,
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'event1',
    title: 'Summer Music Festival 2024',
    description:
      "Join us for the biggest music festival of the summer! Featuring top artists from around the world, food trucks, and amazing vibes. Don't miss this incredible experience!",
    date: new Date('2024-08-15T18:00:00'),
    location: 'Central Park, New York',
    imageUrl: 'https://example.com/music-festival.jpg',
    organizerId: 'user1',
    attendeeCount: 1247,
    price: 85,
    category: 'Music',
    latitude: 40.785091,
    longitude: -73.968285,
  },
  {
    id: 'event2',
    title: 'Tech Innovation Summit',
    description:
      'Explore the future of technology with industry leaders, startups, and innovators. Networking sessions, keynote speeches, and hands-on workshops.',
    date: new Date('2024-07-28T09:00:00'),
    location: 'Silicon Valley Convention Center',
    imageUrl: 'https://example.com/tech-summit.jpg',
    organizerId: 'user2',
    attendeeCount: 456,
    price: 120,
    category: 'Technology',
    latitude: 37.4419,
    longitude: -122.143,
  },
  {
    id: 'event3',
    title: 'Artisan Food Market',
    description:
      'Discover local flavors and artisan crafts at our monthly food market. Over 50 vendors featuring organic produce, handmade treats, and unique culinary experiences.',
    date: new Date('2024-07-30T10:00:00'),
    location: 'Downtown Plaza, Austin',
    imageUrl: 'https://example.com/food-market.jpg',
    organizerId: 'user3',
    attendeeCount: 234,
    category: 'Food & Drink',
    latitude: 30.2672,
    longitude: -97.7431,
  },
  {
    id: 'event4',
    title: 'Marathon Training Group',
    description:
      'Join our weekly marathon training sessions! Perfect for all skill levels. Professional coaches, nutrition guidance, and a supportive community.',
    date: new Date('2024-07-27T06:00:00'),
    location: 'Riverside Park, Chicago',
    imageUrl: 'https://example.com/marathon.jpg',
    organizerId: 'user4',
    attendeeCount: 67,
    category: 'Sports',
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    id: 'event5',
    title: 'Local Art Gallery Opening',
    description:
      'Celebrate the opening of our new contemporary art exhibition featuring local artists. Wine reception, artist talks, and exclusive previews.',
    date: new Date('2024-08-02T19:00:00'),
    location: 'Modern Art Gallery, Los Angeles',
    organizerId: 'user3',
    attendeeCount: 89,
    price: 25,
    category: 'Art',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'event6',
    title: 'Business Networking Happy Hour',
    description:
      'Connect with local professionals in a relaxed atmosphere. Great for making new connections, sharing ideas, and building your network.',
    date: new Date('2024-07-26T17:30:00'),
    location: 'Skyline Lounge, Seattle',
    organizerId: 'user2',
    attendeeCount: 156,
    price: 15,
    category: 'Business',
    latitude: 47.6062,
    longitude: -122.3321,
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    text: 'Hey! Are you going to the music festival this weekend?',
    userId: 'user1',
    userName: 'Sarah Johnson',
    timestamp: new Date('2024-07-25T14:30:00'),
    avatar: '👩‍💼',
  },
  {
    id: 'msg2',
    text: "Yes! I already got my tickets. Can't wait! 🎵",
    userId: 'user2',
    userName: 'Mike Chen',
    timestamp: new Date('2024-07-25T14:32:00'),
    avatar: '👨‍💻',
  },
  {
    id: 'msg3',
    text: 'The lineup looks amazing this year. Should we meet up there?',
    userId: 'user1',
    userName: 'Sarah Johnson',
    timestamp: new Date('2024-07-25T14:35:00'),
    avatar: '👩‍💼',
  },
];

// Mock Chats
export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[2],
    unreadCount: 2,
  },
  {
    id: 'chat2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: 'msg4',
      text: 'Thanks for the art gallery recommendation!',
      userId: 'user3',
      userName: 'Emma Wilson',
      timestamp: new Date('2024-07-25T11:20:00'),
      avatar: '👩‍🎨',
    },
    unreadCount: 0,
  },
  {
    id: 'chat3',
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      id: 'msg5',
      text: 'Great workout session today! Same time tomorrow?',
      userId: 'user4',
      userName: 'David Rodriguez',
      timestamp: new Date('2024-07-24T19:45:00'),
      avatar: '🏃‍♂️',
    },
    unreadCount: 1,
  },
];

// Mock Businesses
export const mockBusinesses: Business[] = [
  {
    id: 'biz1',
    name: 'The Rooftop Lounge',
    description:
      'Upscale rooftop bar with panoramic city views. Perfect for cocktails and networking events.',
    imageUrl: 'https://example.com/rooftop-lounge.jpg',
    category: 'Bar & Restaurant',
    rating: 4.6,
    location: 'Downtown Manhattan',
    latitude: 40.7589,
    longitude: -73.9851,
  },
  {
    id: 'biz2',
    name: 'Innovation Hub Coworking',
    description:
      'Modern coworking space with state-of-the-art facilities. Hosts tech meetups and workshops.',
    imageUrl: 'https://example.com/coworking.jpg',
    category: 'Coworking Space',
    rating: 4.8,
    location: 'Silicon Valley',
    latitude: 37.4419,
    longitude: -122.143,
  },
  {
    id: 'biz3',
    name: 'Artisan Coffee & Gallery',
    description:
      'Local coffee shop featuring rotating art exhibitions and live music performances.',
    imageUrl: 'https://example.com/coffee-gallery.jpg',
    category: 'Cafe & Gallery',
    rating: 4.4,
    location: 'Arts District, LA',
    latitude: 34.0435,
    longitude: -118.2468,
  },
];

// Mock Event Categories
export const eventCategories = [
  { id: 'music', name: 'Music', emoji: '🎵', color: '#8b5cf6' },
  { id: 'food', name: 'Food & Drink', emoji: '🍽️', color: '#f59e0b' },
  { id: 'sports', name: 'Sports', emoji: '🏃', color: '#10b981' },
  { id: 'tech', name: 'Technology', emoji: '💻', color: '#3b82f6' },
  { id: 'art', name: 'Art', emoji: '🎨', color: '#ec4899' },
  { id: 'business', name: 'Business', emoji: '💼', color: '#6b7280' },
  { id: 'health', name: 'Health & Fitness', emoji: '🧘', color: '#14b8a6' },
  { id: 'education', name: 'Education', emoji: '📚', color: '#f97316' },
];

// Utility functions for mock API
export const getMockEvents = (
  category?: string,
  limit?: number,
): Promise<Event[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let events = mockEvents;

      if (category && category !== 'All') {
        events = events.filter(
          event => event.category.toLowerCase() === category.toLowerCase(),
        );
      }

      if (limit) {
        events = events.slice(0, limit);
      }

      resolve(events);
    }, 800); // Simulate API delay
  });
};

export const getMockUsers = (): Promise<User[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 600);
  });
};

export const getMockChats = (): Promise<Chat[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockChats);
    }, 500);
  });
};

export const getMockBusinesses = (): Promise<Business[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBusinesses);
    }, 700);
  });
};

export const searchEvents = (query: string): Promise<Event[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const filteredEvents = mockEvents.filter(
        event =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase()) ||
          event.category.toLowerCase().includes(query.toLowerCase()) ||
          event.location.toLowerCase().includes(query.toLowerCase()),
      );
      resolve(filteredEvents);
    }, 1000);
  });
};
