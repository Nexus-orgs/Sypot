"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreatePostForm() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return

    setLoading(true)

    try {
      const { error } = await supabase.from("posts").insert({
        author_id: user.id,
        content: content.trim(),
      })

      if (error) throw error

      setContent("")
      router.refresh()
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        rows={3}
        className="resize-none"
      />
      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">{content.length}/280 characters</div>
        <Button type="submit" disabled={loading || !content.trim()} size="sm">
          <Send className="w-4 h-4 mr-2" />
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  )
}
