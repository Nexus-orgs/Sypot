import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Gift, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const FreeEvents = () => {
  const events = [
    {
      id: '1',
      title: 'Open Mic Poetry Night',
      description: 'Express yourself through spoken word and poetry in a supportive community',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      date: 'Every Wednesday',
      time: '7:00 PM',
      venue: 'The Book Cafe',
      location: 'CBD, Nairobi',
      category: 'Arts',
      attendees: 45,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Morning Yoga in the Park',
      description: 'Start your day with free yoga sessions in the beautiful Uhuru Park',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
      date: 'Saturdays & Sundays',
      time: '7:00 AM',
      venue: 'Uhuru Park',
      location: 'Nairobi',
      category: 'Wellness',
      attendees: 120,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Tech Meetup & Networking',
      description: 'Connect with fellow developers and tech enthusiasts',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      date: 'First Thursday',
      time: '6:00 PM',
      venue: 'iHub',
      location: 'Kilimani',
      category: 'Technology',
      attendees: 200,
      rating: 4.7
    },
    {
      id: '4',
      title: 'Community Market Day',
      description: 'Browse local crafts, enjoy live music, and taste street food',
      image: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800',
      date: 'Last Sunday',
      time: '10:00 AM',
      venue: 'Karura Forest',
      location: 'Kiambu Road',
      category: 'Market',
      attendees: 500,
      rating: 4.6
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Free Events | Sypot" 
        description="Discover amazing free events happening near you. No ticket required!"
        canonical="/free-events"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Free Events</h1>
            </div>
            <p className="text-xl opacity-90">Amazing experiences that won't cost you a penny!</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    <Gift className="w-3 h-3 mr-1" />
                    FREE
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">{event.category}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{event.description}</CardDescription>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}, {event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.attendees}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {event.rating}
                      </span>
                    </div>
                    <Link to={`/event/${event.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FreeEvents;
