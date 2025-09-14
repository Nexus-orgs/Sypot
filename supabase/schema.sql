-- Sypot Database Schema for Supabase
-- This schema includes all tables needed for the event discovery platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location-based features
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ==========================================
-- User Management Tables
-- ==========================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    display_name TEXT NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    cover_image_url TEXT,
    user_type TEXT CHECK (user_type IN ('visitor', 'organizer', 'business', 'admin')) DEFAULT 'visitor',
    location TEXT,
    coordinates GEOGRAPHY(POINT),
    phone TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
    privacy_settings JSONB DEFAULT '{"profile_public": true, "show_attendance": true}',
    verified BOOLEAN DEFAULT FALSE,
    loyalty_points INTEGER DEFAULT 0,
    loyalty_tier TEXT DEFAULT 'Bronze',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Business Tables
-- ==========================================

CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    logo_url TEXT,
    cover_image_url TEXT,
    address TEXT NOT NULL,
    coordinates GEOGRAPHY(POINT),
    phone TEXT,
    email TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}',
    operating_hours JSONB,
    amenities TEXT[] DEFAULT '{}',
    verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    stripe_account_id TEXT,
    mpesa_merchant_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Event Tables
-- ==========================================

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID REFERENCES profiles(id),
    business_id UUID REFERENCES businesses(id),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    tags TEXT[] DEFAULT '{}',
    
    -- Media
    cover_image_url TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    video_url TEXT,
    
    -- Date & Time
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    timezone TEXT DEFAULT 'Africa/Nairobi',
    is_recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern JSONB,
    
    -- Location
    venue_name TEXT NOT NULL,
    venue_address TEXT NOT NULL,
    venue_coordinates GEOGRAPHY(POINT),
    is_virtual BOOLEAN DEFAULT FALSE,
    virtual_url TEXT,
    
    -- Ticketing
    is_free BOOLEAN DEFAULT FALSE,
    min_price DECIMAL(10,2),
    max_price DECIMAL(10,2),
    currency TEXT DEFAULT 'KES',
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    
    -- Status
    status TEXT CHECK (status IN ('draft', 'published', 'cancelled', 'completed')) DEFAULT 'draft',
    visibility TEXT CHECK (visibility IN ('public', 'private', 'unlisted')) DEFAULT 'public',
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    trending_score DECIMAL(5,2) DEFAULT 0,
    
    -- Settings
    requires_approval BOOLEAN DEFAULT FALSE,
    age_restriction INTEGER,
    dress_code TEXT,
    special_instructions TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Create index for location-based queries
CREATE INDEX idx_events_location ON events USING GIST(venue_coordinates);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_status ON events(status);

-- ==========================================
-- Ticket Types & Pricing
-- ==========================================

CREATE TABLE ticket_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'KES',
    quantity_available INTEGER,
    quantity_sold INTEGER DEFAULT 0,
    min_per_order INTEGER DEFAULT 1,
    max_per_order INTEGER DEFAULT 10,
    sale_starts_at TIMESTAMPTZ,
    sale_ends_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Bookings & Tickets
-- ==========================================

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id),
    user_id UUID REFERENCES profiles(id),
    booking_reference TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded')) DEFAULT 'pending',
    
    -- Payment Info
    subtotal DECIMAL(10,2) NOT NULL,
    service_fee DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'KES',
    payment_method TEXT,
    payment_status TEXT CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    
    -- Payment Gateway References
    stripe_payment_intent_id TEXT,
    mpesa_transaction_id TEXT,
    
    -- Contact Info (for guest checkout)
    guest_name TEXT,
    guest_email TEXT,
    guest_phone TEXT,
    
    -- Metadata
    promo_code TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    ticket_type_id UUID REFERENCES ticket_types(id),
    ticket_number TEXT UNIQUE NOT NULL,
    qr_code TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('valid', 'used', 'cancelled', 'expired')) DEFAULT 'valid',
    checked_in_at TIMESTAMPTZ,
    checked_in_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Social Features
-- ==========================================

CREATE TABLE event_likes (
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE event_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES event_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE follows (
    follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- ==========================================
-- Crew & Social Matching
-- ==========================================

CREATE TABLE crews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    avatar_url TEXT,
    max_members INTEGER DEFAULT 10,
    is_public BOOLEAN DEFAULT TRUE,
    interests TEXT[] DEFAULT '{}',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE crew_members (
    crew_id UUID REFERENCES crews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (crew_id, user_id)
);

CREATE TABLE crew_event_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crew_id UUID REFERENCES crews(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    planned_by UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Memory Book
-- ==========================================

CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT,
    description TEXT,
    media_urls TEXT[] DEFAULT '{}',
    media_types TEXT[] DEFAULT '{}', -- 'photo' or 'video'
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE memory_tags (
    memory_id UUID REFERENCES memories(id) ON DELETE CASCADE,
    tagged_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (memory_id, tagged_user_id)
);

-- ==========================================
-- Chat & Messaging
-- ==========================================

CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT CHECK (type IN ('direct', 'group', 'event')) DEFAULT 'direct',
    name TEXT,
    avatar_url TEXT,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
    last_read_at TIMESTAMPTZ,
    muted_until TIMESTAMPTZ,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT,
    media_urls TEXT[] DEFAULT '{}',
    is_edited BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Notifications
-- ==========================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Reviews & Ratings
-- ==========================================

CREATE TABLE event_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT,
    content TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

CREATE TABLE business_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT,
    content TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(business_id, user_id)
);

-- ==========================================
-- Loyalty & Rewards
-- ==========================================

CREATE TABLE loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    type TEXT CHECK (type IN ('earned', 'redeemed', 'expired', 'adjusted')) NOT NULL,
    description TEXT NOT NULL,
    reference_type TEXT,
    reference_id UUID,
    balance_after INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    points_required INTEGER NOT NULL,
    category TEXT,
    quantity_available INTEGER,
    quantity_redeemed INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reward_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reward_id UUID REFERENCES rewards(id),
    points_spent INTEGER NOT NULL,
    redemption_code TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'approved', 'used', 'expired', 'cancelled')) DEFAULT 'pending',
    used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Analytics & Tracking
-- ==========================================

CREATE TABLE event_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    bookings INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (event_id, date)
);

CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    activity_data JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Payment & Transactions
-- ==========================================

CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('card', 'mpesa', 'paypal', 'bank')) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    
    -- Card Details (encrypted)
    card_last4 TEXT,
    card_brand TEXT,
    card_exp_month INTEGER,
    card_exp_year INTEGER,
    
    -- M-Pesa
    mpesa_phone TEXT,
    
    -- External References
    stripe_payment_method_id TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id),
    user_id UUID REFERENCES profiles(id),
    type TEXT CHECK (type IN ('payment', 'refund', 'payout')) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'KES',
    status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) NOT NULL,
    payment_method TEXT,
    gateway TEXT CHECK (gateway IN ('stripe', 'mpesa', 'paypal')),
    gateway_transaction_id TEXT,
    gateway_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ==========================================
-- RLS (Row Level Security) Policies
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Published events are viewable by everyone" ON events
    FOR SELECT USING (status = 'published' AND visibility = 'public');

CREATE POLICY "Users can create events" ON events
    FOR INSERT WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Users can update own events" ON events
    FOR UPDATE USING (auth.uid() = organizer_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- Functions & Triggers
-- ==========================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate trending score
CREATE OR REPLACE FUNCTION calculate_trending_score(
    p_views INTEGER,
    p_likes INTEGER,
    p_bookings INTEGER,
    p_created_at TIMESTAMPTZ
) RETURNS DECIMAL AS $$
DECLARE
    age_hours INTEGER;
    score DECIMAL;
BEGIN
    age_hours := EXTRACT(EPOCH FROM (NOW() - p_created_at)) / 3600;
    score := (p_views * 0.1 + p_likes * 0.3 + p_bookings * 0.6) / POWER(age_hours + 2, 1.5);
    RETURN ROUND(score, 2);
END;
$$ LANGUAGE plpgsql;

-- Function to get nearby events
CREATE OR REPLACE FUNCTION get_nearby_events(
    user_lat DOUBLE PRECISION,
    user_lon DOUBLE PRECISION,
    radius_km INTEGER DEFAULT 10
) RETURNS TABLE(
    event_id UUID,
    title TEXT,
    distance_km DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.title,
        ST_Distance(
            e.venue_coordinates::geography,
            ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography
        ) / 1000 AS distance_km
    FROM events e
    WHERE 
        e.status = 'published' 
        AND e.start_date > NOW()
        AND ST_DWithin(
            e.venue_coordinates::geography,
            ST_SetSRID(ST_MakePoint(user_lon, user_lat), 4326)::geography,
            radius_km * 1000
        )
    ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- Initial Data & Indexes
-- ==========================================

-- Create additional indexes for performance
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_tickets_booking ON tickets(booking_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_events_trending ON events(trending_score DESC) WHERE status = 'published';

-- Create full-text search indexes
CREATE INDEX idx_events_search ON events USING GIN(
    to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(venue_name, ''))
);

CREATE INDEX idx_businesses_search ON businesses USING GIN(
    to_tsvector('english', name || ' ' || COALESCE(description, '') || ' ' || category)
);