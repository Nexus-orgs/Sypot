"use client"

import type React from "react"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "visitor" | "event_organizer" | "business_owner" | "admin"
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
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
  // Comment this out for development - uncomment for production
  // if (!user.email_confirmed_at) {
  //   return <Navigate to="/auth/verify-email" replace />
  // }

  // Check user type requirements
  if (requiredRole && profile) {
    const userRole = profile.user_type || "visitor"

    if (userRole !== requiredRole) {
      // For admin routes, only allow admin users
      if (requiredRole === "admin" && userRole !== "admin") {
        return <Navigate to="/unauthorized" replace />
      }
      
      // For business owner routes
      if (requiredRole === "business_owner" && userRole !== "business_owner") {
        return <Navigate to="/unauthorized" replace />
      }
      
      // For event organizer routes
      if (requiredRole === "event_organizer" && userRole !== "event_organizer") {
        return <Navigate to="/unauthorized" replace />
      }
    }
  }

  return <>{children}</>
}
