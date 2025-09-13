import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, TrendingUp, Users, Star, Flame, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface TrendingEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  currency: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  trendingScore: number;
  growthRate: string;
  tags: string[];
  organizer: {
    name: string;
    verified: boolean;
  };
}

const TrendingEvents = () => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week');
  const [events] = useState<TrendingEvent[]>([
    {
      id: '1',
      title: 'Afrobeat Explosion Festival',
      description: 'The biggest Afrobeat festival featuring top artists from across Africa',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
      date: '2024-02-24',
      time: '6:00 PM',
      location: 'Nairobi, Kenya',
      venue: 'Carnivore Grounds',
      price: 3500,
      currency: 'KES',
      category: 'Music',
      attendees: 2847,
      maxAttendees: 5000,
      trendingScore: 98,
      growthRate: '+245%',
      tags: ['Afrobeat', 'Live Music', 'Festival'],
      organizer: {
        name: 'Beat Africa',
        verified: true
      }
    },
    {
      id: '2',
      title: 'Tech Summit Kenya 2024',
      description: 'Connect with industry leaders and explore the future of technology in Africa',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      date: '2024-02-26',
      time: '9:00 AM',
      location: 'Nairobi, Kenya',
      venue: 'KICC',
      price: 5000,
      currency: 'KES',
      category: 'Technology',
      attendees: 1523,
      maxAttendees: 2000,
      trendingScore: 95,
      growthRate: '+180%',
      tags: ['Tech', 'Innovation', 'Networking'],
      organizer: {
        name: 'TechHub Africa',
        verified: true
      }
    },
    {
      id: '3',
      title: 'Nairobi Food & Wine Festival',
      description: 'A culinary journey featuring the best chefs and restaurants in East Africa',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      date: '2024-02-25',
      time: '12:00 PM',
      location: 'Nairobi, Kenya',
      venue: 'Ngong Racecourse',
      price: 2500,
      currency: 'KES',
      category: 'Food & Drink',
      attendees: 3421,
      maxAttendees: 4000,
      trendingScore: 92,
      growthRate: '+156%',
      tags: ['Food', 'Wine', 'Culinary'],
      organizer: {
        name: 'Taste of Kenya',
        verified: true
      }
    },
    {
      id: '4',
      title: 'Comedy Night with Churchill',
      description: 'An evening of laughter with Kenya\'s comedy king and special guests',
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800',
      date: '2024-02-23',
      time: '7:30 PM',
      location: 'Nairobi, Kenya',
      venue: 'Alliance Française',
      price: 1500,
      currency: 'KES',
      category: 'Comedy',
      attendees: 456,
      maxAttendees: 500,
      trendingScore: 89,
      growthRate: '+320%',
      tags: ['Comedy', 'Entertainment', 'Stand-up'],
      organizer: {
        name: 'Laugh Industry',
        verified: true
      }
    },
    {
      id: '5',
      title: 'Startup Pitch Night',
      description: 'Watch innovative startups pitch to investors and win funding',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
      date: '2024-02-27',
      time: '6:00 PM',
      location: 'Nairobi, Kenya',
      venue: 'iHub',
      price: 0,
      currency: 'KES',
      category: 'Business',
      attendees: 234,
      maxAttendees: 300,
      trendingScore: 87,
      growthRate: '+420%',
      tags: ['Startups', 'Investment', 'Pitch'],
      organizer: {
        name: 'Startup Kenya',
        verified: false
      }
    },
    {
      id: '6',
      title: 'Yoga & Wellness Retreat',
      description: 'A day of mindfulness, yoga, and wellness activities in nature',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
      date: '2024-02-24',
      time: '7:00 AM',
      location: 'Nairobi, Kenya',
      venue: 'Karura Forest',
      price: 2000,
      currency: 'KES',
      category: 'Wellness',
      attendees: 178,
      maxAttendees: 200,
      trendingScore: 85,
      growthRate: '+195%',
      tags: ['Yoga', 'Wellness', 'Meditation'],
      organizer: {
        name: 'Zen Kenya',
        verified: true
      }
    }
  ]);

  const filteredEvents = events.filter(event => {
    // In a real app, filter by actual dates
    return true;
  });

  const getTrendingIcon = (score: number) => {
    if (score >= 95) return <Flame className="w-4 h-4 text-orange-500" />;
    if (score >= 90) return <Zap className="w-4 h-4 text-yellow-500" />;
    return <TrendingUp className="w-4 h-4 text-green-500" />;
  };

  return (
    <Layout>
      <SEO 
        title="Trending Events | Sypot" 
        description="Discover the hottest and most popular events happening right now. Don't miss out on what everyone's talking about."
        canonical="/trending-events"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-8 h-8" />
                <h1 className="text-4xl md:text-5xl font-bold">Trending Events</h1>
              </div>
              <p className="text-xl opacity-90 mb-6">
                The hottest events everyone's talking about right now
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={timeFilter === 'today' ? 'secondary' : 'outline'}
                  onClick={() => setTimeFilter('today')}
                  className={timeFilter !== 'today' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : ''}
                >
                  Today
                </Button>
                <Button
                  variant={timeFilter === 'week' ? 'secondary' : 'outline'}
                  onClick={() => setTimeFilter('week')}
                  className={timeFilter !== 'week' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : ''}
                >
                  This Week
                </Button>
                <Button
                  variant={timeFilter === 'month' ? 'secondary' : 'outline'}
                  onClick={() => setTimeFilter('month')}
                  className={timeFilter !== 'month' ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : ''}
                >
                  This Month
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-semibold">{events.length}</span>
                <span className="text-muted-foreground">Trending Now</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">
                  {events.reduce((sum, e) => sum + e.attendees, 0).toLocaleString()}
                </span>
                <span className="text-muted-foreground">People Interested</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-semibold">+215%</span>
                <span className="text-muted-foreground">Weekly Growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-black/70 text-white backdrop-blur-sm">
                      #{index + 1} Trending
                    </Badge>
                    {getTrendingIcon(event.trendingScore)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-green-500/90 text-white">
                      {event.growthRate}
                    </Badge>
                  </div>
                  {event.price === 0 && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-500 text-white">FREE</Badge>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                        {event.organizer.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees.toLocaleString()} / {event.maxAttendees.toLocaleString()} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      {event.price > 0 ? (
                        <p className="text-lg font-bold">
                          {event.currency} {event.price.toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-lg font-bold text-green-600">Free Event</p>
                      )}
                    </div>
                    <Link to={`/event/${event.id}`}>
                      <Button size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Trending Events
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrendingEvents;
