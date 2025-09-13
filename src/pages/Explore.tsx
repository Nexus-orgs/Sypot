import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, MapPin, Calendar, DollarSign, Users, Clock, X, Building2, Activity } from "lucide-react";
import { supabase, Event, Business } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [dateFilter, setDateFilter] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    { id: "all", label: "All", icon: "🎯" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "food", label: "Food & Drink", icon: "🍴" },
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "culture", label: "Culture", icon: "🎨" },
    { id: "nightlife", label: "Nightlife", icon: "🌃" },
    { id: "outdoor", label: "Outdoor", icon: "🏞️" },
    { id: "wellness", label: "Wellness", icon: "🧘" },
    { id: "tech", label: "Tech", icon: "💻" },
    { id: "social", label: "Social", icon: "👥" },
  ];

  const dateFilters = [
    { value: "all", label: "All Dates" },
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "this_week", label: "This Week" },
    { value: "this_weekend", label: "This Weekend" },
    { value: "next_week", label: "Next Week" },
    { value: "this_month", label: "This Month" },
  ];

  useEffect(() => {
    fetchEvents();
    fetchBusinesses();
  }, [activeFilter, dateFilter, priceRange]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('events')
        .select('*')
        .eq('status', 'active')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      // Apply category filter
      if (activeFilter !== 'all') {
        query = query.eq('category', activeFilter);
      }

      // Apply price filter
      query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);

      // Apply date filter
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      switch (dateFilter) {
        case 'today':
          query = query.gte('start_date', today.toISOString())
                      .lt('start_date', tomorrow.toISOString());
          break;
        case 'tomorrow':
          const dayAfterTomorrow = new Date(tomorrow);
          dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
          query = query.gte('start_date', tomorrow.toISOString())
                      .lt('start_date', dayAfterTomorrow.toISOString());
          break;
        case 'this_week':
          const endOfWeek = new Date(today);
          endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
          query = query.lte('start_date', endOfWeek.toISOString());
          break;
        case 'this_weekend':
          const friday = new Date(today);
          friday.setDate(friday.getDate() + (5 - friday.getDay()));
          const monday = new Date(friday);
          monday.setDate(monday.getDate() + 3);
          query = query.gte('start_date', friday.toISOString())
                      .lt('start_date', monday.toISOString());
          break;
        case 'this_month':
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          query = query.lte('start_date', endOfMonth.toISOString());
          break;
      }

      // Apply search query
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinesses = async () => {
    try {
      let query = supabase
        .from('businesses')
        .select('*')
        .eq('verified', true)
        .order('created_at', { ascending: false });

      // Apply category filter
      if (activeFilter !== 'all') {
        query = query.eq('category', activeFilter);
      }

      // Apply search query
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
    fetchBusinesses();
  };

  // Mock data for demo purposes
  const mockEvents = [
    {
      id: '1',
      title: "Jazz Night at Blue Note",
      category: "music",
      start_date: new Date().toISOString(),
      location: "Westlands, Nairobi",
      price: 1500,
      is_free: false,
      description: "An evening of smooth jazz and cocktails",
      cover_image_url: "/placeholder.svg",
      max_attendees: 100,
    },
    {
      id: '2',
      title: "Rooftop Yoga Session",
      category: "wellness",
      start_date: new Date(Date.now() + 86400000).toISOString(),
      location: "Karen, Nairobi",
      price: 0,
      is_free: true,
      description: "Start your day with mindful movement",
      cover_image_url: "/placeholder.svg",
      max_attendees: 30,
    },
    {
      id: '3',
      title: "Art Gallery Opening",
      category: "culture",
      start_date: new Date(Date.now() + 172800000).toISOString(),
      location: "Museum Hill",
      price: 500,
      is_free: false,
      description: "Contemporary African art exhibition",
      cover_image_url: "/placeholder.svg",
      max_attendees: 200,
    },
    {
      id: '4',
      title: "Tech Meetup: AI & Future",
      category: "tech",
      start_date: new Date(Date.now() + 259200000).toISOString(),
      location: "iHub, Kilimani",
      price: 0,
      is_free: true,
      description: "Discussion on AI trends and networking",
      cover_image_url: "/placeholder.svg",
      max_attendees: 50,
    },
  ];

  const mockBusinesses = [
    {
      id: '1',
      name: "Villa Rosa Kempinski",
      category: "hospitality",
      location: "Westlands, Nairobi",
      description: "Luxury hotel with fine dining and spa",
      verified: true,
      logo_url: "/placeholder.svg",
    },
    {
      id: '2',
      name: "Brew Bistro",
      category: "food",
      location: "Fortis Tower, Westlands",
      description: "Craft beer and gourmet burgers",
      verified: true,
      logo_url: "/placeholder.svg",
    },
    {
      id: '3',
      name: "Primal Fitness",
      category: "wellness",
      location: "Kilimani",
      description: "CrossFit and functional training gym",
      verified: true,
      logo_url: "/placeholder.svg",
    },
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;
  const displayBusinesses = businesses.length > 0 ? businesses : mockBusinesses;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events, places, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" className="h-12">
              Search
            </Button>
            
            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Results</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  {/* Date Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateFilters.map((filter) => (
                          <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Price Range (KES {priceRange[0]} - {priceRange[1]})
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={10000}
                      step={100}
                      className="mt-2"
                    />
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setDateFilter('all');
                      setPriceRange([0, 10000]);
                      setActiveFilter('all');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </form>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                size="sm"
                className="rounded-full"
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="places">
              <Building2 className="h-4 w-4 mr-2" />
              Places
            </TabsTrigger>
            <TabsTrigger value="activities">
              <Activity className="h-4 w-4 mr-2" />
              Activities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Loading events...</p>
              </div>
            ) : displayEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayEvents.map((event: any) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <Badge className="absolute top-3 left-3 bg-white/90">
                        {categories.find(c => c.id === event.category)?.icon} {event.category}
                      </Badge>
                      {event.is_free && (
                        <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                          FREE
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {format(new Date(event.start_date), 'MMM dd, yyyy - h:mm a')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            {event.is_free ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              <>
                                <DollarSign className="h-4 w-4" />
                                KES {event.price}
                              </>
                            )}
                          </div>
                          {event.max_attendees && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {Math.floor(Math.random() * event.max_attendees)} going
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="places" className="mt-6">
            {displayBusinesses.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No places found</h3>
                <p className="text-muted-foreground">Discover amazing venues and businesses</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayBusinesses.map((business: any) => (
                  <Card
                    key={business.id}
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/40 relative">
                      {business.verified && (
                        <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{business.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {business.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {business.description}
                      </p>
                      <Button className="w-full mt-4" variant="outline">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Activities Coming Soon</h3>
              <p className="text-muted-foreground">Find group activities and social gatherings</p>
              <Button className="mt-4" onClick={() => navigate('/create-event')}>
                Create an Activity
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Explore;
