import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function ProtectedPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Sypot!</CardTitle>
            <CardDescription>You&apos;re successfully authenticated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold mb-2">User Information</h3>
              <p className="text-sm text-muted-foreground">Email: {user.email}</p>
              <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
            </div>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/feed">Go to Feed</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">View Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
