import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  Users,
  Heart,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Zap,
  Sun,
  Cloud,
  CloudRain,
  Music,
  Utensils,
  Camera,
  Palette,
  Gamepad2,
  BookOpen,
  DollarSign,
  Star,
  ChevronRight,
  Activity,
  Target,
  Award,
  Lightbulb,
  Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface EventRecommendation {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  matchScore: number;
  matchReasons: string[];
  attendees: number;
  tags: string[];
  weather?: {
    condition: string;
    temperature: number;
    icon: any;
  };
  trending?: boolean;
  friendsGoing?: number;
}

interface UserPreferences {
  interests: string[];
  priceRange: [number, number];
  preferredDays: string[];
  preferredTimes: string[];
  travelDistance: number;
  socialPreference: "solo" | "small-group" | "large-group";
  weatherPreference: "any" | "sunny" | "indoor";
}

interface AIInsight {
  type: "tip" | "trend" | "discovery";
  message: string;
  icon: any;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Discover = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [recommendations, setRecommendations] = useState<EventRecommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: ["Music", "Food", "Art"],
    priceRange: [0, 5000],
    preferredDays: ["Friday", "Saturday", "Sunday"],
    preferredTimes: ["Evening", "Night"],
    travelDistance: 10,
    socialPreference: "small-group",
    weatherPreference: "any"
  });
  
  const [aiMode, setAiMode] = useState<"personalized" | "trending" | "surprise">("personalized");
  const [feedbackGiven, setFeedbackGiven] = useState<{[key: string]: "like" | "dislike"}>({});

  // Mock weather data
  const currentWeather = {
    condition: "sunny",
    temperature: 24,
    forecast: "Perfect weather for outdoor events!"
  };

  // Mock AI insights
  const aiInsights: AIInsight[] = [
    {
      type: "tip",
      message: "Based on your history, you enjoy jazz events. There's a special jazz festival this weekend!",
      icon: Lightbulb,
      action: {
        label: "View Jazz Events",
        onClick: () => navigate("/events?category=music&subcategory=jazz")
      }
    },
    {
      type: "trend",
      message: "Rooftop events are trending this month with 300% more bookings",
      icon: TrendingUp,
      action: {
        label: "Explore Rooftop Events",
        onClick: () => navigate("/events?tag=rooftop")
      }
    },
    {
      type: "discovery",
      message: "You haven't explored art galleries yet. Discover a new passion!",
      icon: Palette,
      action: {
        label: "Try Art Events",
        onClick: () => navigate("/events?category=art")
      }
    }
  ];

  // Mock recommendations based on AI analysis
  const generateRecommendations = (): EventRecommendation[] => {
    const baseEvents = [
      {
        id: "1",
        title: "Sunset Jazz & Wine Festival",
        category: "Music",
        date: "Dec 20, 2024",
        time: "6:00 PM",
        location: "Rooftop Gardens, Westlands",
        price: 2500,
        image: "/placeholder.svg",
        matchScore: 95,
        matchReasons: [
          "Matches your love for jazz",
          "Perfect evening timing",
          "Highly rated by similar users",
          "Great weather forecast"
        ],
        attendees: 145,
        tags: ["Jazz", "Wine", "Rooftop", "Sunset"],
        weather: { condition: "sunny", temperature: 22, icon: Sun },
        trending: true,
        friendsGoing: 5
      },
      {
        id: "2",
        title: "Street Food Night Market",
        category: "Food",
        date: "Dec 21, 2024",
        time: "5:00 PM",
        location: "Karura Forest",
        price: 0,
        image: "/placeholder.svg",
        matchScore: 88,
        matchReasons: [
          "Free entry matches your budget",
          "Popular with your age group",
          "Close to your location",
          "Similar to events you loved"
        ],
        attendees: 523,
        tags: ["Food", "Market", "Family", "Free"],
        weather: { condition: "cloudy", temperature: 20, icon: Cloud },
        friendsGoing: 12
      },
      {
        id: "3",
        title: "Digital Art Exhibition: Future Visions",
        category: "Art",
        date: "Dec 22, 2024",
        time: "2:00 PM",
        location: "National Museum",
        price: 500,
        image: "/placeholder.svg",
        matchScore: 82,
        matchReasons: [
          "New experience recommendation",
          "Quiet environment for introverts",
          "Afternoon timing available",
          "Educational value"
        ],
        attendees: 67,
        tags: ["Art", "Digital", "Exhibition", "Culture"],
        weather: { condition: "indoor", temperature: 0, icon: null }
      },
      {
        id: "4",
        title: "Salsa Night: Learn & Dance",
        category: "Dance",
        date: "Dec 22, 2024",
        time: "8:00 PM",
        location: "Havana Bar, Kilimani",
        price: 1500,
        image: "/placeholder.svg",
        matchScore: 79,
        matchReasons: [
          "Social activity for groups",
          "Friday night preference",
          "Beginner friendly",
          "Great reviews"
        ],
        attendees: 89,
        tags: ["Dance", "Salsa", "Social", "Learning"],
        trending: true,
        friendsGoing: 3
      },
      {
        id: "5",
        title: "Morning Yoga by the Lake",
        category: "Wellness",
        date: "Dec 23, 2024",
        time: "6:30 AM",
        location: "Lake View Park",
        price: 800,
        image: "/placeholder.svg",
        matchScore: 75,
        matchReasons: [
          "Wellness focus",
          "Peaceful environment",
          "Weekend morning activity",
          "Nature setting"
        ],
        attendees: 34,
        tags: ["Yoga", "Wellness", "Morning", "Nature"],
        weather: { condition: "sunny", temperature: 18, icon: Sun }
      },
      {
        id: "6",
        title: "Comedy Night: Stand-up Showcase",
        category: "Entertainment",
        date: "Dec 23, 2024",
        time: "7:30 PM",
        location: "The Alchemist, Westlands",
        price: 2000,
        image: "/placeholder.svg",
        matchScore: 91,
        matchReasons: [
          "Highly rated entertainment",
          "Saturday night preference",
          "Your friends are interested",
          "Stress relief activity"
        ],
        attendees: 198,
        tags: ["Comedy", "Entertainment", "Nightlife"],
        trending: true,
        friendsGoing: 8
      }
    ];

    // Sort by match score based on AI mode
    if (aiMode === "personalized") {
      return baseEvents.sort((a, b) => b.matchScore - a.matchScore);
    } else if (aiMode === "trending") {
      return baseEvents.filter(e => e.trending).sort((a, b) => b.attendees - a.attendees);
    } else {
      // Surprise mode - random selection
      return baseEvents.sort(() => Math.random() - 0.5).slice(0, 4);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [aiMode]);

  const loadRecommendations = async () => {
    setLoading(true);
    setAiThinking(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recs = generateRecommendations();
    setRecommendations(recs);
    
    setAiThinking(false);
    setLoading(false);
  };

  const handleFeedback = (eventId: string, feedback: "like" | "dislike") => {
    setFeedbackGiven(prev => ({
      ...prev,
      [eventId]: feedback
    }));

    toast({
      title: feedback === "like" ? "Great choice! 👍" : "Noted 👎",
      description: feedback === "like" 
        ? "We'll show you more events like this"
        : "We'll adjust your recommendations",
    });

    // Simulate learning from feedback
    if (feedback === "like") {
      // Increase match scores for similar events
      setRecommendations(prev => prev.map(rec => {
        if (rec.id !== eventId) {
          const similarCategory = rec.category === recommendations.find(r => r.id === eventId)?.category;
          if (similarCategory) {
            return { ...rec, matchScore: Math.min(100, rec.matchScore + 5) };
          }
        }
        return rec;
      }));
    }
  };

  const refreshRecommendations = () => {
    setFeedbackGiven({});
    loadRecommendations();
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return Sun;
      case "cloudy": return Cloud;
      case "rainy": return CloudRain;
      default: return Sun;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "music": return Music;
      case "food": return Utensils;
      case "art": return Palette;
      case "photography": return Camera;
      case "gaming": return Gamepad2;
      case "literature": return BookOpen;
      default: return Calendar;
    }
  };

  return (
    <Layout>
      <SEO 
        title="AI-Powered Event Discovery | Sypot" 
        description="Get personalized event recommendations powered by AI. Discover your perfect events."
        canonical="/discover"
      />
      
      {/* Hero Section with AI Assistant */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Bot className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Your AI Event Assistant
            </h1>
            
            <p className="text-center text-muted-foreground mb-6">
              {aiThinking ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing your preferences and finding perfect matches...
                </span>
              ) : (
                `I've found ${recommendations.length} events that match your vibe today!`
              )}
            </p>

            {/* AI Mode Selector */}
            <div className="flex justify-center mb-6">
              <Tabs value={aiMode} onValueChange={(v) => setAiMode(v as any)} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personalized">
                    <Target className="h-4 w-4 mr-2" />
                    For You
                  </TabsTrigger>
                  <TabsTrigger value="trending">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="surprise">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Surprise Me
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Weather-based suggestion */}
            <Alert className="max-w-2xl mx-auto">
              <Sun className="h-4 w-4" />
              <AlertDescription>
                <strong>Perfect day for outdoor events!</strong> {currentWeather.forecast} 
                Temperature: {currentWeather.temperature}°C
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* AI Insights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AI Insights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      insight.type === "tip" ? "bg-blue-100 text-blue-600" :
                      insight.type === "trend" ? "bg-green-100 text-green-600" :
                      "bg-purple-100 text-purple-600"
                    }`}>
                      <insight.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{insight.message}</p>
                      {insight.action && (
                        <Button 
                          size="sm" 
                          variant="link" 
                          className="p-0 h-auto mt-2"
                          onClick={insight.action.onClick}
                        >
                          {insight.action.label}
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {aiMode === "personalized" ? "Personalized for You" :
               aiMode === "trending" ? "Trending Now" :
               "Surprise Picks"}
            </h2>
            <Button onClick={refreshRecommendations} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((event) => {
                const CategoryIcon = getCategoryIcon(event.category);
                const liked = feedbackGiven[event.id] === "like";
                const disliked = feedbackGiven[event.id] === "dislike";
                
                return (
                  <Card 
                    key={event.id} 
                    className={`overflow-hidden hover:shadow-xl transition-all ${
                      disliked ? "opacity-50" : ""
                    }`}
                  >
                    {/* Match Score Badge */}
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/80 text-white rounded-lg px-3 py-1 flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          <span className="font-bold">{event.matchScore}%</span>
                          <span className="text-xs">match</span>
                        </div>
                      </div>
                      {event.trending && (
                        <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-2 mt-1">
                              <CategoryIcon className="h-4 w-4" />
                              <span>{event.category}</span>
                            </div>
                          </CardDescription>
                        </div>
                        {event.weather && event.weather.icon && (
                          <div className="text-center">
                            <event.weather.icon className="h-5 w-5 text-yellow-500" />
                            <p className="text-xs">{event.weather.temperature}°</p>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Event Details */}
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-medium">
                              {event.price === 0 ? "Free" : `KES ${event.price}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees}</span>
                          </div>
                        </div>
                      </div>

                      {/* Match Reasons */}
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-medium mb-2 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Why we recommend this:
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {event.matchReasons.slice(0, 2).map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Friends Going */}
                      {event.friendsGoing && event.friendsGoing > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{event.friendsGoing} friends interested</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Feedback Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant={liked ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => handleFeedback(event.id, "like")}
                        >
                          <ThumbsUp className={`h-4 w-4 ${liked ? "" : "mr-2"}`} />
                          {!liked && "Like"}
                        </Button>
                        <Button
                          size="sm"
                          variant={disliked ? "destructive" : "outline"}
                          className="flex-1"
                          onClick={() => handleFeedback(event.id, "dislike")}
                        >
                          <ThumbsDown className={`h-4 w-4 ${disliked ? "" : "mr-2"}`} />
                          {!disliked && "Pass"}
                        </Button>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/event/${event.id}`)}
                        disabled={disliked}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Learning Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              AI Learning Progress
            </CardTitle>
            <CardDescription>
              The more you interact, the better my recommendations become!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Profile Completeness</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Preference Accuracy</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Recommendation Quality</span>
                  <span className="text-sm font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <strong>Pro tip:</strong> Rate more events to improve accuracy by 10%!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Discover;
