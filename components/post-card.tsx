"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  post: {
    id: string
    content: string
    image_url: string | null
    created_at: string
    author: {
      id: string
      username: string
      display_name: string | null
      avatar_url: string | null
    }
  }
  currentUserId: string
  onLike?: () => void
  onDelete?: () => void
  likesCount?: number
  commentsCount?: number
  isLiked?: boolean
}

export function PostCard({
  post,
  currentUserId,
  onLike,
  onDelete,
  likesCount = 0,
  commentsCount = 0,
  isLiked = false,
}: PostCardProps) {
  const isOwnPost = post.author.id === currentUserId

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Post Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar_url || ""} alt={post.author.display_name || "User"} />
                <AvatarFallback>
                  {post.author.display_name?.charAt(0) || post.author.username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${post.author.username}`} className="hover:underline">
                  <p className="font-semibold">{post.author.display_name || post.author.username}</p>
                </Link>
                <p className="text-sm text-muted-foreground">
                  @{post.author.username} · {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>

            {isOwnPost && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Post Content */}
          <div className="space-y-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

            {post.image_url && (
              <div className="rounded-lg overflow-hidden border">
                <img
                  src={post.image_url || "/placeholder.svg"}
                  alt="Post image"
                  className="w-full h-auto max-h-96 object-cover"
                />
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-6 pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              className={`gap-2 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              {likesCount > 0 && <span className="text-xs">{likesCount}</span>}
            </Button>

            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              {commentsCount > 0 && <span className="text-xs">{commentsCount}</span>}
            </Button>

            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
