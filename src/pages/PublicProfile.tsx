import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, Calendar, Users, Star, Award, Shield, 
  MessageSquare, UserPlus, Share2, MoreVertical,
  Instagram, Twitter, Facebook, Globe, Mail,
  Heart, TrendingUp, Clock, CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock user data - in real app, fetch from Supabase
  const user = {
    id: userId,
    displayName: "Sarah Chen",
    username: "@sarahchen",
    bio: "Event enthusiast | Music lover | Always looking for the next adventure 🎵✨",
    avatar: "https://api.dicebear.com/v2/avataaars/sarah.svg",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
    location: "Nairobi, Kenya",
    joinedDate: "January 2024",
    verified: true,
    userType: "organizer",
    stats: {
      eventsAttended: 42,
      eventsOrganized: 15,
      followers: 1234,
      following: 567,
      crewsJoined: 8
    },
    socialLinks: {
      instagram: "sarahchen",
      twitter: "sarahchen",
      facebook: "sarahchen",
      website: "sarahchen.com"
    },
    interests: ["Music", "Art", "Technology", "Food & Wine", "Networking"],
    badges: [
      { name: "Early Adopter", icon: "🌟", description: "Joined in the first month" },
      { name: "Super Host", icon: "🏆", description: "Organized 10+ successful events" },
      { name: "Social Butterfly", icon: "🦋", description: "Connected with 100+ people" }
    ]
  };

  const upcomingEvents = [
    {
      id: "1",
      title: "Afrobeat Night at The Vault",
      date: "Sat, Feb 24",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
      attendees: 234
    },
    {
      id: "2",
      title: "Tech Meetup Nairobi",
      date: "Thu, Feb 29",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
      attendees: 89
    }
  ];

  const pastEvents = [
    {
      id: "3",
      title: "Jazz Evening",
      date: "Feb 10, 2024",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400",
      rating: 4.8,
      review: "Amazing atmosphere and great music!"
    },
    {
      id: "4",
      title: "Food Festival",
      date: "Jan 28, 2024",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      rating: 4.5,
      review: "Loved trying all the different cuisines"
    }
  ];

  const crews = [
    {
      id: "1",
      name: "Music Lovers Kenya",
      members: 156,
      image: "https://api.dicebear.com/v2/avataaars/crew1.svg"
    },
    {
      id: "2",
      name: "Foodies Unite",
      members: 89,
      image: "https://api.dicebear.com/v2/avataaars/crew2.svg"
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed successfully" : "Following Sarah Chen");
  };

  const handleMessage = () => {
    navigate('/chat');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.displayName} on Sypot`,
        text: user.bio,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied to clipboard!");
    }
  };

  return (
    <Layout>
      <SEO 
        title={`${user.displayName} | Sypot Profile`}
        description={user.bio}
        canonical={`/profile/${userId}`}
      />
      
      <div className="max-w-5xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 -mx-4 md:mx-0 md:rounded-xl overflow-hidden">
          <img 
            src={user.coverImage} 
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Profile Header */}
        <div className="relative px-4 md:px-0">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
            <div className="flex items-end space-x-4">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{user.displayName}</h1>
                  {user.verified && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-muted-foreground">{user.username}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
              >
                {isFollowing ? (
                  <>Following</>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleMessage}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Report User</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem>Copy Profile Link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Bio & Info */}
          <div className="mt-6 space-y-4">
            <p className="text-lg">{user.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {user.joinedDate}
              </span>
              {user.userType === 'organizer' && (
                <Badge variant="secondary">
                  <Award className="w-3 h-3 mr-1" />
                  Event Organizer
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 py-4 border-y">
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.eventsAttended}</p>
                <p className="text-xs text-muted-foreground">Events Attended</p>
              </div>
              {user.userType === 'organizer' && (
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.eventsOrganized}</p>
                  <p className="text-xs text-muted-foreground">Events Organized</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.followers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.stats.crewsJoined}</p>
                <p className="text-xs text-muted-foreground">Crews</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {user.socialLinks.instagram && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://instagram.com/${user.socialLinks.instagram}`} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {user.socialLinks.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://twitter.com/${user.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {user.socialLinks.website && (
                <Button variant="outline" size="icon" asChild>
                  <a href={`https://${user.socialLinks.website}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Interests */}
            <div>
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="font-semibold mb-2">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {user.badges.map((badge) => (
                  <Card key={badge.name}>
                    <CardContent className="flex items-center gap-3 p-4">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{badge.name}</p>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="upcoming" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="crews">Crews</TabsTrigger>
            <TabsTrigger value="memories">Memories</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="flex gap-4 p-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                  </div>
                  <Link to={`/event/${event.id}`}>
                    <Button>View Event</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="flex gap-4 p-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{event.rating}</span>
                      <span className="text-sm text-muted-foreground">• "{event.review}"</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="crews" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {crews.map((crew) => (
              <Card key={crew.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <Avatar>
                    <AvatarImage src={crew.image} />
                    <AvatarFallback>{crew.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{crew.name}</h3>
                    <p className="text-sm text-muted-foreground">{crew.members} members</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="memories" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=400`} 
                    alt={`Memory ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PublicProfile;