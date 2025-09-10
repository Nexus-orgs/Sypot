import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Video,
  Users,
  MessageSquare,
  Heart,
  Send,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Maximize,
  Volume2,
  Settings,
  Gift,
  Star,
  ThumbsUp,
  Clock,
  Calendar,
  Globe,
  Wifi,
  WifiOff,
  AlertCircle,
  Play,
  Pause,
  SkipForward,
  Eye,
  Award,
  Sparkles,
  Camera,
  Monitor,
  Smartphone,
  Headphones,
  Bell,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface VirtualEvent {
  id: string;
  title: string;
  host: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  status: "upcoming" | "live" | "ended";
  startTime: string;
  duration: string;
  viewers: number;
  category: string;
  description: string;
  thumbnail: string;
  streamUrl?: string;
  price: number;
  features: string[];
  maxViewers?: number;
  recordingAvailable: boolean;
}

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    badge?: string;
  };
  message: string;
  timestamp: string;
  type: "message" | "gift" | "join" | "reaction";
  giftAmount?: number;
}

interface StreamReaction {
  emoji: string;
  count: number;
  animated: boolean;
}

const VirtualEvents = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [selectedEvent, setSelectedEvent] = useState<VirtualEvent | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [reactions, setReactions] = useState<StreamReaction[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "theater" | "fullscreen">("grid");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [streamQuality, setStreamQuality] = useState<"auto" | "1080p" | "720p" | "480p">("auto");
  const [viewerCount, setViewerCount] = useState(0);

  // Mock virtual events
  const virtualEvents: VirtualEvent[] = [
    {
      id: "1",
      title: "Live Jazz Concert from New York",
      host: {
        name: "Blue Note Jazz Club",
        avatar: "/placeholder.svg",
        verified: true
      },
      status: "live",
      startTime: "8:00 PM",
      duration: "2 hours",
      viewers: 1247,
      category: "Music",
      description: "Experience world-class jazz from the comfort of your home",
      thumbnail: "/placeholder.svg",
      price: 500,
      features: ["HD Stream", "Live Chat", "Recording Available", "Multi-camera"],
      recordingAvailable: true
    },
    {
      id: "2",
      title: "Virtual Cooking Masterclass: Italian Cuisine",
      host: {
        name: "Chef Marco Romano",
        avatar: "/placeholder.svg",
        verified: true
      },
      status: "upcoming",
      startTime: "Dec 25, 6:00 PM",
      duration: "90 minutes",
      viewers: 0,
      category: "Cooking",
      description: "Learn authentic Italian recipes from a Michelin star chef",
      thumbnail: "/placeholder.svg",
      price: 1500,
      features: ["Interactive Q&A", "Recipe PDF", "Small Group", "Replay Access"],
      maxViewers: 50,
      recordingAvailable: true
    },
    {
      id: "3",
      title: "Virtual Yoga & Meditation Session",
      host: {
        name: "Wellness Studio",
        avatar: "/placeholder.svg",
        verified: false
      },
      status: "live",
      startTime: "7:00 AM",
      duration: "1 hour",
      viewers: 234,
      category: "Wellness",
      description: "Start your day with mindful movement and meditation",
      thumbnail: "/placeholder.svg",
      price: 0,
      features: ["Free Event", "Beginner Friendly", "No Equipment"],
      recordingAvailable: false
    },
    {
      id: "4",
      title: "Comedy Night: Stand-up Special",
      host: {
        name: "Laugh Factory",
        avatar: "/placeholder.svg",
        verified: true
      },
      status: "upcoming",
      startTime: "Dec 26, 9:00 PM",
      duration: "2 hours",
      viewers: 0,
      category: "Entertainment",
      description: "Featured comedians from around the world",
      thumbnail: "/placeholder.svg",
      price: 800,
      features: ["Multiple Performers", "Interactive Polls", "VIP Meet & Greet"],
      recordingAvailable: true
    },
    {
      id: "5",
      title: "Virtual Art Gallery Tour",
      host: {
        name: "National Museum",
        avatar: "/placeholder.svg",
        verified: true
      },
      status: "ended",
      startTime: "Dec 20, 3:00 PM",
      duration: "1 hour",
      viewers: 567,
      category: "Art",
      description: "Exclusive tour of the latest contemporary art exhibition",
      thumbnail: "/placeholder.svg",
      price: 300,
      features: ["360° View", "Expert Commentary", "Download Materials"],
      recordingAvailable: true
    }
  ];

  // Mock chat messages
  const mockChatMessages: ChatMessage[] = [
    {
      id: "1",
      user: { name: "Sarah K.", avatar: "/placeholder.svg", badge: "VIP" },
      message: "This is amazing! Best virtual concert ever 🎵",
      timestamp: "2 min ago",
      type: "message"
    },
    {
      id: "2",
      user: { name: "Mike J.", avatar: "/placeholder.svg" },
      message: "Just joined! Hey everyone 👋",
      timestamp: "1 min ago",
      type: "join"
    },
    {
      id: "3",
      user: { name: "Emma W.", avatar: "/placeholder.svg", badge: "Supporter" },
      message: "Sent a gift",
      timestamp: "30 sec ago",
      type: "gift",
      giftAmount: 500
    }
  ];

  useEffect(() => {
    // Simulate real-time viewer count updates
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 3);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  useEffect(() => {
    // Load mock chat messages when streaming starts
    if (isStreaming && selectedEvent) {
      setChatMessages(mockChatMessages);
      setViewerCount(selectedEvent.viewers);
    }
  }, [isStreaming, selectedEvent]);

  const handleJoinEvent = (event: VirtualEvent) => {
    if (event.status === "ended") {
      toast({
        title: "Event Ended",
        description: "This event has ended. Recording may be available.",
        variant: "destructive"
      });
      return;
    }

    if (event.status === "upcoming") {
      toast({
        title: "Event Not Started",
        description: `This event starts at ${event.startTime}`,
      });
      // Set reminder
      return;
    }

    setSelectedEvent(event);
    setIsStreaming(true);
    
    toast({
      title: "Joined Virtual Event! 🎉",
      description: `You're now watching ${event.title}`,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: profile?.display_name || "You",
        avatar: profile?.avatar_url || "/placeholder.svg"
      },
      message: chatMessage,
      timestamp: "Just now",
      type: "message"
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage("");
  };

  const handleReaction = (emoji: string) => {
    setReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        return prev.map(r => 
          r.emoji === emoji 
            ? { ...r, count: r.count + 1, animated: true }
            : r
        );
      }
      return [...prev, { emoji, count: 1, animated: true }];
    });

    // Remove animation after 1 second
    setTimeout(() => {
      setReactions(prev => prev.map(r => ({ ...r, animated: false })));
    }, 1000);
  };

  const handleSendGift = (amount: number) => {
    const giftMessage: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: profile?.display_name || "You",
        avatar: profile?.avatar_url || "/placeholder.svg",
        badge: "Supporter"
      },
      message: "Sent a gift",
      timestamp: "Just now",
      type: "gift",
      giftAmount: amount
    };

    setChatMessages(prev => [...prev, giftMessage]);
    
    toast({
      title: "Gift Sent! 🎁",
      description: `You sent KES ${amount} to support the host`,
    });
  };

  const handleDownloadRecording = (event: VirtualEvent) => {
    if (!event.recordingAvailable) {
      toast({
        title: "Recording Not Available",
        description: "This event doesn't offer recordings",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download Started",
      description: "Your recording is being prepared for download",
    });
  };

  return (
    <Layout>
      <SEO 
        title="Virtual Events - Stream Live Events | Sypot" 
        description="Join virtual events from anywhere. Stream concerts, workshops, and more."
        canonical="/virtual-events"
      />
      
      {!isStreaming ? (
        <>
          {/* Virtual Events Listing */}
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Virtual Events</h1>
                  <p className="text-muted-foreground">
                    Join live events from anywhere in the world
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminders
                  </Button>
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Host Event
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Live Now</p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-red-500 animate-pulse flex items-center justify-center">
                        <div className="h-3 w-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Upcoming</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Viewers</p>
                        <p className="text-2xl font-bold">2.4K</p>
                      </div>
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-2xl font-bold">24/7</p>
                      </div>
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="live">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    Live Now
                  </div>
                </TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="recorded">Recordings</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {virtualEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                          {event.status === "live" && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                              <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                              LIVE
                            </div>
                          )}
                          {event.status === "upcoming" && (
                            <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                              UPCOMING
                            </div>
                          )}
                          {event.status === "ended" && event.recordingAvailable && (
                            <div className="absolute top-3 left-3 bg-gray-500 text-white px-2 py-1 rounded-md text-xs">
                              RECORDED
                            </div>
                          )}
                          {event.viewers > 0 && (
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                              <Eye className="h-3 w-3" />
                              {event.viewers}
                            </div>
                          )}
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                            <CardDescription className="mt-1">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={event.host.avatar} />
                                  <AvatarFallback>{event.host.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{event.host.name}</span>
                                {event.host.verified && (
                                  <Badge variant="secondary" className="h-4">
                                    <Award className="h-3 w-3" />
                                  </Badge>
                                )}
                              </div>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{event.duration}</span>
                          </div>
                          <div className="font-medium">
                            {event.price === 0 ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                FREE
                              </Badge>
                            ) : (
                              <span>KES {event.price}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {event.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-2">
                        {event.status === "live" ? (
                          <Button className="flex-1" onClick={() => handleJoinEvent(event)}>
                            <Play className="h-4 w-4 mr-2" />
                            Join Now
                          </Button>
                        ) : event.status === "upcoming" ? (
                          <>
                            <Button className="flex-1" variant="outline">
                              <Bell className="h-4 w-4 mr-2" />
                              Remind Me
                            </Button>
                            <Button className="flex-1">
                              Book Ticket
                            </Button>
                          </>
                        ) : event.recordingAvailable ? (
                          <Button 
                            className="flex-1" 
                            variant="outline"
                            onClick={() => handleDownloadRecording(event)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Watch Recording
                          </Button>
                        ) : (
                          <Button className="flex-1" disabled>
                            Event Ended
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : (
        <>
          {/* Virtual Event Stream View */}
          <div className="h-screen flex flex-col bg-black">
            {/* Stream Header */}
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsStreaming(false)}
                  className="text-white hover:text-white hover:bg-gray-800"
                >
                  ← Exit
                </Button>
                <div>
                  <h2 className="font-semibold">{selectedEvent?.title}</h2>
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    {viewerCount} watching
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="text-white hover:text-white hover:bg-gray-800"
                >
                  {audioEnabled ? <Volume2 className="h-5 w-5" /> : <Volume2 className="h-5 w-5 text-red-500" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className="text-white hover:text-white hover:bg-gray-800"
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-gray-800"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-gray-800"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex">
              {/* Video Stream */}
              <div className="flex-1 relative bg-gray-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                
                {/* Mock video player */}
                <div className="text-white text-center z-10">
                  <Monitor className="h-32 w-32 mx-auto mb-4 opacity-50" />
                  <p className="text-xl mb-2">Stream Loading...</p>
                  <p className="text-sm text-gray-400">High Quality • {streamQuality}</p>
                </div>

                {/* Reaction overlay */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {["❤️", "👏", "🎉", "🔥", "😍"].map((emoji) => (
                    <Button
                      key={emoji}
                      size="sm"
                      variant="secondary"
                      className="bg-black/50 hover:bg-black/70 text-xl"
                      onClick={() => handleReaction(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>

                {/* Floating reactions */}
                <div className="absolute bottom-20 right-4 space-y-2">
                  {reactions.map((reaction, idx) => (
                    <div
                      key={idx}
                      className={`text-3xl ${reaction.animated ? "animate-bounce" : ""}`}
                    >
                      {reaction.emoji} x{reaction.count}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Sidebar */}
              <div className="w-80 bg-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-semibold">Live Chat</h3>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="text-white">
                        {msg.type === "gift" ? (
                          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <Gift className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">{msg.user.name}</span>
                              {msg.user.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {msg.user.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm mt-1">
                              Sent KES {msg.giftAmount} gift! 🎁
                            </p>
                          </div>
                        ) : msg.type === "join" ? (
                          <div className="text-green-400 text-sm">
                            <span className="font-medium">{msg.user.name}</span> joined
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={msg.user.avatar} />
                                <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{msg.user.name}</span>
                              {msg.user.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {msg.user.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm ml-8 text-gray-300">{msg.message}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2 mb-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendGift(100)}
                      className="flex-1"
                    >
                      <Gift className="h-4 w-4 mr-1" />
                      100
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendGift(500)}
                      className="flex-1"
                    >
                      <Gift className="h-4 w-4 mr-1" />
                      500
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendGift(1000)}
                      className="flex-1"
                    >
                      <Gift className="h-4 w-4 mr-1" />
                      1K
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default VirtualEvents;