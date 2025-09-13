import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is already authenticated, redirect to protected area
  if (user) {
    redirect("/protected")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sypot
            </CardTitle>
            <CardDescription className="text-lg">Connect, Share, and Discover with Your Community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Join Sypot to share your thoughts, connect with friends, and discover amazing content from your
                community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 text-xl">📝</span>
                </div>
                <h3 className="font-semibold">Share Posts</h3>
                <p className="text-sm text-muted-foreground">Express yourself with posts and media</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xl">👥</span>
                </div>
                <h3 className="font-semibold">Connect</h3>
                <p className="text-sm text-muted-foreground">Follow friends and discover new people</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-xl">💬</span>
                </div>
                <h3 className="font-semibold">Engage</h3>
                <p className="text-sm text-muted-foreground">Like, comment, and interact with content</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
