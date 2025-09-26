import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedSEO } from "@/components/SEO/EnhancedSEO";
import { 
  Calendar, MapPin, Users, Ticket, Shield, Zap, 
  Globe, Smartphone, Bell, MessageSquare, TrendingUp, 
  Star, Heart, Share2, Search, Filter, CreditCard,
  Lock, CheckCircle2, BarChart3, Clock, Sparkles,
  Building2, UserPlus, Gift, Trophy, Camera, Music
} from "lucide-react";
import { Link } from "react-router-dom";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: string;
  isNew?: boolean;
  isPremium?: boolean;
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Smart Event Discovery",
    description: "AI-powered recommendations based on your interests and past activities",
    category: "Discovery",
    isNew: true
  },
  {
    icon: MapPin,
    title: "Interactive Map View",
    description: "Explore events near you with our real-time interactive map",
    category: "Discovery"
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Find exactly what you're looking for with powerful filter options",
    category: "Discovery"
  },
  {
    icon: Calendar,
    title: "Calendar Sync",
    description: "Sync events directly to your Google, Apple, or Outlook calendar",
    category: "Organization"
  },
  {
    icon: Ticket,
    title: "Digital Tickets",
    description: "Store and manage all your tickets in one secure place",
    category: "Ticketing"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options with bank-level security",
    category: "Payments"
  },
  {
    icon: Users,
    title: "Group Bookings",
    description: "Book tickets for your entire crew in one transaction",
    category: "Social"
  },
  {
    icon: MessageSquare,
    title: "Event Chat",
    description: "Connect with other attendees before, during, and after events",
    category: "Social",
    isNew: true
  },
  {
    icon: Share2,
    title: "Social Sharing",
    description: "Share events with friends across all social platforms",
    category: "Social"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get notified about events you'll love and important updates",
    category: "Alerts"
  },
  {
    icon: TrendingUp,
    title: "Trending Events",
    description: "Stay updated with what's popular in your area",
    category: "Discovery"
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description: "Read and write reviews to help the community",
    category: "Community"
  },
  {
    icon: Heart,
    title: "Favorites List",
    description: "Save events and venues you love for quick access",
    category: "Organization"
  },
  {
    icon: Globe,
    title: "Virtual Events",
    description: "Join events from anywhere in the world",
    category: "Virtual"
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Fully responsive design optimized for all devices",
    category: "Platform"
  },
  {
    icon: Shield,
    title: "Verified Venues",
    description: "All venues are verified for authenticity and safety",
    category: "Safety"
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "Your data is encrypted and never shared without permission",
    category: "Safety"
  },
  {
    icon: Building2,
    title: "Business Tools",
    description: "Powerful tools for event organizers and venue owners",
    category: "Business",
    isPremium: true
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Deep insights into your event performance",
    category: "Business",
    isPremium: true
  },
  {
    icon: UserPlus,
    title: "Attendee Management",
    description: "Manage guest lists, check-ins, and more",
    category: "Business",
    isPremium: true
  },
  {
    icon: Gift,
    title: "Rewards Program",
    description: "Earn points for every booking and unlock exclusive perks",
    category: "Rewards",
    isNew: true
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete with friends and earn badges",
    category: "Gamification"
  },
  {
    icon: Camera,
    title: "Photo Sharing",
    description: "Share and discover event photos from the community",
    category: "Social"
  },
  {
    icon: Music,
    title: "Music Integration",
    description: "Connect with Spotify to discover events by your favorite artists",
    category: "Integration"
  },
  {
    icon: Clock,
    title: "Last Minute Deals",
    description: "Get exclusive discounts on last-minute tickets",
    category: "Deals"
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description: "Get personalized event recommendations from our AI assistant",
    category: "AI",
    isNew: true
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for instant loading",
    category: "Platform"
  }
];

const categories = Array.from(new Set(features.map(f => f.category)));

const Features = () => {
  return (
    <>
      <EnhancedSEO
        title="Features"
        description="Discover all the amazing features that make Sypot the best platform for finding and attending events. From AI-powered recommendations to secure ticketing."
        keywords="sypot features, event discovery, ticket booking, social features, event management"
        canonical="/features"
      />
      
      <Layout>
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="text-primary">Discover & Attend</span> Amazing Events
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From smart discovery to secure payments, we've got you covered with features
              designed to make your event experience seamless and enjoyable.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Active Users", value: "500K+", icon: Users },
              { label: "Events Listed", value: "10K+", icon: Calendar },
              { label: "Cities Covered", value: "50+", icon: MapPin },
              { label: "Tickets Sold", value: "1M+", icon: Ticket }
            ].map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              All Features
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category}
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <feature.icon className="w-8 h-8 text-primary" />
                    <div className="flex gap-2">
                      {feature.isNew && (
                        <Badge variant="secondary" className="text-xs">New</Badge>
                      )}
                      {feature.isPremium && (
                        <Badge variant="default" className="text-xs">Premium</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">
                    {feature.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience All These Features?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already discovering and attending amazing events
              with Sypot. Start your journey today!
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>

          {/* Feature Request */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground">
              Don't see a feature you need?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Let us know
              </Link>{" "}
              and we'll consider adding it!
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Features;