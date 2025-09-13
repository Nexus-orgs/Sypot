"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, ImageIcon, Send } from "lucide-react"
import Link from "next/link"

export default function CreatePostPage() {
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)
    }
    getUser()
  }, [supabase, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.from("posts").insert({
        author_id: user.id,
        content: content.trim(),
        image_url: imageUrl.trim() || null,
      })

      if (error) throw error

      router.push("/feed")
    } catch (error) {
      console.error("Error creating post:", error)
      setError("Failed to create post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/feed">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Feed
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Share your thoughts with the community</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">What's on your mind?</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  required
                  className="resize-none"
                />
                <div className="text-xs text-muted-foreground text-right">{content.length}/500 characters</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <div className="flex gap-2">
                  <ImageIcon className="w-5 h-5 text-muted-foreground mt-2" />
                  <Input
                    id="image"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {imageUrl && (
                <div className="space-y-2">
                  <Label>Image Preview</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={() => setImageUrl("")}
                    />
                  </div>
                </div>
              )}

              {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || !content.trim()} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Posting..." : "Post"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/feed">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
