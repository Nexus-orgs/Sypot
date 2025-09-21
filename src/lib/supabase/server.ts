import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client for Vite applications
 * Note: This is a simplified version for Vite. 
 * In a production environment with a Node.js backend,
 * you would handle cookies and sessions differently.
 */
export async function createClient() {
  // For Vite applications, we use the regular Supabase client
  // Server-side rendering would require a different approach
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  )
}
