import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Map, 
  Search, 
  Filter, 
  Navigation,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star
} from "lucide-react";

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const mapEvents = [
    {
      id: "1",
      title: "Jazz Night at Blue Note",
      category: "Music",
      date: "Tonight",
      time: "8:00 PM",
      location: "Westlands",
      coordinates: { lat: -1.2621, lng: 36.8054 },
      price: "KES 1,500",
      attendees: 45,
      rating: 4.8
    },
    {
      id: "2",
      title: "Rooftop Yoga Session", 
      category: "Sports",
      date: "Tomorrow",
      time: "7:00 AM",
      location: "Karen",
      coordinates: { lat: -1.3197, lng: 36.7077 },
      price: "Free",
      attendees: 12,
      rating: 4.9
    },
    {
      id: "3",
      title: "Art Gallery Opening",
      category: "Culture", 
      date: "Saturday",
      time: "6:00 PM",
      location: "Museum Hill",
      coordinates: { lat: -1.2881, lng: 36.8233 },
      price: "KES 500",
      attendees: 78,
      rating: 4.7
    }
  ];

  const mapBusinesses = [
    {
      id: "1",
      name: "Blue Note Jazz Club",
      category: "Entertainment",
      location: "Westlands",
      coordinates: { lat: -1.2621, lng: 36.8054 },
      rating: 4.8,
      reviews: 124,
      openNow: true
    },
    {
      id: "2",
      name: "Karen Country Club",
      category: "Sports & Recreation",
      location: "Karen", 
      coordinates: { lat: -1.3197, lng: 36.7077 },
      rating: 4.6,
      reviews: 89,
      openNow: true
    }
  ];

  const filters = [
    { id: "all", label: "All", count: 124 },
    { id: "events", label: "Events", count: 45 },
    { id: "businesses", label: "Places", count: 79 },
    { id: "music", label: "Music", count: 23 },
    { id: "food", label: "Food & Drink", count: 31 },
    { id: "sports", label: "Sports", count: 18 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search & Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Discover Nearby
                </CardTitle>
                <CardDescription>
                  Find events and places around you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    Current Location
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.id)}
                      className="text-xs"
                    >
                      {filter.label}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {filter.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results List */}
            <Card className="flex-1">
              <Tabs defaultValue="events" className="w-full">
                <CardHeader className="pb-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="places">Places</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="p-0">
                  <TabsContent value="events" className="mt-0">
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="space-y-3 p-4">
                        {mapEvents.map((event) => (
                          <div
                            key={event.id}
                            className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">{event.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {event.category}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>{event.date}</span>
                                <Clock className="h-3 w-3 ml-2" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-3 w-3" />
                                  <span>{event.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-3 w-3" />
                                  <span>{event.attendees} going</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="places" className="mt-0">
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="space-y-3 p-4">
                        {mapBusinesses.map((business) => (
                          <div
                            key={business.id}
                            className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">{business.name}</h4>
                              <Badge 
                                variant={business.openNow ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {business.openNow ? "Open" : "Closed"}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {business.category}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{business.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                <span>{business.rating}</span>
                                <span>({business.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <div className="h-full bg-gradient-to-br from-primary/20 to-vibrant-purple/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Mock Map Interface */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  
                  <div className="text-center z-10">
                    <Map className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground mb-4">
                      Map integration with Google Maps or Mapbox coming soon
                    </p>
                    <Button variant="vibrant">
                      Enable Location Services
                    </Button>
                  </div>

                  {/* Mock Map Pins */}
                  <div className="absolute top-1/4 left-1/3 animate-pulse">
                    <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 right-1/3 animate-pulse delay-100">
                    <div className="w-6 h-6 bg-vibrant-orange rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/3 left-1/2 animate-pulse delay-200">
                    <div className="w-6 h-6 bg-vibrant-purple rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapView;