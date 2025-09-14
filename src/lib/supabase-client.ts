import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Storage bucket names
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  EVENT_IMAGES: 'event-images',
  BUSINESS_IMAGES: 'business-images',
  MEMORIES: 'memories',
  CHAT_MEDIA: 'chat-media'
} as const;

// Helper to get public URL for storage files
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Helper to upload file to storage
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  options?: { upsert?: boolean; contentType?: string }
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: options?.upsert ?? false,
      contentType: options?.contentType ?? file.type
    });

  if (error) throw error;
  return data;
};

// Real-time subscription helper
export const subscribeToChannel = (
  channel: string,
  event: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel(channel)
    .on('postgres_changes' as any, { event, schema: 'public' }, callback)
    .subscribe();
};