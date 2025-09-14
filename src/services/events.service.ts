import { supabase } from '@/lib/supabase-client';

export interface CreateEventData {
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  venue_name: string;
  venue_address: string;
  is_free: boolean;
  min_price?: number;
  max_price?: number;
  max_attendees?: number;
  cover_image_url?: string;
  tags?: string[];
  is_virtual?: boolean;
  virtual_url?: string;
}

export interface EventFilters {
  category?: string;
  date_from?: string;
  date_to?: string;
  is_free?: boolean;
  search?: string;
  location?: { lat: number; lng: number; radius: number };
  sort_by?: 'date' | 'popularity' | 'price';
  limit?: number;
  offset?: number;
}

class EventsService {
  // Create a new event
  async createEvent(eventData: CreateEventData) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const slug = this.generateSlug(eventData.title);

    const { data, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        slug,
        organizer_id: userData.user.id,
        status: 'draft'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get all published events with filters
  async getEvents(filters: EventFilters = {}) {
    let query = supabase
      .from('events')
      .select(`
        *,
        organizer:profiles!organizer_id(
          id,
          display_name,
          avatar_url,
          verified
        ),
        business:businesses(
          id,
          name,
          logo_url,
          verified
        )
      `)
      .eq('status', 'published')
      .eq('visibility', 'public');

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.is_free !== undefined) {
      query = query.eq('is_free', filters.is_free);
    }

    if (filters.date_from) {
      query = query.gte('start_date', filters.date_from);
    }

    if (filters.date_to) {
      query = query.lte('start_date', filters.date_to);
    }

    if (filters.search) {
      query = query.textSearch('title', filters.search, {
        type: 'websearch',
        config: 'english'
      });
    }

    // Sorting
    switch (filters.sort_by) {
      case 'popularity':
        query = query.order('trending_score', { ascending: false });
        break;
      case 'price':
        query = query.order('min_price', { ascending: true });
        break;
      default:
        query = query.order('start_date', { ascending: true });
    }

    // Pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  // Get single event by ID or slug
  async getEvent(idOrSlug: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    
    const query = supabase
      .from('events')
      .select(`
        *,
        organizer:profiles!organizer_id(
          id,
          display_name,
          avatar_url,
          bio,
          verified
        ),
        business:businesses(
          id,
          name,
          description,
          logo_url,
          verified
        ),
        ticket_types(*)
      `)
      .single();

    const { data, error } = isUuid 
      ? await query.eq('id', idOrSlug)
      : await query.eq('slug', idOrSlug);

    if (error) throw error;

    // Increment view count
    await this.incrementViewCount(data.id);

    return data;
  }

  // Get trending events
  async getTrendingEvents(limit = 10) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .gte('start_date', new Date().toISOString())
      .order('trending_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Get events happening this weekend
  async getWeekendEvents() {
    const friday = this.getNextWeekday(5);
    const sunday = new Date(friday);
    sunday.setDate(sunday.getDate() + 2);
    sunday.setHours(23, 59, 59, 999);

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .gte('start_date', friday.toISOString())
      .lte('start_date', sunday.toISOString())
      .order('start_date', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Get free events
  async getFreeEvents(limit = 20) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .eq('visibility', 'public')
      .eq('is_free', true)
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  // Get nearby events using PostGIS
  async getNearbyEvents(lat: number, lng: number, radiusKm = 10) {
    const { data, error } = await supabase.rpc('get_nearby_events', {
      user_lat: lat,
      user_lon: lng,
      radius_km: radiusKm
    });

    if (error) throw error;
    return data;
  }

  // Like/unlike an event
  async toggleEventLike(eventId: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('event_likes')
      .select('*')
      .eq('event_id', eventId)
      .eq('user_id', userData.user.id)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('event_likes')
        .delete()
        .eq('event_id', eventId)
        .eq('user_id', userData.user.id);
      
      if (error) throw error;
      await this.updateEventLikeCount(eventId, -1);
      return { liked: false };
    } else {
      // Like
      const { error } = await supabase
        .from('event_likes')
        .insert({
          event_id: eventId,
          user_id: userData.user.id
        });
      
      if (error) throw error;
      await this.updateEventLikeCount(eventId, 1);
      return { liked: true };
    }
  }

  // Add comment to event
  async addEventComment(eventId: string, content: string, parentId?: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('event_comments')
      .insert({
        event_id: eventId,
        user_id: userData.user.id,
        content,
        parent_id: parentId
      })
      .select(`
        *,
        user:profiles!user_id(
          id,
          display_name,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;
    return data;
  }

  // Get event comments
  async getEventComments(eventId: string) {
    const { data, error } = await supabase
      .from('event_comments')
      .select(`
        *,
        user:profiles!user_id(
          id,
          display_name,
          avatar_url
        )
      `)
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Private helper methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      + '-' + Date.now().toString(36);
  }

  private async incrementViewCount(eventId: string) {
    const { error } = await supabase.rpc('increment', {
      table_name: 'events',
      row_id: eventId,
      column_name: 'view_count'
    });
    
    if (error) console.error('Failed to increment view count:', error);
  }

  private async updateEventLikeCount(eventId: string, delta: number) {
    const { error } = await supabase.rpc('increment', {
      table_name: 'events',
      row_id: eventId,
      column_name: 'like_count',
      amount: delta
    });
    
    if (error) console.error('Failed to update like count:', error);
  }

  private getNextWeekday(dayOfWeek: number): Date {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilTarget = (dayOfWeek - currentDay + 7) % 7 || 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate;
  }
}

export const eventsService = new EventsService();