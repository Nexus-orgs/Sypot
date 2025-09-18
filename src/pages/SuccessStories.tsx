import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Calendar,
  Target,
  Award,
  Star,
  ArrowRight,
  Play,
  Quote,
  Building,
  MapPin,
  DollarSign,
  Heart,
  Share2,
  BookmarkPlus,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

interface SuccessStory {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  businessName: string;
  location: string;
  logo: string;
  coverImage: string;
  videoUrl?: string;
  metrics: {
    label: string;
    value: string;
    growth?: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  keyFeatures: string[];
  timeline: string;
  result: string;
  tags: string[];
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    title: 'From 50 to 5,000: How GreenTech Summit Scaled',
    subtitle: 'A sustainable tech conference that grew 100x in 2 years',
    category: 'Conferences',
    businessName: 'GreenTech Summit',
    location: 'Nairobi, Kenya',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    metrics: [
      { label: 'Attendees', value: '5,000+', growth: '+900%' },
      { label: 'Revenue', value: 'Ksh 50M', growth: '+750%' },
      { label: 'Satisfaction', value: '98%', growth: '+15%' },
      { label: 'Exhibitors', value: '200+', growth: '+400%' }
    ],
    testimonial: {
      quote: "Vibe Connect transformed our event management. The platform's tools helped us scale efficiently while maintaining the quality experience our attendees expect.",
      author: 'David Kimani',
      role: 'Founder & CEO, GreenTech Summit',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    keyFeatures: ['Automated ticketing', 'Real-time analytics', 'Vendor management', 'Mobile check-in'],
    timeline: '2021 - 2023',
    result: 'Became East Africa\'s largest sustainable tech conference',
    tags: ['Conference', 'B2B', 'Technology', 'Sustainability']
  },
  {
    id: '2',
    title: 'Local Restaurant Fills Tables with Smart Events',
    subtitle: 'How Savanna Bites increased revenue by 300% with themed nights',
    category: 'Restaurants',
    businessName: 'Savanna Bites',
    location: 'Westlands, Nairobi',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    metrics: [
      { label: 'Monthly Events', value: '12+', growth: '+500%' },
      { label: 'Revenue', value: 'Ksh 2.5M/mo', growth: '+300%' },
      { label: 'Regular Customers', value: '1,500+', growth: '+400%' },
      { label: 'Table Bookings', value: '95%', growth: '+60%' }
    ],
    testimonial: {
      quote: "We went from empty Tuesday nights to being fully booked every night. The event tools helped us create experiences, not just serve food.",
      author: 'Grace Mwangi',
      role: 'Owner, Savanna Bites',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    keyFeatures: ['Event calendar', 'Table reservations', 'Customer insights', 'Marketing automation'],
    timeline: '6 months',
    result: 'Transformed from struggling restaurant to community hub',
    tags: ['Restaurant', 'Hospitality', 'Entertainment', 'Food & Beverage']
  },
  {
    id: '3',
    title: 'Music Festival Doubles Attendance with Data',
    subtitle: 'Kilifi New Year used analytics to perfect their lineup',
    category: 'Festivals',
    businessName: 'Kilifi New Year',
    location: 'Kilifi, Kenya',
    logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    metrics: [
      { label: 'Attendees', value: '15,000', growth: '+100%' },
      { label: 'Artist Bookings', value: '50+', growth: '+150%' },
      { label: 'Ticket Sales Speed', value: '3 days', growth: '-80%' },
      { label: 'Social Reach', value: '5M+', growth: '+400%' }
    ],
    testimonial: {
      quote: "The audience insights helped us book the perfect lineup. We knew exactly what our crowd wanted before they did.",
      author: 'James Oduor',
      role: 'Festival Director',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    keyFeatures: ['Audience analytics', 'Artist management', 'Cashless payments', 'Live streaming'],
    timeline: '2022 - 2023',
    result: 'Sold out 3 months in advance for the first time',
    tags: ['Festival', 'Music', 'Entertainment', 'Tourism']
  }
];

const categories = ['All', 'Conferences', 'Restaurants', 'Festivals', 'Nightlife', 'Corporate'];

export const SuccessStories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedStories, setSavedStories] = useState<Set<string>>(new Set());

  const filteredStories = selectedCategory === 'All' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory);

  const handleSaveStory = (storyId: string) => {
    setSavedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
        toast.success('Story removed from saved');
      } else {
        newSet.add(storyId);
        toast.success('Story saved for later');
      }
      return newSet;
    });
  };

  const handleShare = (story: SuccessStory) => {
    navigator.clipboard.writeText(`${window.location.origin}/success-stories/${story.id}`);
    toast.success('Link copied to clipboard');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Real Results, Real Businesses
              </Badge>
              <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
                Discover how businesses like yours are growing with Vibe Connect.
                From local restaurants to international festivals, see the impact of our platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-purple-100">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">Ksh 500M+</div>
                  <div className="text-purple-100">Revenue Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">2M+</div>
                  <div className="text-purple-100">Events Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-purple-100">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {story.videoUrl && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                      {story.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={story.logo}
                        alt={story.businessName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg">{story.businessName}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {story.location}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="font-semibold text-gray-900 dark:text-white">
                      {story.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{story.subtitle}</p>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {story.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{metric.value}</div>
                          <div className="text-xs text-gray-600">{metric.label}</div>
                          {metric.growth && (
                            <div className="text-xs text-green-600 font-semibold">{metric.growth}</div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Result */}
                    <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-purple-600 mt-0.5" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {story.result}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button variant="default" size="sm" className="flex-1 mr-2">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveStory(story.id);
                          }}
                        >
                          <BookmarkPlus className={`w-4 h-4 ${savedStories.has(story.id) ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(story);
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of businesses growing with Vibe Connect
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Schedule Demo
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};