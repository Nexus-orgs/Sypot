import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Star, Users, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const PlacesNearYou = () => {
  const [distance, setDistance] = useState<'1km' | '5km' | '10km'>('5km');
  
  const places = [
    {
      id: '1',
      name: 'The Alchemist Bar',
      type: 'Bar & Restaurant',
      distance: '0.8 km',
      rating: 4.5,
      events: 12,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      address: 'Westlands, Nairobi',
      popular: ['Live Music', 'Happy Hour', 'Trivia Nights']
    },
    {
      id: '2',
      name: 'Karura Forest',
      type: 'Nature & Parks',
      distance: '2.3 km',
      rating: 4.8,
      events: 8,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      address: 'Kiambu Road',
      popular: ['Yoga Sessions', 'Nature Walks', 'Picnics']
    },
    {
      id: '3',
      name: 'KICC',
      type: 'Convention Center',
      distance: '3.5 km',
      rating: 4.3,
      events: 25,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      address: 'CBD, Nairobi',
      popular: ['Conferences', 'Exhibitions', 'Corporate Events']
    },
    {
      id: '4',
      name: 'Village Market',
      type: 'Shopping & Entertainment',
      distance: '4.2 km',
      rating: 4.4,
      events: 15,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      address: 'Gigiri, Nairobi',
      popular: ['Markets', 'Food Festivals', 'Family Events']
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Places Near You | Sypot" 
        description="Discover event venues and places hosting amazing experiences near your location."
        canonical="/places-near-you"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Places Near You</h1>
            </div>
            <p className="text-xl opacity-90 mb-6">Discover venues hosting events in your area</p>
            <div className="flex gap-2">
              {(['1km', '5km', '10km'] as const).map((d) => (
                <Button
                  key={d}
                  variant={distance === d ? 'secondary' : 'outline'}
                  onClick={() => setDistance(d)}
                  className={distance !== d ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : ''}
                >
                  Within {d}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <Compass className="w-5 h-5" />
              <span className="font-medium">Location: Nairobi, Kenya</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {places.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{place.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">{place.type}</Badge>
                        </div>
                        <Badge className="bg-blue-500 text-white">
                          <MapPin className="w-3 h-3 mr-1" />
                          {place.distance}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-3">{place.address}</CardDescription>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {place.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {place.events} events
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {place.popular.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Link to={`/places/${place.id}`}>
                        <Button size="sm" className="w-full">View Events</Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Places
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlacesNearYou;
