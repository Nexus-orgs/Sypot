import { Layout } from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      id: "1",
      title: "Summer Music Festival",
      description: "Join us for an amazing night of live music featuring local bands and amazing food trucks.",
      date: "July 15, 2024",
      time: "6:00 PM",
      location: "Central Park Amphitheater", 
      price: "$25",
      category: "Music",
      attendees: 147,
      imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Food Truck Rally", 
      description: "Taste the best street food from over 20 local vendors. Family-friendly event with live entertainment.",
      date: "July 20, 2024",
      time: "11:00 AM",
      location: "Downtown Square",
      price: "Free",
      category: "Food",
      attendees: 89,
      imageUrl: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      title: "Rooftop Yoga Session",
      description: "Start your weekend with a peaceful yoga session overlooking the city skyline.",
      date: "July 22, 2024",
      time: "8:00 AM", 
      location: "SkyBar Rooftop",
      price: "$15",
      category: "Wellness",
      attendees: 32,
      imageUrl: "https://images.unsplash.com/photo-1506629905607-21e7e92717ce?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      title: "Art Gallery Opening",
      description: "Celebrate local artists at this exclusive gallery opening featuring contemporary works.",
      date: "July 25, 2024",
      time: "7:00 PM",
      location: "Modern Art Gallery", 
      price: "$20",
      category: "Art",
      attendees: 56,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: "5",
      title: "Craft Beer Tasting",
      description: "Sample the finest local craft beers with expert guides and delicious pairings.",
      date: "July 27, 2024",
      time: "4:00 PM",
      location: "Brewery District",
      price: "$35", 
      category: "Food & Drink",
      attendees: 78,
      imageUrl: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=400&h=300&fit=crop"
    },
    {
      id: "6",
      title: "Comedy Night", 
      description: "Laugh out loud with the city's best stand-up comedians in an intimate venue.",
      date: "July 30, 2024",
      time: "9:00 PM",
      location: "Comedy Club Downtown",
      price: "$18",
      category: "Entertainment",
      attendees: 65,
      imageUrl: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=400&h=300&fit=crop"
    }
  ];

  const categories = ["All", "Music", "Food", "Art", "Wellness", "Entertainment", "Sports"];

  return (
    <Layout>
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Events
          </h1>
          <p className="text-xl mb-8 text-white/90">
            Find the perfect event for your interests
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Filter Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="vibrant" size="lg">
              Load More Events
            </Button>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" asChild>
              <Link to="/explore">Browse Categories</Link>
            </Button>
            <Button variant="vibrant" asChild>
              <Link to="/create-event">Create Event</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
