"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, Globe } from "lucide-react"

interface ProfileCardProps {
  profile: {
    id: string
    username: string
    display_name: string | null
    bio: string | null
    avatar_url: string | null
    website: string | null
    location: string | null
  }
  isFollowing?: boolean
  onFollowToggle?: () => void
  showFollowButton?: boolean
}

export function ProfileCard({
  profile,
  isFollowing = false,
  onFollowToggle,
  showFollowButton = true,
}: ProfileCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.display_name || "User"} />
            <AvatarFallback className="text-lg">
              {profile.display_name?.charAt(0) || profile.username?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <Link href={`/profile/${profile.username}`} className="hover:underline">
                <h3 className="font-semibold text-lg">{profile.display_name || profile.username}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
            </div>

            {profile.bio && <p className="text-sm line-clamp-2">{profile.bio}</p>}

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {profile.location}
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {showFollowButton && onFollowToggle && (
            <Button variant={isFollowing ? "outline" : "default"} size="sm" onClick={onFollowToggle}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
