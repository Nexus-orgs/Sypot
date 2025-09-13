import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageCircle,
  Calendar,
  MapPin,
  Heart,
  CheckCircle,
  X,
  MoreVertical
} from "lucide-react";
import { Link } from "react-router-dom";

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const friends = [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "@sarah.j",
      bio: "Event enthusiast and music lover",
      location: "Nairobi, Kenya",
      avatar: "/placeholder.svg",
      mutualFriends: 12,
      commonInterests: ["Music", "Food & Drink"],
      lastSeen: "2 hours ago",
      status: "friends"
    },
    {
      id: "2", 
      name: "Mike Roberts",
      username: "@mike.r",
      bio: "Always looking for the next adventure",
      location: "Nairobi, Kenya", 
      avatar: "/placeholder.svg",
      mutualFriends: 8,
      commonInterests: ["Sports", "Networking"],
      lastSeen: "Online",
      status: "friends"
    }
  ];

  const friendRequests = [
    {
      id: "3",
      name: "Emma Lewis",
      username: "@emma.l",
      bio: "Art lover and creative soul",
      location: "Nairobi, Kenya",
      avatar: "/placeholder.svg",
      mutualFriends: 5,
      commonInterests: ["Culture", "Music"],
      requestDate: "2 days ago",
      status: "pending"
    }
  ];

  const suggestions = [
    {
      id: "4",
      name: "James Miller",
      username: "@james.m", 
      bio: "Tech enthusiast and entrepreneur",
      location: "Nairobi, Kenya",
      avatar: "/placeholder.svg",
      mutualFriends: 15,
      commonInterests: ["Technology", "Business"],
      reason: "You both attended Tech Meetup Nairobi",
      status: "suggested"
    },
    {
      id: "5",
      name: "Lisa Chen",
      username: "@lisa.c",
      bio: "Foodie and travel blogger",
      location: "Nairobi, Kenya",
      avatar: "/placeholder.svg", 
      mutualFriends: 3,
      commonInterests: ["Food & Drink", "Culture"],
      reason: "Lives in your area",
      status: "suggested"
    }
  ];

  const UserCard = ({ user, showActions = true }: { user: any, showActions?: boolean }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.lastSeen === "Online" && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
                {user.bio && (
                  <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
                )}
              </div>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>

            {user.mutualFriends > 0 && (
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{user.mutualFriends} mutual friends</span>
              </div>
            )}

            {user.commonInterests && user.commonInterests.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {user.commonInterests.map((interest: string) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            )}

            {user.reason && (
              <p className="text-xs text-muted-foreground mt-2 italic">
                {user.reason}
              </p>
            )}

            {user.lastSeen && user.status === "friends" && (
              <p className="text-xs text-muted-foreground mt-2">
                Last seen {user.lastSeen}
              </p>
            )}

            {showActions && (
              <div className="flex gap-2 mt-4">
                {user.status === "friends" && (
                  <>
                    <Button size="sm" variant="vibrant">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Invite to Event
                    </Button>
                  </>
                )}
                
                {user.status === "pending" && (
                  <>
                    <Button size="sm" variant="vibrant">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </>
                )}
                
                {user.status === "suggested" && (
                  <>
                    <Button size="sm" variant="vibrant">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Not Now
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Friends & Connections</h1>
          <p className="text-muted-foreground">
            Connect with people who share your interests
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for friends by name or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Friends Tabs */}
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="friends">
              My Friends ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Requests ({friendRequests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              Suggestions ({suggestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <UserCard key={friend.id} user={friend} />
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No friends yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start connecting with people who share your interests
                </p>
                <Button variant="vibrant" asChild>
                  <Link to="/explore">Find Friends</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {friendRequests.length > 0 ? (
              friendRequests.map((request) => (
                <UserCard key={request.id} user={request} />
              ))
            ) : (
              <div className="text-center py-12">
                <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No friend requests</h3>
                <p className="text-muted-foreground">
                  New friend requests will appear here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <UserCard key={suggestion.id} user={suggestion} />
              ))
            ) : (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No suggestions available</h3>
                <p className="text-muted-foreground">
                  Check back later for friend suggestions
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
          <Button variant="vibrant" asChild>
            <Link to="/chat">Messages</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Friends;
