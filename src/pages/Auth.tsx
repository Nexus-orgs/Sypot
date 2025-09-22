"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Loader2,
  User,
  Building2,
  Calendar,
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Facebook,
  Sparkles,
  Apple,
  Smartphone,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SEO } from "@/components/SEO"
import { mockAuth } from "@/lib/mock-auth"

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [isMockAuth] = useState(mockAuth.isEnabled())

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Sign Up State
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [userType, setUserType] = useState("visitor")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const { user, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signInEmail || !signInPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await signIn(signInEmail, signInPassword)
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to Sypot",
      })
    } catch (error) {
      console.error("Sign in error:", error)
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signUpEmail || !signUpPassword || !displayName || !userType) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (signUpPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await signUp(signUpEmail, signUpPassword, {
        display_name: displayName,
        user_type: userType,
      })
      toast({
        title: "Welcome to Sypot!",
        description: "Please check your email to verify your account",
      })
    } catch (error) {
      console.error("Sign up error:", error)
      toast({
        title: "Sign up failed",
        description: "Please try again with different credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would integrate with OAuth providers
      switch (provider.toLowerCase()) {
        case "google":
          // Google OAuth integration would go here
          toast({
            title: "Google Sign In",
            description: "Redirecting to Google authentication...",
          })
          break
        case "facebook":
          // Facebook OAuth integration would go here
          toast({
            title: "Facebook Sign In",
            description: "Redirecting to Facebook authentication...",
          })
          break
        case "twitter":
          // Twitter OAuth integration would go here
          toast({
            title: "Twitter Sign In",
            description: "Redirecting to Twitter authentication...",
          })
          break
        case "github":
          // GitHub OAuth integration would go here
          toast({
            title: "GitHub Sign In",
            description: "Redirecting to GitHub authentication...",
          })
          break
        case "apple":
          // Apple Sign In integration would go here
          toast({
            title: "Apple Sign In",
            description: "Redirecting to Apple authentication...",
          })
          break
        case "phone":
          // Phone number authentication would go here
          toast({
            title: "Phone Authentication",
            description: "SMS verification coming soon!",
          })
          break
        default:
          toast({
            title: "Coming Soon",
            description: `${provider} login will be available soon!`,
          })
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: `Failed to authenticate with ${provider}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <>
      <SEO
        title="Sign In / Sign Up | Sypot"
        description="Join Sypot to discover and attend amazing events in your city."
        canonical="/auth"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-8 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <Card className="w-full max-w-lg relative backdrop-blur-sm bg-background/95">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">Welcome to Sypot</CardTitle>
            <CardDescription>
              {activeTab === "signin"
                ? "Sign in to discover amazing events near you"
                : "Create your account and join the community"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("Google")}
                      disabled={isLoading || socialLoading !== null}
                      className="relative"
                    >
                      {socialLoading === "Google" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      )}
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("Facebook")}
                      disabled={isLoading || socialLoading !== null}
                    >
                      {socialLoading === "Facebook" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                      )}
                      Facebook
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("Apple")}
                      disabled={isLoading || socialLoading !== null}
                      className="flex-1"
                    >
                      {socialLoading === "Apple" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Apple className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("GitHub")}
                      disabled={isLoading || socialLoading !== null}
                      className="flex-1"
                    >
                      {socialLoading === "GitHub" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Github className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("Phone")}
                      disabled={isLoading || socialLoading !== null}
                      className="flex-1"
                    >
                      {socialLoading === "Phone" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Smartphone className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or sign in with email</span>
                  </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signInEmail}
                        onChange={(e) => setSignInEmail(e.target.value)}
                        className="pl-10"
                        disabled={isLoading || socialLoading !== null}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading || socialLoading !== null}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || socialLoading !== null}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Quick login buttons for testing (only show in dev mode) */}
                {isMockAuth && (
                  <div className="space-y-3 pt-4 border-t">
                    <p className="text-sm text-muted-foreground text-center">Quick Test Logins</p>
                    <div className="grid grid-cols-2 gap-2">
                      {mockAuth.getQuickLoginButtons().map((quickLogin) => (
                        <Button
                          key={quickLogin.email}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSignInEmail(quickLogin.email)
                            setSignInPassword(quickLogin.password)
                            setTimeout(() => {
                              handleSignIn(new Event('submit') as any)
                            }, 100)
                          }}
                          disabled={isLoading}
                          className="text-xs"
                        >
                          {quickLogin.userType === 'visitor' && <User className="mr-1 h-3 w-3" />}
                          {quickLogin.userType === 'event_organizer' && <Calendar className="mr-1 h-3 w-3" />}
                          {quickLogin.userType === 'business_owner' && <Building2 className="mr-1 h-3 w-3" />}
                          {quickLogin.userType === 'admin' && <Shield className="mr-1 h-3 w-3" />}
                          {quickLogin.label.split(' (')[0]}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">Quick signup with social accounts</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("Google")}
                      disabled={isLoading || socialLoading !== null}
                    >
                      {socialLoading === "Google" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      )}
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin("Facebook")}
                      disabled={isLoading || socialLoading !== null}
                    >
                      {socialLoading === "Facebook" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                      )}
                      Facebook
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or create account with email</span>
                  </div>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="pl-10"
                        disabled={isLoading || socialLoading !== null}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="pl-10"
                        disabled={isLoading || socialLoading !== null}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="pl-10 pr-10"
                        disabled={isLoading || socialLoading !== null}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        disabled={isLoading || socialLoading !== null}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-type">I want to</Label>
                    <Select value={userType} onValueChange={setUserType} disabled={isLoading || socialLoading !== null}>
                      <SelectTrigger id="user-type">
                        <SelectValue placeholder="Select your purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visitor">
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            Discover & attend events
                          </div>
                        </SelectItem>
                        <SelectItem value="event_organizer">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Organize events
                          </div>
                        </SelectItem>
                        <SelectItem value="business_owner">
                          <div className="flex items-center">
                            <Building2 className="mr-2 h-4 w-4" />
                            Promote my business
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin access
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !agreeToTerms || socialLoading !== null}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your data is protected with enterprise-grade security</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Auth
