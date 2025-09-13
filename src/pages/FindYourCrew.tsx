import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Users,
  UserPlus,
  Heart,
  MapPin,
  Calendar,
  Music,
  Sparkles,
  Star,
  MessageSquare,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
  Coffee,
  Camera,
  Gamepad2,
  Palette,
  Utensils,
  Dumbbell,
  BookOpen,
  Plane,
  PartyPopper,
  Zap,
  Target,
  Hash,
  Globe,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CrewMember {
  id: string;
  name: string;
  avatar: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  matchPercentage: number;
  verified: boolean;
  favoriteEvents: string[];
  languages: string[];
  socialStyle: "introvert" | "ambivert" | "extrovert";
  availability: string[];
}

interface CrewGroup {
  id: string;
  name: string;
  description: string;
  members: CrewMember[];
  event: {
    id: string;
    name: string;
    date: string;
    location: string;
  };
  maxSize: number;
  tags: string[];
  isPublic: boolean;
  chatEnabled: boolean;
}

const FindYourCrew = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("discover");
  const [ageRange, setAgeRange] = useState([21, 35]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for potential crew members
  const potentialMatches: CrewMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      age: 28,
      location: "Westlands, Nairobi",
      bio: "Jazz enthusiast, foodie, and adventure seeker. Love discovering hidden gems in the city!",
      interests: ["Music", "Food", "Art", "Travel"],
      matchPercentage: 92,
      verified: true,
      favoriteEvents: ["Jazz Nights", "Food Festivals", "Art Exhibitions"],
      languages: ["English", "Mandarin", "Swahili"],
      socialStyle: "extrovert",
      availability: ["Weekends", "Friday evenings"]
    },
    {
      id: "2",
      name: "Mike Johnson",
      avatar: "/placeholder.svg",
      age: 25,
      location: "Kilimani, Nairobi",
      bio: "Tech guy by day, party animal by night. Always up for concerts and club nights!",
      interests: ["Music", "Tech", "Nightlife", "Gaming"],
      matchPercentage: 85,
      verified: true,
      favoriteEvents: ["Concerts", "Tech Meetups", "Gaming Tournaments"],
      languages: ["English", "French"],
      socialStyle: "ambivert",
      availability: ["Weekends", "Weekday evenings"]
    },
    {
      id: "3",
      name: "Emma Williams",
      avatar: "/placeholder.svg",
      age: 30,
      location: "Karen, Nairobi",
      bio: "Yoga instructor and wellness advocate. Love outdoor events and mindful experiences.",
      interests: ["Wellness", "Nature", "Yoga", "Meditation"],
      matchPercentage: 78,
      verified: false,
      favoriteEvents: ["Yoga Sessions", "Nature Walks", "Wellness Retreats"],
      languages: ["English", "Spanish"],
      socialStyle: "introvert",
      availability: ["Weekend mornings", "Weekday mornings"]
    },
    {
      id: "4",
      name: "David Kamau",
      avatar: "/placeholder.svg",
      age: 32,
      location: "Lavington, Nairobi",
      bio: "Sports fanatic and craft beer connoisseur. Weekend warrior seeking adventure buddies!",
      interests: ["Sports", "Beer", "Adventure", "Photography"],
      matchPercentage: 88,
      verified: true,
      favoriteEvents: ["Sports Events", "Beer Tastings", "Hiking Trips"],
      languages: ["English", "Swahili", "German"],
      socialStyle: "extrovert",
      availability: ["Weekends", "Public holidays"]
    }
  ];

  // Mock data for existing crew groups
  const existingGroups: CrewGroup[] = [
    {
      id: "1",
      name: "Jazz Night Crew",
      description: "Regular group for monthly jazz nights at Blue Note",
      members: potentialMatches.slice(0, 3),
      event: {
        id: "event-1",
        name: "Jazz Night at Blue Note",
        date: "Dec 15, 2024",
        location: "Blue Note, Westlands"
      },
      maxSize: 6,
      tags: ["Music", "Jazz", "Nightlife"],
      isPublic: true,
      chatEnabled: true
    },
    {
      id: "2",
      name: "Foodie Adventures",
      description: "Exploring Nairobi's culinary scene one restaurant at a time",
      members: potentialMatches.slice(1, 3),
      event: {
        id: "event-2",
        name: "Street Food Festival",
        date: "Dec 20, 2024",
        location: "Karura Forest"
      },
      maxSize: 8,
      tags: ["Food", "Social", "Weekend"],
      isPublic: true,
      chatEnabled: true
    }
  ];

  const interestCategories = [
    { icon: Music, label: "Music", color: "bg-purple-500" },
    { icon: Utensils, label: "Food", color: "bg-orange-500" },
    { icon: Palette, label: "Art", color: "bg-pink-500" },
    { icon: Dumbbell, label: "Sports", color: "bg-green-500" },
    { icon: Gamepad2, label: "Gaming", color: "bg-blue-500" },
    { icon: Camera, label: "Photography", color: "bg-indigo-500" },
    { icon: BookOpen, label: "Literature", color: "bg-yellow-500" },
    { icon: Plane, label: "Travel", color: "bg-cyan-500" },
    { icon: PartyPopper, label: "Nightlife", color: "bg-red-500" },
    { icon: Coffee, label: "Coffee", color: "bg-brown-500" }
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSendCrewRequest = (member: CrewMember) => {
    toast({
      title: "Crew request sent! 🎉",
      description: `Your request has been sent to ${member.name}. They'll be notified.`,
    });
  };

  const handleJoinGroup = (group: CrewGroup) => {
    toast({
      title: "Joined crew! 🚀",
      description: `You've joined "${group.name}". Start chatting with your crew!`,
    });
    navigate('/chat');
  };

  const handleCreateCrew = () => {
    navigate('/create-crew');
  };

  const filteredMatches = potentialMatches.filter(match => {
    if (onlyVerified && !match.verified) return false;
    if (selectedInterests.length > 0) {
      const hasCommonInterest = match.interests.some(interest =>
        selectedInterests.includes(interest)
      );
      if (!hasCommonInterest) return false;
    }
    if (searchQuery && !match.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <Layout>
      <SEO 
        title="Find Your Crew - Connect with Event Buddies | Sypot" 
        description="Find like-minded people to attend events with. Build your crew and never go alone!"
        canonical="/find-your-crew"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              New Feature
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Crew
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Never attend events alone! Connect with like-minded people and build your perfect event crew.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>500+ Active Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>2,000+ Connections Made</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discover">
              <Users className="h-4 w-4 mr-2" />
              Discover People
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Target className="h-4 w-4 mr-2" />
              Join Groups
            </TabsTrigger>
            <TabsTrigger value="my-crew">
              <Heart className="h-4 w-4 mr-2" />
              My Crew
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Search */}
                    <div>
                      <Label htmlFor="search">Search by name</Label>
                      <Input
                        id="search"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    {/* Age Range */}
                    <div>
                      <Label>Age Range: {ageRange[0]} - {ageRange[1]}</Label>
                      <div className="mt-2 px-2">
                        <Slider
                          value={ageRange}
                          onValueChange={setAgeRange}
                          max={50}
                          min={18}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Distance */}
                    <div>
                      <Label>Max Distance: {maxDistance}km</Label>
                      <div className="mt-2 px-2">
                        <Slider
                          value={[maxDistance]}
                          onValueChange={(v) => setMaxDistance(v[0])}
                          max={50}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <Label>Interests</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {interestCategories.slice(0, 6).map((interest) => (
                          <Button
                            key={interest.label}
                            variant={selectedInterests.includes(interest.label) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleInterestToggle(interest.label)}
                            className="justify-start"
                          >
                            <interest.icon className="h-3 w-3 mr-1" />
                            {interest.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Verified Only */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verified">Verified only</Label>
                      <Switch
                        id="verified"
                        checked={onlyVerified}
                        onCheckedChange={setOnlyVerified}
                      />
                    </div>

                    <Button variant="outline" className="w-full" onClick={() => {
                      setAgeRange([21, 35]);
                      setMaxDistance(10);
                      setSelectedInterests([]);
                      setOnlyVerified(false);
                      setSearchQuery("");
                    }}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* People Grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Potential Crew Members</h2>
                  <Button onClick={handleCreateCrew}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Crew
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMatches.map((member) => (
                    <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">{member.name}</CardTitle>
                                {member.verified && (
                                  <Badge variant="secondary" className="h-5">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {member.location} • {member.age} years
                              </CardDescription>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {member.matchPercentage}%
                            </div>
                            <p className="text-xs text-muted-foreground">match</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">{member.bio}</p>
                        
                        {/* Interests */}
                        <div className="flex flex-wrap gap-2">
                          {member.interests.map((interest) => (
                            <Badge key={interest} variant="outline">
                              {interest}
                            </Badge>
                          ))}
                        </div>

                        {/* Social Style */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Social Style:</span>
                          <Badge variant="secondary">
                            {member.socialStyle === "introvert" && "🌙 Introvert"}
                            {member.socialStyle === "ambivert" && "⚖️ Ambivert"}
                            {member.socialStyle === "extrovert" && "☀️ Extrovert"}
                          </Badge>
                        </div>

                        {/* Languages */}
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{member.languages.join(", ")}</span>
                        </div>

                        {/* Availability */}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{member.availability.join(", ")}</span>
                        </div>

                        {/* Favorite Events */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Favorite Events:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.favoriteEvents.map((event) => (
                              <Badge key={event} variant="secondary" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button 
                          className="flex-1"
                          onClick={() => handleSendCrewRequest(member)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Send Request
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {filteredMatches.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No matches found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters to find more potential crew members
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Join Existing Crews</h2>
              <Button onClick={handleCreateCrew}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create New Group
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {existingGroups.map((group) => (
                <Card key={group.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                      {group.isPublic ? (
                        <Badge variant="secondary">Public</Badge>
                      ) : (
                        <Badge variant="outline">Private</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Event Info */}
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium text-sm mb-1">{group.event.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {group.event.date}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {group.event.location}
                      </p>
                    </div>

                    {/* Members */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Members</span>
                        <span className="text-sm text-muted-foreground">
                          {group.members.length}/{group.maxSize}
                        </span>
                      </div>
                      <div className="flex -space-x-2">
                        {group.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members.length > 5 && (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            +{group.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Hash className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {group.chatEnabled && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Chat enabled
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Verified members
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => handleJoinGroup(group)}
                      disabled={group.members.length >= group.maxSize}
                    >
                      {group.members.length >= group.maxSize ? "Group Full" : "Join Crew"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-crew" className="space-y-6">
            {!user ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sign in to view your crew</h3>
                  <p className="text-muted-foreground mb-4">
                    Create an account to start building your event crew
                  </p>
                  <Button onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">12</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Crew Members</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Calendar className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">8</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Events Attended</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">95%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Crew Rating</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pro Tip:</strong> The more complete your profile, the better matches you'll get! 
                    Add your interests and availability to find your perfect crew.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Crew Members</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {potentialMatches.slice(0, 3).map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Connected 2 weeks ago
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              Invite
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FindYourCrew;
