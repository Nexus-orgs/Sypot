import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { CreatePostForm } from "@/components/create-post-form"
import { Plus } from "lucide-react"

export default async function FeedPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get posts with author profiles
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("Error fetching posts:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Feed</h1>
          <Button asChild>
            <Link href="/create-post">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Quick Create Post */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's on your mind?</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePostForm />
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={{
                  id: post.id,
                  content: post.content,
                  image_url: post.image_url,
                  created_at: post.created_at,
                  author: {
                    id: post.profiles.id,
                    username: post.profiles.username,
                    display_name: post.profiles.display_name,
                    avatar_url: post.profiles.avatar_url,
                  },
                }}
                currentUserId={user.id}
              />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CardDescription className="text-lg mb-4">No posts yet!</CardDescription>
                <p className="text-muted-foreground mb-6">Be the first to share something with the community.</p>
                <Button asChild>
                  <Link href="/create-post">Create Your First Post</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
