import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Calendar, DollarSign, Users } from "lucide-react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All", count: 120 },
    { id: "music", label: "Music", count: 45 },
    { id: "food", label: "Food & Drink", count: 32 },
    { id: "sports", label: "Sports", count: 18 },
    { id: "culture", label: "Culture", count: 25 },
  ];

  const sampleEvents = [
    {
      id: 1,
      title: "Jazz Night at Blue Note",
      category: "Music",
      date: "Today, 8:00 PM",
      location: "Westlands, Nairobi",
      price: "KES 1,500",
      attendees: 45,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Rooftop Yoga Session",
      category: "Sports",
      date: "Tomorrow, 7:00 AM",
      location: "Karen, Nairobi",
      price: "Free",
      attendees: 12,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Art Gallery Opening",
      category: "Culture",
      date: "Sat, 6:00 PM",
      location: "Museum Hill",
      price: "KES 500",
      attendees: 78,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events, places, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className="rounded-full"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-primary relative">
                    <Badge className="absolute top-3 left-3 bg-white/20 text-white border-white/30">
                      {event.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4" />
                          {event.price}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} going
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="vibrant">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="places" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Places Coming Soon</h3>
              <p className="text-muted-foreground">Discover amazing venues and businesses</p>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Activities Coming Soon</h3>
              <p className="text-muted-foreground">Find group activities and social gatherings</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Explore;