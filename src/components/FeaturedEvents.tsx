import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

const sampleEvents = [
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
  }
];

const FeaturedEvents = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Trending Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the hottest events happening in your area this week
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="vibrant" size="lg">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
