"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { clientQueries } from "@/lib/supabase/queries"
import type { Profile } from "@/lib/supabase/types"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { mockAuth } from "@/lib/mock-auth"

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, metadata?: { display_name?: string; user_type?: string }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  refreshProfile: () => Promise<void>
  isMockAuth: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMockAuth, setIsMockAuth] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await clientQueries.getProfile(userId)
      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      console.error("Error fetching profile:", error)
      return null
    }
  }

  useEffect(() => {
    // Check if mock auth is enabled
    const useMock = mockAuth.isEnabled()
    setIsMockAuth(useMock)
    
    if (useMock) {
      // Use mock authentication
      const mockUser = mockAuth.getCurrentUser()
      if (mockUser) {
        // Convert mock user to auth user format
        setUser({
          id: mockUser.id,
          email: mockUser.email,
          user_metadata: {
            full_name: mockUser.full_name,
            user_type: mockUser.user_type,
            avatar_url: mockUser.avatar_url
          }
        } as any)
        
        setProfile({
          id: mockUser.id,
          email: mockUser.email,
          full_name: mockUser.full_name,
          user_type: mockUser.user_type,
          avatar_url: mockUser.avatar_url,
          created_at: mockUser.created_at,
          updated_at: new Date().toISOString()
        } as Profile)
        
        // Create a mock session
        setSession({
          user: {
            id: mockUser.id,
            email: mockUser.email,
            user_metadata: {
              full_name: mockUser.full_name,
              user_type: mockUser.user_type
            }
          }
        } as any)
      }
      setLoading(false)
      return
    }
    
    // Use real Supabase authentication
    const supabase = createClient()

    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, metadata?: { display_name?: string; user_type?: string }) => {
    try {
      setLoading(true)
      
      // Use mock auth if enabled
      if (mockAuth.isEnabled()) {
        const { user: mockUser, error } = await mockAuth.signUp(email, password, {
          display_name: metadata?.display_name,
          user_type: metadata?.user_type
        })
        
        if (error) throw new Error(error)
        
        if (mockUser) {
          // Set user and profile state
          setUser({
            id: mockUser.id,
            email: mockUser.email,
            user_metadata: {
              full_name: mockUser.full_name,
              user_type: mockUser.user_type,
              avatar_url: mockUser.avatar_url
            }
          } as any)
          
          setProfile({
            id: mockUser.id,
            email: mockUser.email,
            full_name: mockUser.full_name,
            user_type: mockUser.user_type,
            avatar_url: mockUser.avatar_url,
            created_at: mockUser.created_at,
            updated_at: new Date().toISOString()
          } as Profile)
          
          setSession({
            user: {
              id: mockUser.id,
              email: mockUser.email,
              user_metadata: {
                full_name: mockUser.full_name,
                user_type: mockUser.user_type
              }
            }
          } as any)
          
          toast({
            title: "Account created!",
            description: `Welcome ${mockUser.full_name}! You are logged in as ${mockUser.user_type.replace('_', ' ')}.`,
          })
          
          // Navigate based on user type
          const redirectPath = mockUser.user_type === 'admin' ? '/admin' :
                             mockUser.user_type === 'event_organizer' ? '/organizer-dashboard' :
                             mockUser.user_type === 'business_owner' ? '/business-dashboard' :
                             '/explore'
          navigate(redirectPath)
        }
        return
      }
      
      // Use real Supabase auth
      const supabase = createClient()

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: metadata?.display_name || email.split("@")[0],
            user_type: metadata?.user_type || "visitor",
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Create or update the profile with the user type
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            id: authData.user.id,
            full_name: metadata?.display_name || email.split("@")[0],
            email: email,
            user_type: metadata?.user_type || "visitor",
            updated_at: new Date().toISOString(),
          })

        if (profileError) {
          console.error("Error creating profile:", profileError)
        }

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        })

        // Navigate to email verification page
        navigate("/auth/verify-email")
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Use mock auth if enabled
      if (mockAuth.isEnabled()) {
        const { user: mockUser, error } = await mockAuth.signIn(email, password)
        
        if (error) throw new Error(error)
        
        if (mockUser) {
          // Set user and profile state
          setUser({
            id: mockUser.id,
            email: mockUser.email,
            user_metadata: {
              full_name: mockUser.full_name,
              user_type: mockUser.user_type,
              avatar_url: mockUser.avatar_url
            }
          } as any)
          
          setProfile({
            id: mockUser.id,
            email: mockUser.email,
            full_name: mockUser.full_name,
            user_type: mockUser.user_type,
            avatar_url: mockUser.avatar_url,
            created_at: mockUser.created_at,
            updated_at: new Date().toISOString()
          } as Profile)
          
          setSession({
            user: {
              id: mockUser.id,
              email: mockUser.email,
              user_metadata: {
                full_name: mockUser.full_name,
                user_type: mockUser.user_type
              }
            }
          } as any)
          
          // Redirect based on user type
          const redirectPath = mockUser.user_type === 'admin' ? '/admin' :
                             mockUser.user_type === 'event_organizer' ? '/organizer-dashboard' :
                             mockUser.user_type === 'business_owner' ? '/business-dashboard' :
                             '/explore'
          
          toast({
            title: "Welcome back!",
            description: `Logged in as ${mockUser.full_name} (${mockUser.user_type.replace('_', ' ')})`,
          })
          
          navigate(redirectPath)
        }
        return
      }
      
      // Use real Supabase auth
      const supabase = createClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch the user's profile to get their user type
      let redirectPath = "/dashboard"
      if (data.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", data.user.id)
          .single()

        if (profileData?.user_type) {
          // Redirect based on user type
          switch (profileData.user_type) {
            case "admin":
              redirectPath = "/admin"
              break
            case "event_organizer":
              redirectPath = "/organizer-dashboard"
              break
            case "business_owner":
              redirectPath = "/business-dashboard"
              break
            default:
              redirectPath = "/explore"
          }
        }
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })

      navigate(redirectPath)
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      
      if (mockAuth.isEnabled()) {
        await mockAuth.signOut()
        setUser(null)
        setProfile(null)
        setSession(null)
        
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        })
        
        navigate("/")
      } else {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        setUser(null)
        setProfile(null)
        setSession(null)

        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        })

        navigate("/")
      }
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error("No user logged in")

      const { data, error } = await clientQueries.updateProfile(user.id, updates)
      if (error) throw error

      // Refresh profile data
      await fetchProfile(user.id)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
    isMockAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
