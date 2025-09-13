import { useState } from "react";
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
  Trophy,
  Star,
  Gift,
  Zap,
  TrendingUp,
  Award,
  Crown,
  Gem,
  Target,
  Lock,
  Unlock,
  ChevronRight,
  Clock,
  Calendar,
  Ticket,
  Coffee,
  ShoppingBag,
  Percent,
  Users,
  Heart,
  Sparkles,
  Medal,
  Shield,
  Flame,
  DollarSign,
  ArrowUp,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  icon: any;
  expiresAt?: string;
  terms?: string[];
  isAvailable: boolean;
  quantity?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  points: number;
  progress: number;
  total: number;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface PointsActivity {
  id: string;
  description: string;
  points: number;
  timestamp: string;
  type: "earned" | "spent";
  icon: any;
}

interface Tier {
  name: string;
  minPoints: number;
  benefits: string[];
  icon: any;
  color: string;
}

const Rewards = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [userPoints] = useState(2750);
  const [userTier] = useState("gold");
  const [lifetimePoints] = useState(5420);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  // Loyalty Tiers
  const tiers: Tier[] = [
    {
      name: "Bronze",
      minPoints: 0,
      benefits: ["5% discount on events", "Early access to free events", "Birthday bonus"],
      icon: Medal,
      color: "bg-orange-500"
    },
    {
      name: "Silver",
      minPoints: 1000,
      benefits: ["10% discount on events", "Priority customer support", "Exclusive newsletter"],
      icon: Medal,
      color: "bg-gray-400"
    },
    {
      name: "Gold",
      minPoints: 2500,
      benefits: ["15% discount on events", "Free event upgrades", "VIP lounge access"],
      icon: Crown,
      color: "bg-yellow-500"
    },
    {
      name: "Platinum",
      minPoints: 5000,
      benefits: ["20% discount on events", "Complimentary drinks", "Personal event concierge"],
      icon: Gem,
      color: "bg-purple-500"
    }
  ];

  // Available Rewards
  const rewards: Reward[] = [
    {
      id: "1",
      title: "Free Event Ticket",
      description: "Get a free general admission ticket to any event",
      points: 1000,
      category: "tickets",
      icon: Ticket,
      expiresAt: "Dec 31, 2024",
      terms: ["Valid for events under KES 2000", "Cannot be combined with other offers"],
      isAvailable: true,
      quantity: 10
    },
    {
      id: "2",
      title: "25% Off Next Event",
      description: "Save 25% on your next event booking",
      points: 500,
      category: "discounts",
      icon: Percent,
      expiresAt: "Jan 15, 2025",
      isAvailable: true,
      quantity: 50
    },
    {
      id: "3",
      title: "VIP Upgrade",
      description: "Upgrade to VIP for any event",
      points: 1500,
      category: "upgrades",
      icon: Crown,
      terms: ["Subject to availability", "Must be redeemed 48 hours before event"],
      isAvailable: true,
      quantity: 5
    },
    {
      id: "4",
      title: "Coffee & Snacks Voucher",
      description: "KES 500 voucher for event concessions",
      points: 300,
      category: "food",
      icon: Coffee,
      isAvailable: true,
      quantity: 100
    },
    {
      id: "5",
      title: "Sypot Merchandise",
      description: "Exclusive Sypot t-shirt or hoodie",
      points: 800,
      category: "merchandise",
      icon: ShoppingBag,
      isAvailable: true,
      quantity: 25
    },
    {
      id: "6",
      title: "Bring a Friend Free",
      description: "Get a free +1 ticket when you book",
      points: 2000,
      category: "tickets",
      icon: Users,
      expiresAt: "Feb 28, 2025",
      isAvailable: false,
      quantity: 3
    }
  ];

  // Achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Timer",
      description: "Attend your first event",
      icon: Star,
      points: 100,
      progress: 1,
      total: 1,
      unlocked: true,
      rarity: "common"
    },
    {
      id: "2",
      title: "Social Butterfly",
      description: "Attend 10 events",
      icon: Users,
      points: 500,
      progress: 8,
      total: 10,
      unlocked: false,
      rarity: "rare"
    },
    {
      id: "3",
      title: "Crew Leader",
      description: "Create 5 successful crew groups",
      icon: Crown,
      points: 750,
      progress: 3,
      total: 5,
      unlocked: false,
      rarity: "epic"
    },
    {
      id: "4",
      title: "Early Bird",
      description: "Book 5 events at least 1 week in advance",
      icon: Clock,
      points: 300,
      progress: 4,
      total: 5,
      unlocked: false,
      rarity: "rare"
    },
    {
      id: "5",
      title: "Explorer",
      description: "Attend events in 5 different categories",
      icon: Target,
      points: 400,
      progress: 3,
      total: 5,
      unlocked: false,
      rarity: "rare"
    },
    {
      id: "6",
      title: "Legendary Patron",
      description: "Reach Platinum tier",
      icon: Gem,
      points: 1000,
      progress: lifetimePoints,
      total: 5000,
      unlocked: false,
      rarity: "legendary"
    }
  ];

  // Recent Points Activity
  const pointsActivity: PointsActivity[] = [
    {
      id: "1",
      description: "Attended Jazz Night at Blue Note",
      points: 150,
      timestamp: "2 days ago",
      type: "earned",
      icon: Calendar
    },
    {
      id: "2",
      description: "Redeemed 25% discount",
      points: -500,
      timestamp: "1 week ago",
      type: "spent",
      icon: Gift
    },
    {
      id: "3",
      description: "Referred a friend",
      points: 250,
      timestamp: "2 weeks ago",
      type: "earned",
      icon: Users
    },
    {
      id: "4",
      description: "Completed profile",
      points: 100,
      timestamp: "3 weeks ago",
      type: "earned",
      icon: CheckCircle
    }
  ];

  // Ways to earn points
  const earningMethods = [
    { action: "Attend an event", points: "100-200", icon: Calendar },
    { action: "Book VIP tickets", points: "2x points", icon: Crown },
    { action: "Refer a friend", points: "250", icon: Users },
    { action: "Write a review", points: "50", icon: Star },
    { action: "Share on social media", points: "25", icon: Heart },
    { action: "Complete your profile", points: "100", icon: CheckCircle }
  ];

  const getCurrentTier = () => {
    return tiers.find(t => t.name.toLowerCase() === userTier.toLowerCase()) || tiers[0];
  };

  const getNextTier = () => {
    const currentIndex = tiers.findIndex(t => t.name.toLowerCase() === userTier.toLowerCase());
    return tiers[currentIndex + 1] || null;
  };

  const handleRedeemReward = (reward: Reward) => {
    if (userPoints < reward.points) {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userPoints} more points`,
        variant: "destructive"
      });
      return;
    }

    if (!reward.isAvailable) {
      toast({
        title: "Reward Unavailable",
        description: "This reward is currently out of stock",
        variant: "destructive"
      });
      return;
    }

    setSelectedReward(reward);
    
    // Simulate redemption
    toast({
      title: "Reward Redeemed! 🎉",
      description: `You've successfully redeemed ${reward.title}`,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-500";
      case "rare": return "text-blue-500";
      case "epic": return "text-purple-500";
      case "legendary": return "text-yellow-500";
      default: return "text-gray-500";
    }
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNextTier = nextTier ? nextTier.minPoints - lifetimePoints : 0;
  const tierProgress = nextTier 
    ? ((lifetimePoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  return (
    <Layout>
      <SEO 
        title="Loyalty Rewards - Earn Points & Get Rewards | Sypot" 
        description="Earn points for every event and unlock exclusive rewards"
        canonical="/rewards"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Trophy className="h-3 w-3 mr-1" />
              Loyalty Program
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sypot Rewards
            </h1>
            <p className="text-xl text-muted-foreground">
              Earn points with every event and unlock exclusive perks
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Points Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Points
                <Zap className="h-5 w-5 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{userPoints.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Available to redeem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Tier
                <currentTier.icon className={`h-5 w-5 ${currentTier.color.replace('bg-', 'text-')}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold capitalize">{userTier}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {currentTier.benefits[0]}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Lifetime Points
                <TrendingUp className="h-5 w-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{lifetimePoints.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Total earned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tier Progress */}
        {nextTier && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tier Progress</CardTitle>
              <CardDescription>
                {pointsToNextTier} points to reach {nextTier.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={tierProgress} className="h-3" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <currentTier.icon className={`h-6 w-6 ${currentTier.color.replace('bg-', 'text-')}`} />
                    <span className="font-medium">{currentTier.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <nextTier.icon className={`h-6 w-6 ${nextTier.color.replace('bg-', 'text-')}`} />
                    <span className="font-medium">{nextTier.name}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rewards">
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Clock className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="tiers">
              <Crown className="h-4 w-4 mr-2" />
              Tiers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Available Rewards</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`${!reward.isAvailable || userPoints < reward.points ? 'opacity-60' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <reward.icon className="h-8 w-8 text-primary" />
                        <Badge variant={reward.isAvailable ? "default" : "secondary"}>
                          {reward.isAvailable ? `${reward.quantity} left` : "Out of stock"}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4">{reward.title}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          <span className="text-2xl font-bold">{reward.points}</span>
                          <span className="text-sm text-muted-foreground">points</span>
                        </div>
                        {reward.expiresAt && (
                          <Badge variant="outline" className="text-xs">
                            Expires {reward.expiresAt}
                          </Badge>
                        )}
                      </div>
                      
                      {reward.terms && (
                        <div className="text-xs text-muted-foreground space-y-1 mb-4">
                          {reward.terms.map((term, idx) => (
                            <p key={idx}>• {term}</p>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        disabled={!reward.isAvailable || userPoints < reward.points}
                        onClick={() => handleRedeemReward(reward)}
                      >
                        {userPoints < reward.points ? (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Need {reward.points - userPoints} more points
                          </>
                        ) : reward.isAvailable ? (
                          <>
                            <Gift className="h-4 w-4 mr-2" />
                            Redeem
                          </>
                        ) : (
                          "Out of Stock"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Achievements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.unlocked ? '' : 'opacity-75'}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 rounded-full ${
                            achievement.unlocked ? 'bg-primary' : 'bg-muted'
                          } flex items-center justify-center`}>
                            <achievement.icon className={`h-6 w-6 ${
                              achievement.unlocked ? 'text-primary-foreground' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{achievement.title}</CardTitle>
                            <CardDescription>{achievement.description}</CardDescription>
                          </div>
                        </div>
                        {achievement.unlocked ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                          </span>
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">+{achievement.points}</span>
                          </div>
                        </div>
                        
                        {!achievement.unlocked && (
                          <>
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                            <p className="text-xs text-muted-foreground text-center">
                              {achievement.progress} / {achievement.total}
                            </p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Points Activity</h2>
              
              {/* How to Earn Points */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    How to Earn Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {earningMethods.map((method) => (
                      <div key={method.action} className="flex items-center gap-3">
                        <method.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{method.action}</p>
                          <p className="text-sm text-muted-foreground">+{method.points} points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pointsActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full ${
                            activity.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                          } flex items-center justify-center`}>
                            <activity.icon className={`h-5 w-5 ${
                              activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                        <div className={`font-bold ${
                          activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.type === 'earned' ? '+' : ''}{activity.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tiers" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Loyalty Tiers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tiers.map((tier) => {
                  const isCurrentTier = tier.name.toLowerCase() === userTier.toLowerCase();
                  const isUnlocked = lifetimePoints >= tier.minPoints;
                  
                  return (
                    <Card
                      key={tier.name}
                      className={`${isCurrentTier ? 'border-2 border-primary' : ''} ${
                        !isUnlocked ? 'opacity-60' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-12 w-12 rounded-full ${tier.color} flex items-center justify-center`}>
                              <tier.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle>{tier.name}</CardTitle>
                              <CardDescription>
                                {tier.minPoints.toLocaleString()}+ lifetime points
                              </CardDescription>
                            </div>
                          </div>
                          {isCurrentTier && (
                            <Badge>Current</Badge>
                          )}
                          {!isUnlocked && (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-medium mb-2">Benefits:</p>
                          {tier.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Rewards;
