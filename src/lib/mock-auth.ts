// Mock authentication for development/testing
// This simulates Supabase authentication without requiring a real backend

interface MockUser {
  id: string;
  email: string;
  full_name: string;
  user_type: 'visitor' | 'event_organizer' | 'business_owner' | 'admin';
  avatar_url?: string;
  created_at: string;
}

// Mock users database
const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    email: 'visitor@test.com',
    full_name: 'John Visitor',
    user_type: 'visitor',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    created_at: new Date().toISOString()
  },
  {
    id: 'user-2',
    email: 'organizer@test.com',
    full_name: 'Sarah Organizer',
    user_type: 'event_organizer',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    created_at: new Date().toISOString()
  },
  {
    id: 'user-3',
    email: 'business@test.com',
    full_name: 'Mike Business',
    user_type: 'business_owner',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    created_at: new Date().toISOString()
  },
  {
    id: 'user-4',
    email: 'admin@test.com',
    full_name: 'Admin User',
    user_type: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    created_at: new Date().toISOString()
  }
];

// Store current user in localStorage
const CURRENT_USER_KEY = 'vibe_connect_current_user';
const MOCK_AUTH_ENABLED_KEY = 'vibe_connect_mock_auth';

export const mockAuth = {
  // Check if mock auth is enabled
  isEnabled: () => {
    return localStorage.getItem(MOCK_AUTH_ENABLED_KEY) === 'true' || 
           !import.meta.env.VITE_SUPABASE_URL;
  },

  // Enable/disable mock auth
  setEnabled: (enabled: boolean) => {
    localStorage.setItem(MOCK_AUTH_ENABLED_KEY, enabled.toString());
  },

  // Get current user
  getCurrentUser: (): MockUser | null => {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  // Sign in
  signIn: async (email: string, password: string): Promise<{ user: MockUser | null; error: string | null }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by email (ignore password for mock)
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      // For demo purposes, accept any email and create a visitor account
      if (email && password) {
        const newUser: MockUser = {
          id: `user-${Date.now()}`,
          email,
          full_name: email.split('@')[0],
          user_type: 'visitor',
          created_at: new Date().toISOString()
        };
        mockUsers.push(newUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
        return { user: newUser, error: null };
      }
      return { user: null, error: 'Invalid credentials' };
    }

    // Store user in localStorage
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { user, error: null };
  },

  // Sign up
  signUp: async (
    email: string, 
    password: string, 
    metadata: { display_name?: string; user_type?: string }
  ): Promise<{ user: MockUser | null; error: string | null }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { user: null, error: 'User already exists' };
    }

    // Create new user
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email,
      full_name: metadata.display_name || email.split('@')[0],
      user_type: (metadata.user_type as MockUser['user_type']) || 'visitor',
      created_at: new Date().toISOString()
    };

    mockUsers.push(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    
    return { user: newUser, error: null };
  },

  // Sign out
  signOut: async (): Promise<void> => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Update profile
  updateProfile: async (userId: string, updates: Partial<MockUser>): Promise<{ user: MockUser | null; error: string | null }> => {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { user: null, error: 'User not found' };
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    const updatedUser = mockUsers[userIndex];
    
    // Update localStorage if this is the current user
    const currentUser = mockAuth.getCurrentUser();
    if (currentUser?.id === userId) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    return { user: updatedUser, error: null };
  },

  // Get all mock users (for testing)
  getAllUsers: () => mockUsers,

  // Quick login buttons for development
  getQuickLoginButtons: () => {
    return mockUsers.map(user => ({
      label: `${user.full_name} (${user.user_type})`,
      email: user.email,
      password: 'password123', // Mock password
      userType: user.user_type
    }));
  }
};

// Auto-enable mock auth if no Supabase URL is configured
if (!import.meta.env.VITE_SUPABASE_URL) {
  mockAuth.setEnabled(true);
  console.log('🔧 Mock authentication enabled (no Supabase URL configured)');
}