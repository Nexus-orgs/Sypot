"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: "visitor" | "organizer" | "business" | "admin"
}

export const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Check if user's email is verified (required for most protected actions)
  if (!user.email_confirmed_at) {
    return <Navigate to="/auth/verify-email" replace />
  }

  // Check user type requirements
  if (requiredUserType && profile) {
    // Map the profile user_type to match the expected format
    const userTypeMapping: Record<string, string> = {
      visitor: "visitor",
      organizer: "organizer",
      business_owner: "business",
      admin: "admin",
    }

    const mappedUserType = userTypeMapping[profile.preferences?.user_type || "visitor"]

    if (mappedUserType !== requiredUserType) {
      // User doesn't have the required role - redirect to unauthorized page
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
