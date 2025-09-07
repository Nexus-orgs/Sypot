import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock, 
  Share2, 
  Heart,
  MessageCircle,
  Star
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isGoing, setIsGoing] = useState(false);

  // Mock event data - would come from API
  const event = {
    id: id || "1",
    title: "Jazz Night at Blue Note",
    description: "Join us for an unforgettable evening of smooth jazz featuring local and international artists. Experience the finest live music in an intimate setting with cocktails and gourmet appetizers.",
    category: "Music",
    startDate: "2024-01-15T20:00:00",
    endDate: "2024-01-15T23:30:00",
    location: "Blue Note Jazz Club, Westlands",
    address: "Westlands Road, Nairobi, Kenya",
    price: 1500,
    maxAttendees: 150,
    currentAttendees: 89,
    coverImageUrl: "/placeholder.svg",
    organizer: {
      name: "Blue Note Events",
      avatar: "/placeholder.svg",
      verified: true
    },
    tags: ["Jazz", "Live Music", "Cocktails", "Date Night"]
  };

  const attendees = [
    { id: 1, name: "Sarah K.", avatar: "/placeholder.svg" },
    { id: 2, name: "Mike R.", avatar: "/placeholder.svg" },
    { id: 3, name: "Emma L.", avatar: "/placeholder.svg" },
    { id: 4, name: "James M.", avatar: "/placeholder.svg" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="aspect-video bg-gradient-primary rounded-lg relative overflow-hidden">
              <Badge className="absolute top-4 left-4 bg-white/20 text-white border-white/30">
                {event.category}
              </Badge>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/20 text-white hover:bg-white/30"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold">{event.title}</h1>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Jan 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>8:00 PM - 11:30 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">About this event</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              <Separator />

              {/* Organizer */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Organized by</h3>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={event.organizer.avatar} />
                    <AvatarFallback>BN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.organizer.name}</span>
                      {event.organizer.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>4.8 (24 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Attendees */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Going ({event.currentAttendees})</h3>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {attendees.map((attendee) => (
                      <Avatar key={attendee.id} className="border-2 border-background">
                        <AvatarImage src={attendee.avatar} />
                        <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {event.currentAttendees > 4 && (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium border-2 border-background">
                        +{event.currentAttendees - 4}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Ticket Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">KES {event.price.toLocaleString()}</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Available
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Available spots:</span>
                    <span>{event.maxAttendees - event.currentAttendees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total capacity:</span>
                    <span>{event.maxAttendees}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant="vibrant"
                  onClick={() => setIsGoing(!isGoing)}
                >
                  {isGoing ? "Cancel RSVP" : "Get Ticket"}
                </Button>

                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Find People to Go With
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">{event.address}</p>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="w-full">
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;