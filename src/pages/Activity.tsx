import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Heart, MapPin, MessageCircle, Share2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

interface Activity {
  id: string;
  type: 'event_attendance' | 'friend_activity' | 'crew_joined' | 'memory_shared' | 'achievement' | 'review';
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  timestamp: string;
  content: {
    title: string;
    description?: string;
    image?: string;
    location?: string;
    date?: string;
    attendees?: number;
    rating?: number;
    achievement?: string;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  isLiked?: boolean;
}

const Activity = () => {
  const [filter, setFilter] = useState<'all' | 'friends' | 'following'>('all');
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      type: 'event_attendance',
      user: {
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/v2/avataaars/sarah.svg',
        username: '@sarahc'
      },
      timestamp: '2 hours ago',
      content: {
        title: 'Attending "Afrobeat Night at The Vault"',
        description: 'Can\'t wait for this weekend! Who else is going?',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
        location: 'The Vault, Westlands',
        date: 'This Saturday, 9 PM',
        attendees: 245
      },
      engagement: {
        likes: 34,
        comments: 12,
        shares: 5
      },
      isLiked: true
    },
    {
      id: '2',
      type: 'crew_joined',
      user: {
        name: 'Mike Omondi',
        avatar: 'https://api.dicebear.com/v2/avataaars/mike.svg',
        username: '@mikeo'
      },
      timestamp: '4 hours ago',
      content: {
        title: 'Joined "Nairobi Foodies Crew"',
        description: 'Found my tribe! 🍔 Ready to explore the best restaurants in town',
        attendees: 89
      },
      engagement: {
        likes: 23,
        comments: 8,
        shares: 2
      }
    },
    {
      id: '3',
      type: 'memory_shared',
      user: {
        name: 'Lisa Kamau',
        avatar: 'https://api.dicebear.com/v2/avataaars/lisa.svg',
        username: '@lisakamau'
      },
      timestamp: '6 hours ago',
      content: {
        title: 'Shared memories from "Blankets & Wine"',
        description: 'What an amazing Sunday! The vibes were immaculate 🎵',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
        location: 'Ngong Racecourse',
        rating: 5
      },
      engagement: {
        likes: 156,
        comments: 34,
        shares: 12
      },
      isLiked: true
    },
    {
      id: '4',
      type: 'achievement',
      user: {
        name: 'David Njoroge',
        avatar: 'https://api.dicebear.com/v2/avataaars/david.svg',
        username: '@dnjoroge'
      },
      timestamp: '8 hours ago',
      content: {
        title: 'Earned "Social Butterfly" badge',
        description: 'Attended 10 events this month!',
        achievement: '🦋 Social Butterfly'
      },
      engagement: {
        likes: 45,
        comments: 15,
        shares: 0
      }
    },
    {
      id: '5',
      type: 'review',
      user: {
        name: 'Grace Wanjiru',
        avatar: 'https://api.dicebear.com/v2/avataaars/grace.svg',
        username: '@gracew'
      },
      timestamp: '12 hours ago',
      content: {
        title: 'Reviewed "Comedy Night at Alliance Française"',
        description: 'Hilarious show! Churchill never disappoints. The venue was perfect and the crowd was amazing.',
        location: 'Alliance Française',
        rating: 4
      },
      engagement: {
        likes: 67,
        comments: 19,
        shares: 8
      }
    },
    {
      id: '6',
      type: 'friend_activity',
      user: {
        name: 'James Mwangi',
        avatar: 'https://api.dicebear.com/v2/avataaars/james.svg',
        username: '@jmwangi'
      },
      timestamp: '1 day ago',
      content: {
        title: 'Is now friends with 5 people',
        description: 'Connected with Sarah, Mike, Lisa, David, and Grace'
      },
      engagement: {
        likes: 12,
        comments: 3,
        shares: 0
      }
    }
  ]);

  const handleLike = (activityId: string) => {
    console.log('Liked activity:', activityId);
  };

  const handleComment = (activityId: string) => {
    console.log('Comment on activity:', activityId);
  };

  const handleShare = (activityId: string) => {
    console.log('Share activity:', activityId);
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'event_attendance':
        return <Calendar className="w-4 h-4" />;
      case 'crew_joined':
        return <Users className="w-4 h-4" />;
      case 'memory_shared':
        return <Heart className="w-4 h-4" />;
      case 'achievement':
        return <TrendingUp className="w-4 h-4" />;
      case 'review':
        return <MessageCircle className="w-4 h-4" />;
      case 'friend_activity':
        return <Users className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getActivityTypeLabel = (type: Activity['type']) => {
    switch (type) {
      case 'event_attendance':
        return 'Event';
      case 'crew_joined':
        return 'Crew';
      case 'memory_shared':
        return 'Memory';
      case 'achievement':
        return 'Achievement';
      case 'review':
        return 'Review';
      case 'friend_activity':
        return 'Friends';
      default:
        return '';
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'friends') return ['friend_activity', 'crew_joined'].includes(activity.type);
    if (filter === 'following') return activity.isLiked;
    return true;
  });

  return (
    <Layout>
      <SEO 
        title="Activity Feed | Sypot" 
        description="Stay updated with your friends' activities and discover what's happening around you on Sypot."
        canonical="/activity"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Activity Feed</h1>
            <p className="text-muted-foreground">Stay connected with what's happening in your social circle</p>
          </div>

          {/* Filters */}
          <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Activity</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-6 space-y-6">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                          <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{activity.user.name}</p>
                            <span className="text-sm text-muted-foreground">{activity.user.username}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {getActivityIcon(activity.type)}
                              <span className="ml-1">{getActivityTypeLabel(activity.type)}</span>
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardTitle className="text-lg mb-2">{activity.content.title}</CardTitle>
                    {activity.content.description && (
                      <CardDescription className="mb-3">{activity.content.description}</CardDescription>
                    )}

                    {activity.content.image && (
                      <div className="rounded-lg overflow-hidden mb-3">
                        <img 
                          src={activity.content.image} 
                          alt={activity.content.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      {activity.content.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activity.content.location}
                        </span>
                      )}
                      {activity.content.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {activity.content.date}
                        </span>
                      )}
                      {activity.content.attendees && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {activity.content.attendees} attending
                        </span>
                      )}
                      {activity.content.rating && (
                        <span className="flex items-center gap-1">
                          ⭐ {activity.content.rating}/5
                        </span>
                      )}
                      {activity.content.achievement && (
                        <Badge variant="default">{activity.content.achievement}</Badge>
                      )}
                    </div>

                    {/* Engagement Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-2 ${activity.isLiked ? 'text-red-500' : ''}`}
                          onClick={() => handleLike(activity.id)}
                        >
                          <Heart className={`w-4 h-4 ${activity.isLiked ? 'fill-current' : ''}`} />
                          {activity.engagement.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleComment(activity.id)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          {activity.engagement.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleShare(activity.id)}
                        >
                          <Share2 className="w-4 h-4" />
                          {activity.engagement.shares > 0 && activity.engagement.shares}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredActivities.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground mb-4">No activities to show</p>
                    <Button>Discover Events</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Load More */}
          {filteredActivities.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Activities
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Activity;
