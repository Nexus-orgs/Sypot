import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import FeatureSection from "@/components/FeatureSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, MapPin, Users, TrendingUp, Star, ArrowRight, 
  Sparkles, Gift, Clock, Heart, Shield, Zap, Globe, Award,
  PartyPopper, Music, Utensils, Camera, Ticket, Search
} from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { number: "500K+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { number: "10K+", label: "Events Monthly", icon: <Calendar className="w-5 h-5" /> },
    { number: "25", label: "Cities", icon: <MapPin className="w-5 h-5" /> },
    { number: "98%", label: "Happy Attendees", icon: <Heart className="w-5 h-5" /> }
  ];

  const categories = [
    { name: "Music & Concerts", icon: <Music className="w-8 h-8" />, count: 234, color: "bg-purple-500" },
    { name: "Food & Drink", icon: <Utensils className="w-8 h-8" />, count: 156, color: "bg-orange-500" },
    { name: "Nightlife", icon: <PartyPopper className="w-8 h-8" />, count: 189, color: "bg-pink-500" },
    { name: "Arts & Culture", icon: <Camera className="w-8 h-8" />, count: 92, color: "bg-blue-500" },
    { name: "Sports & Fitness", icon: <Award className="w-8 h-8" />, count: 78, color: "bg-green-500" },
    { name: "Tech & Business", icon: <Globe className="w-8 h-8" />, count: 145, color: "bg-indigo-500" }
  ];

  const upcomingHighlights = [
    {
      title: "This Weekend",
      description: "45 amazing events",
      link: "/this-weekend",
      icon: <Calendar className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Trending Now",
      description: "See what's hot",
      link: "/trending-events",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Free Events",
      description: "No ticket needed",
      link: "/free-events",
      icon: <Gift className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Virtual Events",
      description: "Join from anywhere",
      link: "/virtual-events",
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Event Enthusiast",
      content: "Sypot has completely changed how I discover events. I've found amazing experiences I never knew existed!",
      rating: 5,
      avatar: "https://api.dicebear.com/v2/avataaars/sarah.svg"
    },
    {
      name: "James K.",
      role: "Event Organizer",
      content: "The platform has helped me reach 10x more attendees. The tools are intuitive and powerful.",
      rating: 5,
      avatar: "https://api.dicebear.com/v2/avataaars/james.svg"
    },
    {
      name: "Lisa W.",
      role: "Business Owner",
      content: "Hosting events through Sypot has brought so many new customers to my restaurant. It's been a game-changer!",
      rating: 5,
      avatar: "https://api.dicebear.com/v2/avataaars/lisa.svg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <SEO 
        title="Sypot - Discover Amazing Events Near You" 
        description="Find and attend the best events in your city. From concerts to workshops, nightlife to wellness, discover experiences that matter."
        canonical="/"
      />
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <HeroSection />
        
        {/* Animated Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">Live Stats</span>
              </div>
              <div className="flex items-center gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className={`flex items-center gap-2 transition-all duration-500 ${
                      index === currentStat ? 'scale-110 text-yellow-400' : 'opacity-70'
                    }`}
                  >
                    {stat.icon}
                    <span className="font-bold">{stat.number}</span>
                    <span className="text-xs hidden sm:inline">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Start Exploring</h2>
            <p className="text-muted-foreground">Jump right into what's happening</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingHighlights.map((highlight) => (
              <Link key={highlight.title} to={highlight.link}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">
                  <div className={`h-2 bg-gradient-to-r ${highlight.gradient}`} />
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${highlight.gradient} text-white`}>
                        {highlight.icon}
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <FeaturedEvents />

      {/* Event Categories */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4" variant="secondary">
              <Search className="w-3 h-3 mr-1" />
              Browse by Category
            </Badge>
            <h2 className="text-3xl font-bold mb-2">Find Your Perfect Event</h2>
            <p className="text-muted-foreground">Explore events across different categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.name} to={`/events?category=${category.name.toLowerCase().replace(/ & /g, '-')}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} events</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeatureSection />

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4" variant="secondary">
              <Star className="w-3 h-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold mb-2">What Our Community Says</h2>
            <p className="text-muted-foreground">Real stories from real people</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              <span className="text-sm">Mobile Tickets</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Amazing Events?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of people who are already discovering and attending incredible events through Sypot.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="gap-2">
                  <Search className="w-4 h-4" />
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;