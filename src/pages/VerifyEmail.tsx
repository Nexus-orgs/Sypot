"use client"

import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SEO } from "@/components/SEO"

const VerifyEmail = () => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token = searchParams.get("token")
      const type = searchParams.get("type")

      if (token && type === "signup") {
        setIsVerifying(true)
        try {
          const supabase = createClient()
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "signup",
          })

          if (error) throw error

          setIsVerified(true)
          toast({
            title: "Email verified!",
            description: "Your account has been successfully verified.",
          })

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate("/dashboard")
          }, 2000)
        } catch (error: any) {
          setError(error.message)
          toast({
            title: "Verification failed",
            description: error.message,
            variant: "destructive",
          })
        } finally {
          setIsVerifying(false)
        }
      }
    }

    handleEmailVerification()
  }, [searchParams, navigate, toast])

  const resendVerification = async () => {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: "", // This would need to be stored or passed somehow
      })

      if (error) throw error

      toast({
        title: "Verification email sent",
        description: "Please check your email for the verification link.",
      })
    } catch (error: any) {
      toast({
        title: "Failed to resend",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <SEO
        title="Verify Email | Sypot"
        description="Verify your email address to complete your Sypot account setup."
        canonical="/auth/verify-email"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isVerifying ? (
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              ) : isVerified ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : error ? (
                <AlertCircle className="w-16 h-16 text-red-500" />
              ) : (
                <Mail className="w-16 h-16 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {isVerifying
                ? "Verifying your email..."
                : isVerified
                  ? "Email verified!"
                  : error
                    ? "Verification failed"
                    : "Check your email"}
            </CardTitle>
            <CardDescription>
              {isVerifying
                ? "Please wait while we verify your email address."
                : isVerified
                  ? "Your account has been successfully verified. Redirecting to dashboard..."
                  : error
                    ? "There was an issue verifying your email address."
                    : "We've sent a verification link to your email address. Please click the link to verify your account."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Error: {error}</p>
                <Button onClick={resendVerification} variant="outline">
                  Resend verification email
                </Button>
              </div>
            )}

            {!isVerifying && !isVerified && !error && (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or click below to resend.
                </p>
                <Button onClick={resendVerification} variant="outline">
                  Resend verification email
                </Button>
              </div>
            )}

            <div className="text-center">
              <Button variant="ghost" onClick={() => navigate("/auth")} className="text-sm">
                Back to sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default VerifyEmail
