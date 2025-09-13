import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Sun, Moon, Sunrise, Music, Utensils, PartyPopper, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface WeekendEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  day: 'friday' | 'saturday' | 'sunday';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  price: number;
  category: string;
  vibe: string[];
  perfectFor: string[];
  spotsLeft?: number;
}

const ThisWeekend = () => {
  const [selectedDay, setSelectedDay] = useState<'all' | 'friday' | 'saturday' | 'sunday'>('all');
  const [events] = useState<WeekendEvent[]>([
    {
      id: '1',
      title: 'Blankets & Wine',
      description: 'The ultimate Sunday funday with live music, great food, and amazing vibes',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      day: 'sunday',
      timeOfDay: 'afternoon',
      startTime: '12:00 PM',
      endTime: '10:00 PM',
      location: 'Nairobi',
      venue: 'Ngong Racecourse',
      price: 2500,
      category: 'Festival',
      vibe: ['Chill', 'Social', 'Music'],
      perfectFor: ['Groups', 'Couples', 'Solo'],
      spotsLeft: 45
    },
    {
      id: '2',
      title: 'Friday Night Live at J\'s',
      description: 'Start your weekend right with live band performances and cocktails',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      day: 'friday',
      timeOfDay: 'night',
      startTime: '9:00 PM',
      endTime: '3:00 AM',
      location: 'Westlands',
      venue: "J's Fresh Bar",
      price: 1000,
      category: 'Nightlife',
      vibe: ['Energetic', 'Dance', 'Social'],
      perfectFor: ['Friends', 'Party lovers'],
      spotsLeft: 12
    },
    {
      id: '3',
      title: 'Saturday Brunch & Art',
      description: 'Enjoy gourmet brunch while exploring local art exhibitions',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      day: 'saturday',
      timeOfDay: 'morning',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      location: 'Karen',
      venue: 'The Art Space',
      price: 3500,
      category: 'Food & Art',
      vibe: ['Sophisticated', 'Relaxed', 'Cultural'],
      perfectFor: ['Couples', 'Art lovers', 'Foodies']
    },
    {
      id: '4',
      title: 'Afro House Saturdays',
      description: 'The best Afro house DJs spinning all night long',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
      day: 'saturday',
      timeOfDay: 'night',
      startTime: '10:00 PM',
      endTime: '6:00 AM',
      location: 'Kilimani',
      venue: 'The Alchemist',
      price: 1500,
      category: 'Clubbing',
      vibe: ['High Energy', 'Dance', 'Late Night'],
      perfectFor: ['Party crews', 'Dance lovers'],
      spotsLeft: 8
    },
    {
      id: '5',
      title: 'Sunday Farmers Market',
      description: 'Fresh produce, artisanal goods, and live acoustic music',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
      day: 'sunday',
      timeOfDay: 'morning',
      startTime: '8:00 AM',
      endTime: '1:00 PM',
      location: 'Loresho',
      venue: 'The Village Market',
      price: 0,
      category: 'Market',
      vibe: ['Family-friendly', 'Organic', 'Community'],
      perfectFor: ['Families', 'Health conscious', 'Early birds']
    },
    {
      id: '6',
      title: 'Comedy Friday',
      description: 'Stand-up comedy show featuring Kenya\'s finest comedians',
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800',
      day: 'friday',
      timeOfDay: 'evening',
      startTime: '7:00 PM',
      endTime: '10:00 PM',
      location: 'CBD',
      venue: 'Kenya National Theatre',
      price: 1200,
      category: 'Comedy',
      vibe: ['Fun', 'Laughter', 'Entertainment'],
      perfectFor: ['Date night', 'Friends', 'Comedy fans']
    }
  ]);

  const filteredEvents = selectedDay === 'all' 
    ? events 
    : events.filter(event => event.day === selectedDay);

  const getTimeIcon = (timeOfDay: string) => {
    switch(timeOfDay) {
      case 'morning': return <Sunrise className="w-4 h-4" />;
      case 'afternoon': return <Sun className="w-4 h-4" />;
      case 'evening': return <Moon className="w-4 h-4" />;
      case 'night': return <Moon className="w-4 h-4 fill-current" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'festival': return <Music className="w-4 h-4" />;
      case 'nightlife': case 'clubbing': return <PartyPopper className="w-4 h-4" />;
      case 'food & art': case 'market': return <Utensils className="w-4 h-4" />;
      case 'comedy': return <Heart className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <SEO 
        title="This Weekend Events | Sypot" 
        description="Find the perfect events happening this weekend. From Friday night parties to Sunday brunch, we've got your weekend sorted."
        canonical="/this-weekend"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">This Weekend</h1>
              <p className="text-xl opacity-90 mb-6">
                Make the most of your weekend with these amazing events
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{events.filter(e => e.day === 'friday').length}</p>
                  <p className="text-sm opacity-80">Friday</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{events.filter(e => e.day === 'saturday').length}</p>
                  <p className="text-sm opacity-80">Saturday</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold">{events.filter(e => e.day === 'sunday').length}</p>
                  <p className="text-sm opacity-80">Sunday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={selectedDay} onValueChange={(value: any) => setSelectedDay(value)}>
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">All Weekend</TabsTrigger>
              <TabsTrigger value="friday">Friday</TabsTrigger>
              <TabsTrigger value="saturday">Saturday</TabsTrigger>
              <TabsTrigger value="sunday">Sunday</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedDay} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/70 text-white backdrop-blur-sm capitalize">
                          {event.day}
                        </Badge>
                      </div>
                      {event.spotsLeft && event.spotsLeft < 50 && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="destructive">
                            Only {event.spotsLeft} spots left!
                          </Badge>
                        </div>
                      )}
                      {event.price === 0 && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-green-500 text-white">FREE</Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            {getCategoryIcon(event.category)}
                            <Badge variant="outline" className="text-xs">
                              {event.category}
                            </Badge>
                            {getTimeIcon(event.timeOfDay)}
                            <Badge variant="secondary" className="text-xs capitalize">
                              {event.timeOfDay}
                            </Badge>
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
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{event.venue}, {event.location}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {event.vibe.map((vibe) => (
                            <Badge key={vibe} variant="secondary" className="text-xs">
                              {vibe}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {event.perfectFor.map((perfect) => (
                            <span key={perfect} className="text-xs text-muted-foreground">
                              {perfect} •
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          {event.price > 0 ? (
                            <p className="text-lg font-bold">
                              KES {event.price.toLocaleString()}
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-600">Free Entry</p>
                          )}
                        </div>
                        <Link to={`/event/${event.id}`}>
                          <Button size="sm">
                            Get Tickets
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">No events found for this day</p>
                    <Button variant="outline">View All Events</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Weekend Tips */}
          <div className="mt-12 bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold mb-4">Weekend Planning Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Book Early</h3>
                  <p className="text-sm text-muted-foreground">Popular weekend events sell out fast. Book by Thursday!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Plan Your Route</h3>
                  <p className="text-sm text-muted-foreground">Check traffic and parking options before heading out.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Mix It Up</h3>
                  <p className="text-sm text-muted-foreground">Try different types of events for a well-rounded weekend.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThisWeekend;
