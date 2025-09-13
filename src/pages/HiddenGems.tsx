import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gem, Eye, Users, Star, MapPin, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HiddenGems = () => {
  const gems = [
    {
      id: '1',
      title: 'Secret Jazz Sessions at The Attic',
      description: 'Intimate jazz performances in a hidden speakeasy-style venue',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800',
      category: 'Music',
      location: 'Kilimani (exact location shared after booking)',
      date: 'Every Thursday',
      time: '8:00 PM',
      capacity: 30,
      price: 1500,
      discoveredBy: 42,
      rating: 4.9,
      exclusive: true
    },
    {
      id: '2',
      title: 'Rooftop Cinema Under the Stars',
      description: 'Watch classic films on a secret rooftop with panoramic city views',
      image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800',
      category: 'Film',
      location: 'Westlands Rooftop',
      date: 'Saturdays',
      time: '7:30 PM',
      capacity: 50,
      price: 2000,
      discoveredBy: 128,
      rating: 4.8,
      exclusive: false
    },
    {
      id: '3',
      title: 'Underground Art Gallery Opening',
      description: 'Exclusive preview of emerging artists in a converted warehouse',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
      category: 'Art',
      location: 'Industrial Area',
      date: 'First Friday of month',
      time: '6:00 PM',
      capacity: 100,
      price: 0,
      discoveredBy: 89,
      rating: 4.7,
      exclusive: true
    },
    {
      id: '4',
      title: 'Sunrise Yoga at Hidden Waterfall',
      description: 'Peaceful morning yoga session at a secret waterfall location',
      image: 'https://images.unsplash.com/photo-1527004414056-07a3b66126b8?w=800',
      category: 'Wellness',
      location: 'Ngong Hills Area',
      date: 'Sundays',
      time: '6:00 AM',
      capacity: 20,
      price: 1000,
      discoveredBy: 67,
      rating: 5.0,
      exclusive: false
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Hidden Gems | Sypot" 
        description="Discover secret events and exclusive experiences that only locals know about."
        canonical="/hidden-gems"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Gem className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Hidden Gems</h1>
            </div>
            <p className="text-xl opacity-90 mb-6">
              Exclusive events and secret spots that only insiders know about
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Limited Access
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Small Groups
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Unique Experiences
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gems.map((gem) => (
              <Card key={gem.id} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="relative">
                  <img 
                    src={gem.image} 
                    alt={gem.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{gem.title}</h3>
                    <div className="flex items-center gap-2">
                      {gem.exclusive && (
                        <Badge className="bg-yellow-500 text-black">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Exclusive
                        </Badge>
                      )}
                      {gem.price === 0 && (
                        <Badge className="bg-green-500 text-white">FREE</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{gem.category}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{gem.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{gem.description}</CardDescription>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="italic">{gem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{gem.date} • {gem.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Max {gem.capacity} people</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        <Eye className="w-3 h-3 inline mr-1" />
                        {gem.discoveredBy} discovered this
                      </p>
                      {gem.price > 0 && (
                        <p className="font-bold mt-1">KES {gem.price}</p>
                      )}
                    </div>
                    <Link to={`/event/${gem.id}`}>
                      <Button size="sm">
                        Reserve Spot
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <Gem className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Know a Hidden Gem?</h2>
            <p className="text-muted-foreground mb-4">
              Share your secret spots and exclusive events with our community
            </p>
            <Button>
              Submit a Hidden Gem
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HiddenGems;
