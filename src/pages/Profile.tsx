import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Calendar, 
  Heart, 
  Users, 
  Edit3,
  Settings,
  Camera
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    bio: "Event enthusiast and music lover. Always looking for the next great experience in Nairobi!",
    location: "Nairobi, Kenya",
    avatar: "/placeholder.svg",
    joinedDate: "March 2023",
    interests: ["Music", "Food & Drink", "Culture", "Sports", "Networking"],
    stats: {
      eventsAttended: 23,
      eventsCreated: 5,
      followers: 156,
      following: 89
    }
  };

  const userEvents = [
    {
      id: 1,
      title: "Jazz Night at Blue Note",
      date: "Jan 15, 2024",
      status: "attending",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Art Gallery Opening",
      date: "Jan 20, 2024",
      status: "created",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Rooftop Yoga Session",
      date: "Jan 12, 2024",
      status: "attended",
      image: "/placeholder.svg"
    }
  ];

  return (
    <Layout>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 w-8 h-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{user.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                       <Button variant="ghost" size="icon" asChild>
                         <Link to="/settings">
                           <Settings className="h-4 w-4" />
                         </Link>
                       </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{user.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">{user.stats.eventsAttended}</div>
                      <div className="text-muted-foreground">Events Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{user.stats.eventsCreated}</div>
                      <div className="text-muted-foreground">Events Created</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{user.stats.followers}</div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                     <div className="text-center">
                       <div className="font-semibold">{user.stats.following}</div>
                       <div className="text-muted-foreground">Following</div>
                     </div>
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>

          {/* Edit Profile Form */}
          {isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={user.location} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue={user.bio} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Tabs */}
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events">My Events</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userEvents.map((event) => (
                  <Card key={event.id}>
                    <div className="aspect-video bg-gradient-primary relative">
                      <Badge
                        className={`absolute top-3 left-3 ${
                          event.status === 'created' 
                            ? 'bg-green-500 text-white' 
                            : event.status === 'attending'
                            ? 'bg-blue-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {event.status === 'created' ? 'Created' : 
                         event.status === 'attending' ? 'Attending' : 'Attended'}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground">
                  Save events and places you love to see them here
                </p>
              </div>
            </TabsContent>

            <TabsContent value="friends" className="mt-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Connect with friends</h3>
                 <p className="text-muted-foreground mb-4">
                   Find and connect with people to discover events together
                 </p>
                 <Button variant="vibrant" asChild>
                   <Link to="/friends">Find Friends</Link>
                 </Button>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <div className="space-y-4">
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your Activity</h3>
                  <p className="text-muted-foreground">
                    Recent bookings, reviews, and interactions will appear here
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link to="/my-events">
                <Calendar className="h-6 w-6 mb-2" />
                My Events
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link to="/my-bookings">
                <Calendar className="h-6 w-6 mb-2" />
                My Bookings
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link to="/friends">
                <Users className="h-6 w-6 mb-2" />
                Friends
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;