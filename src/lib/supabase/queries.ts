import { createClient } from "./client"
import { createClient as createServerClient } from "./server"
import type { Offer, Reservation, Profile } from "./types"

// Client-side queries
export const clientQueries = {
  // Profile queries
  async getProfile(userId: string) {
    const supabase = createClient()
    return await supabase.from("profiles").select("*").eq("id", userId).single()
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const supabase = createClient()
    return await supabase.from("profiles").update(updates).eq("id", userId)
  },

  // Business queries
  async getBusinesses(filters?: { category?: string; city?: string; limit?: number }) {
    const supabase = createClient()
    let query = supabase.from("businesses").select("*").eq("is_active", true).order("rating", { ascending: false })

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.city) {
      query = query.eq("city", filters.city)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    return await query
  },

  async getBusiness(id: string) {
    const supabase = createClient()
    return await supabase.from("businesses").select("*").eq("id", id).eq("is_active", true).single()
  },

  // Event queries
  async getEvents(filters?: {
    category?: string
    city?: string
    is_free?: boolean
    is_trending?: boolean
    is_featured?: boolean
    limit?: number
  }) {
    const supabase = createClient()
    let query = supabase
      .from("events")
      .select("*, businesses(name, image_url)")
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString())
      .order("start_date", { ascending: true })

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }
    if (filters?.city) {
      query = query.eq("city", filters.city)
    }
    if (filters?.is_free !== undefined) {
      query = query.eq("is_free", filters.is_free)
    }
    if (filters?.is_trending !== undefined) {
      query = query.eq("is_trending", filters.is_trending)
    }
    if (filters?.is_featured !== undefined) {
      query = query.eq("is_featured", filters.is_featured)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    return await query
  },

  async getEvent(id: string) {
    const supabase = createClient()
    return await supabase
      .from("events")
      .select("*, businesses(name, address, phone, email)")
      .eq("id", id)
      .eq("is_active", true)
      .single()
  },

  // Reservation queries
  async createReservation(reservation: Omit<Reservation, "id" | "created_at" | "updated_at">) {
    const supabase = createClient()
    return await supabase.from("reservations").insert(reservation)
  },

  async getUserReservations(userId: string) {
    const supabase = createClient()
    return await supabase
      .from("reservations")
      .select("*, businesses(name, address), events(title, start_date)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
  },

  // Offer queries
  async getActiveOffers(businessId?: string) {
    const supabase = createClient()
    let query = supabase
      .from("offers")
      .select("*, businesses(name, image_url)")
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString())
      .order("created_at", { ascending: false })

    if (businessId) {
      query = query.eq("business_id", businessId)
    }

    return await query
  },
}

// Server-side queries
export const serverQueries = {
  // Profile queries
  async getProfile(userId: string) {
    const supabase = await createServerClient()
    return await supabase.from("profiles").select("*").eq("id", userId).single()
  },

  // Business owner queries
  async getBusinessReservations(businessId: string) {
    const supabase = await createServerClient()
    return await supabase
      .from("reservations")
      .select("*, profiles(full_name, email, phone)")
      .eq("business_id", businessId)
      .order("reservation_date", { ascending: true })
  },

  async updateReservationStatus(reservationId: string, status: Reservation["status"]) {
    const supabase = await createServerClient()
    return await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", reservationId)
  },

  // Offer management
  async createOffer(offer: Omit<Offer, "id" | "created_at" | "updated_at">) {
    const supabase = await createServerClient()
    return await supabase.from("offers").insert(offer)
  },

  async updateOffer(offerId: string, updates: Partial<Offer>) {
    const supabase = await createServerClient()
    return await supabase
      .from("offers")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", offerId)
  },
}
