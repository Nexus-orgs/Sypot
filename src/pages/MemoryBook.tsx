import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Heart,
  Share2,
  Download,
  Edit,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Users,
  Star,
  MessageSquare,
  Image as ImageIcon,
  Film,
  Music,
  Sparkles,
  BookOpen,
  Lock,
  Globe,
  Clock,
  Tag,
  Smile,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Memory {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  photos: Photo[];
  videos: Video[];
  notes: string;
  rating: number;
  crew: CrewMember[];
  highlights: string[];
  mood: string;
  isPublic: boolean;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
  taggedPeople: string[];
  timestamp: string;
}

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  duration: string;
  caption: string;
}

interface CrewMember {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
}

const MemoryBook = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newMemoryData, setNewMemoryData] = useState({
    eventTitle: "",
    notes: "",
    rating: 5,
    mood: "happy",
    isPublic: true,
    highlights: [] as string[],
    photos: [] as Photo[]
  });

  // Mock memories data
  const memories: Memory[] = [
    {
      id: "1",
      eventId: "event-1",
      eventTitle: "Jazz Night at Blue Note",
      eventDate: "Dec 15, 2024",
      location: "Blue Note, Westlands",
      photos: [
        {
          id: "p1",
          url: "/placeholder.svg",
          caption: "Amazing performance!",
          taggedPeople: ["Sarah", "Mike"],
          timestamp: "8:30 PM"
        },
        {
          id: "p2",
          url: "/placeholder.svg",
          caption: "The crew vibing",
          taggedPeople: ["Emma", "David"],
          timestamp: "9:15 PM"
        }
      ],
      videos: [
        {
          id: "v1",
          url: "/placeholder.svg",
          thumbnail: "/placeholder.svg",
          duration: "0:45",
          caption: "Best solo of the night"
        }
      ],
      notes: "Incredible night! The saxophone solo was mind-blowing. Met some amazing people and the atmosphere was electric.",
      rating: 5,
      crew: [
        { id: "1", name: "Sarah Chen", avatar: "/placeholder.svg" },
        { id: "2", name: "Mike Johnson", avatar: "/placeholder.svg" }
      ],
      highlights: ["Live Jazz", "Great Company", "Perfect Weather"],
      mood: "ecstatic",
      isPublic: true,
      likes: 42,
      comments: [
        {
          id: "c1",
          user: { name: "Emma W.", avatar: "/placeholder.svg" },
          message: "Looks like you had an amazing time! 🎷",
          timestamp: "2 hours ago"
        }
      ],
      createdAt: "Dec 16, 2024"
    },
    {
      id: "2",
      eventId: "event-2",
      eventTitle: "Street Food Festival",
      eventDate: "Dec 10, 2024",
      location: "Karura Forest",
      photos: [
        {
          id: "p3",
          url: "/placeholder.svg",
          caption: "So much delicious food!",
          taggedPeople: ["John"],
          timestamp: "2:00 PM"
        }
      ],
      videos: [],
      notes: "Tried foods from 12 different countries. The Thai street food was exceptional!",
      rating: 4,
      crew: [
        { id: "3", name: "John Doe", avatar: "/placeholder.svg" }
      ],
      highlights: ["International Cuisine", "Outdoor Setting", "Family Friendly"],
      mood: "happy",
      isPublic: true,
      likes: 28,
      comments: [],
      createdAt: "Dec 11, 2024"
    },
    {
      id: "3",
      eventId: "event-3",
      eventTitle: "Rooftop Yoga Session",
      eventDate: "Dec 5, 2024",
      location: "Sankara Hotel",
      photos: [
        {
          id: "p4",
          url: "/placeholder.svg",
          caption: "Sunrise meditation",
          taggedPeople: [],
          timestamp: "6:30 AM"
        }
      ],
      videos: [],
      notes: "Started the day with peaceful meditation and yoga. The sunrise view was breathtaking.",
      rating: 5,
      crew: [],
      highlights: ["Sunrise", "Meditation", "City Views"],
      mood: "peaceful",
      isPublic: false,
      likes: 15,
      comments: [],
      createdAt: "Dec 5, 2024"
    }
  ];

  const moods = [
    { value: "happy", emoji: "😊", label: "Happy" },
    { value: "ecstatic", emoji: "🤩", label: "Ecstatic" },
    { value: "peaceful", emoji: "😌", label: "Peaceful" },
    { value: "excited", emoji: "🎉", label: "Excited" },
    { value: "grateful", emoji: "🙏", label: "Grateful" },
    { value: "inspired", emoji: "✨", label: "Inspired" }
  ];

  const handleCreateMemory = () => {
    setIsCreating(true);
  };

  const handleSaveMemory = () => {
    // Save memory logic
    toast({
      title: "Memory Saved! 📸",
      description: "Your event memory has been added to your book",
    });
    setIsCreating(false);
    setNewMemoryData({
      eventTitle: "",
      notes: "",
      rating: 5,
      mood: "happy",
      isPublic: true,
      highlights: [],
      photos: []
    });
  };

  const handleDeleteMemory = (memoryId: string) => {
    toast({
      title: "Memory Deleted",
      description: "The memory has been removed from your book",
    });
  };

  const handleShareMemory = (memory: Memory) => {
    // Share logic
    toast({
      title: "Shared!",
      description: "Memory link copied to clipboard",
    });
  };

  const handleDownloadMemory = (memory: Memory) => {
    // Download as PDF or album
    toast({
      title: "Download Started",
      description: "Your memory album is being prepared",
    });
  };

  const handleLikeMemory = (memory: Memory) => {
    toast({
      title: "Liked! ❤️",
      description: "You liked this memory",
    });
  };

  const getFilteredMemories = () => {
    if (filterCategory === "all") return memories;
    if (filterCategory === "public") return memories.filter(m => m.isPublic);
    if (filterCategory === "private") return memories.filter(m => !m.isPublic);
    if (filterCategory === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return memories.filter(m => new Date(m.createdAt) > oneWeekAgo);
    }
    return memories;
  };

  const stats = {
    totalMemories: memories.length,
    totalPhotos: memories.reduce((acc, m) => acc + m.photos.length, 0),
    totalVideos: memories.reduce((acc, m) => acc + m.videos.length, 0),
    eventsAttended: new Set(memories.map(m => m.eventId)).size
  };

  return (
    <Layout>
      <SEO 
        title="Memory Book - Your Event Memories | Sypot" 
        description="Create beautiful memories from your events. Save photos, videos, and stories."
        canonical="/memory-book"
      />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="h-3 w-3 mr-1" />
              Memory Book
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Event Memories
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Capture and relive the best moments from your events
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{stats.totalMemories}</div>
                  <p className="text-sm text-muted-foreground">Memories</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{stats.totalPhotos}</div>
                  <p className="text-sm text-muted-foreground">Photos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{stats.totalVideos}</div>
                  <p className="text-sm text-muted-foreground">Videos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{stats.eventsAttended}</div>
                  <p className="text-sm text-muted-foreground">Events</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              onClick={() => setFilterCategory("all")}
            >
              All
            </Button>
            <Button
              variant={filterCategory === "recent" ? "default" : "outline"}
              onClick={() => setFilterCategory("recent")}
            >
              Recent
            </Button>
            <Button
              variant={filterCategory === "public" ? "default" : "outline"}
              onClick={() => setFilterCategory("public")}
            >
              <Globe className="h-4 w-4 mr-2" />
              Public
            </Button>
            <Button
              variant={filterCategory === "private" ? "default" : "outline"}
              onClick={() => setFilterCategory("private")}
            >
              <Lock className="h-4 w-4 mr-2" />
              Private
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "timeline" : "grid")}
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            <Button onClick={handleCreateMemory}>
              <Plus className="h-4 w-4 mr-2" />
              Create Memory
            </Button>
          </div>
        </div>

        {/* Create Memory Form */}
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Memory</CardTitle>
              <CardDescription>Add photos and details from your recent event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Event Title</label>
                <Input
                  placeholder="e.g., Jazz Night at Blue Note"
                  value={newMemoryData.eventTitle}
                  onChange={(e) => setNewMemoryData({...newMemoryData, eventTitle: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Notes & Stories</label>
                <Textarea
                  placeholder="Share your experience..."
                  value={newMemoryData.notes}
                  onChange={(e) => setNewMemoryData({...newMemoryData, notes: e.target.value})}
                  rows={4}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">How was your mood?</label>
                <div className="flex gap-2 mt-2">
                  {moods.map((mood) => (
                    <Button
                      key={mood.value}
                      variant={newMemoryData.mood === mood.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewMemoryData({...newMemoryData, mood: mood.value})}
                    >
                      <span className="mr-1">{mood.emoji}</span>
                      {mood.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Rating</label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      onClick={() => setNewMemoryData({...newMemoryData, rating: star})}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= newMemoryData.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Add Photos/Videos</label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMemory}>
                <Sparkles className="h-4 w-4 mr-2" />
                Save Memory
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Memories Grid/Timeline */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredMemories().map((memory) => (
              <Card key={memory.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Cover Photo */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  {memory.photos.length > 0 && (
                    <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                      {memory.photos.slice(0, 4).map((photo, idx) => (
                        <div
                          key={photo.id}
                          className={`bg-muted ${
                            memory.photos.length === 1 ? "col-span-2 row-span-2" :
                            memory.photos.length === 2 ? "row-span-2" :
                            memory.photos.length === 3 && idx === 0 ? "row-span-2" :
                            ""
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Privacy Badge */}
                  <Badge className="absolute top-3 right-3 bg-black/50 text-white">
                    {memory.isPublic ? (
                      <>
                        <Globe className="h-3 w-3 mr-1" />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </>
                    )}
                  </Badge>
                  
                  {/* Media Count */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {memory.photos.length > 0 && (
                      <Badge className="bg-black/50 text-white">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {memory.photos.length}
                      </Badge>
                    )}
                    {memory.videos.length > 0 && (
                      <Badge className="bg-black/50 text-white">
                        <Film className="h-3 w-3 mr-1" />
                        {memory.videos.length}
                      </Badge>
                    )}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{memory.eventTitle}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" />
                      {memory.eventDate}
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      {memory.location}
                    </div>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm line-clamp-2">{memory.notes}</p>
                  
                  {/* Mood & Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {moods.find(m => m.value === memory.mood)?.emoji}
                      <span className="text-sm capitalize">{memory.mood}</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < memory.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  {memory.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {memory.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Crew */}
                  {memory.crew.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="flex -space-x-2">
                        {memory.crew.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                        {memory.crew.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            +{memory.crew.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Engagement */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <button
                        onClick={() => handleLikeMemory(memory)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        {memory.likes}
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {memory.comments.length}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleShareMemory(memory)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDownloadMemory(memory)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteMemory(memory.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Timeline View
          <div className="space-y-8">
            {getFilteredMemories().map((memory, index) => (
              <div key={memory.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index < getFilteredMemories().length - 1 && (
                    <div className="w-0.5 bg-border flex-1 mt-2" />
                  )}
                </div>
                
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{memory.eventTitle}</CardTitle>
                        <CardDescription>
                          {memory.eventDate} • {memory.location}
                        </CardDescription>
                      </div>
                      <Badge variant={memory.isPublic ? "default" : "secondary"}>
                        {memory.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{memory.notes}</p>
                    
                    {memory.photos.length > 0 && (
                      <div className="flex gap-2 mb-4 overflow-x-auto">
                        {memory.photos.map((photo) => (
                          <div key={photo.id} className="h-20 w-20 bg-muted rounded flex-shrink-0" />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-sm">
                          <Heart className="h-4 w-4" />
                          {memory.likes}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          <MessageSquare className="h-4 w-4" />
                          {memory.comments.length}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {getFilteredMemories().length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No memories yet</h3>
              <p className="text-muted-foreground mb-4">
                Start creating memories from your events
              </p>
              <Button onClick={handleCreateMemory}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Memory
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MemoryBook;
