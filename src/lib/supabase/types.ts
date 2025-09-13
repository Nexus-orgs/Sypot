// Database type definitions for Sypot
export interface Profile {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
  phone?: string
  date_of_birth?: string
  preferences?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  owner_id?: string
  name: string
  description?: string
  category: string
  address: string
  city: string
  state: string
  zip_code: string
  phone?: string
  email?: string
  website?: string
  image_url?: string
  latitude?: number
  longitude?: number
  rating?: number
  review_count?: number
  price_range?: "$" | "$$" | "$$$" | "$$$$"
  hours?: Record<string, any>
  amenities?: string[]
  is_verified?: boolean
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  business_id?: string
  organizer_id?: string
  title: string
  description?: string
  category: string
  image_url?: string
  start_date: string
  end_date: string
  location: string
  address: string
  city: string
  state: string
  latitude?: number
  longitude?: number
  price?: number
  max_attendees?: number
  current_attendees?: number
  is_free?: boolean
  is_featured?: boolean
  is_trending?: boolean
  tags?: string[]
  requirements?: string[]
  contact_info?: Record<string, any>
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface Reservation {
  id: string
  user_id: string
  business_id?: string
  event_id?: string
  reservation_date: string
  party_size: number
  special_requests?: string
  contact_phone?: string
  contact_email?: string
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no-show"
  notes?: string
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  business_id: string
  title: string
  description?: string
  discount_type: "percentage" | "fixed_amount" | "buy_one_get_one" | "free_item"
  discount_value?: number
  minimum_purchase?: number
  max_uses?: number
  current_uses?: number
  start_date: string
  end_date: string
  terms_conditions?: string
  is_active?: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  business_id?: string
  event_id?: string
  rating: number
  title?: string
  comment?: string
  images?: string[]
  is_verified?: boolean
  helpful_count?: number
  created_at: string
  updated_at: string
}

// Database response types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, "id" | "created_at" | "updated_at"> & { id: string }
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
      }
      businesses: {
        Row: Business
        Insert: Omit<Business, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Business, "id" | "created_at" | "updated_at">>
      }
      events: {
        Row: Event
        Insert: Omit<Event, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Event, "id" | "created_at" | "updated_at">>
      }
      reservations: {
        Row: Reservation
        Insert: Omit<Reservation, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Reservation, "id" | "created_at" | "updated_at">>
      }
      offers: {
        Row: Offer
        Insert: Omit<Offer, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Offer, "id" | "created_at" | "updated_at">>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Review, "id" | "created_at" | "updated_at">>
      }
    }
  }
}
