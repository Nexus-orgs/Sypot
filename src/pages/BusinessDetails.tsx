import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Star, 
  Calendar,
  Users,
  Heart,
  Share2
} from "lucide-react";

const BusinessDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  // Mock business data
  const business = {
    id: id || "1",
    name: "Blue Note Jazz Club",
    category: "Entertainment",
    description: "Nairobi's premier jazz venue featuring live music, craft cocktails, and an intimate atmosphere perfect for date nights and music lovers.",
    address: "Westlands Road, Nairobi, Kenya",
    phone: "+254 700 123 456",
    website: "www.bluenote.co.ke",
    email: "info@bluenote.co.ke",
    rating: 4.8,
    reviewCount: 124,
    coverImageUrl: "/placeholder.svg",
    logoUrl: "/placeholder.svg",
    verified: true,
    openingHours: {
      monday: "6:00 PM - 2:00 AM",
      tuesday: "6:00 PM - 2:00 AM", 
      wednesday: "6:00 PM - 2:00 AM",
      thursday: "6:00 PM - 2:00 AM",
      friday: "6:00 PM - 3:00 AM",
      saturday: "6:00 PM - 3:00 AM",
      sunday: "Closed"
    }
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Jazz Night",
      date: "Tonight",
      time: "8:00 PM",
      price: "KES 1,500",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Soul Sunday",
      date: "This Sunday",
      time: "7:00 PM", 
      price: "KES 1,000",
      image: "/placeholder.svg"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: { name: "Sarah K.", avatar: "/placeholder.svg" },
      rating: 5,
      comment: "Amazing atmosphere and incredible live music. Perfect for a special night out!",
      date: "2 days ago"
    },
    {
      id: 2,
      user: { name: "Mike R.", avatar: "/placeholder.svg" },
      rating: 4,
      comment: "Great cocktails and service. The jazz performances are top notch.",
      date: "1 week ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Header */}
            <div className="relative">
              <div className="aspect-video bg-gradient-primary rounded-lg overflow-hidden">
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
              
              <div className="flex items-end gap-4 -mt-16 ml-6 relative z-10">
                <Avatar className="w-20 h-20 border-4 border-background">
                  <AvatarImage src={business.logoUrl} />
                  <AvatarFallback className="text-xl">{business.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="bg-background/80 backdrop-blur-md rounded-lg p-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{business.name}</h1>
                    {business.verified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="mb-2">{business.category}</Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{business.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{business.reviewCount} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {business.description}
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id}>
                        <div className="aspect-video bg-gradient-warm"></div>
                        <CardHeader>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            {event.date} at {event.time}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{event.price}</span>
                            <Button size="sm" variant="vibrant">Book Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">Menu Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Menu and offerings will be available here
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Reviews ({business.reviewCount})</h3>
                    <Button variant="outline">Write Review</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <Avatar>
                              <AvatarImage src={review.user.avatar} />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{review.user.name}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-500 text-yellow-500'
                                          : 'text-muted-foreground'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{business.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{business.website}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Opening Hours
                  </h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(business.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4" variant="vibrant">
                  <Calendar className="h-4 w-4 mr-2" />
                  Make Reservation
                </Button>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" className="w-full">
                  View on Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDetails;