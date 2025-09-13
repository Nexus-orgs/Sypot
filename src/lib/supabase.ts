import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface Profile {
  id: string;
  user_id: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  user_type: 'visitor' | 'organizer' | 'business_owner' | 'admin';
  interests?: string[];
  location?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  category: string;
  location: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string;
  cover_image_url?: string;
  opening_hours?: any;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  organizer_id: string;
  business_id?: string;
  title: string;
  description?: string;
  category: string;
  event_type: 'public' | 'private';
  start_date: string;
  end_date?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  max_attendees?: number;
  price: number;
  is_free: boolean;
  requires_approval: boolean;
  cover_image_url?: string;
  tags?: string[];
  status: 'active' | 'cancelled' | 'completed' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  event_id?: string;
  business_id?: string;
  booking_type: 'event_rsvp' | 'business_reservation';
  status: 'pending' | 'confirmed' | 'cancelled' | 'attended';
  quantity: number;
  total_amount: number;
  booking_date?: string;
  special_requests?: string;
  qr_code?: string;
  created_at: string;
  updated_at: string;
}

export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  event_id?: string;
  business_id?: string;
  rating: number;
  title?: string;
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'audio';
  read_by?: string[];
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: string;
  chat_type: 'private' | 'group';
  name?: string;
  participants: string[];
  last_message?: string;
  last_message_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}
