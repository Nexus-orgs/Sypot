import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Video,
  FileText,
  Download,
  PlayCircle,
  Users,
  GraduationCap,
  Zap,
  Search,
  Filter,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  ArrowRight,
  Lightbulb,
  Target,
  CheckCircle,
  BookmarkPlus,
  Share2,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'template' | 'webinar' | 'course' | 'ebook';
  category: string;
  duration?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  thumbnail: string;
  url?: string;
  downloadUrl?: string;
  rating: number;
  views: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isPremium: boolean;
  publishedAt: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Complete Event Planning Guide 2024',
    description: 'Everything you need to know about planning successful events, from concept to execution.',
    type: 'ebook',
    category: 'Event Planning',
    author: {
      name: 'Sarah Chen',
      role: 'Event Strategy Expert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    downloadUrl: '/downloads/event-planning-guide.pdf',
    rating: 4.9,
    views: 15420,
    level: 'beginner',
    tags: ['Planning', 'Strategy', 'Checklist'],
    isPremium: false,
    publishedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Mastering Event Marketing',
    description: 'Learn proven strategies to promote your events and maximize attendance.',
    type: 'video',
    category: 'Marketing',
    duration: '45 min',
    author: {
      name: 'David Kimani',
      role: 'Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    url: '/watch/mastering-event-marketing',
    rating: 4.8,
    views: 8932,
    level: 'intermediate',
    tags: ['Marketing', 'Social Media', 'Email'],
    isPremium: true,
    publishedAt: '2024-02-01'
  },
  {
    id: '3',
    title: 'Event Budget Template',
    description: 'Professional spreadsheet template to track and manage your event budget effectively.',
    type: 'template',
    category: 'Finance',
    author: {
      name: 'Grace Mwangi',
      role: 'Finance Consultant',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    downloadUrl: '/templates/event-budget.xlsx',
    rating: 4.7,
    views: 12543,
    level: 'beginner',
    tags: ['Budget', 'Finance', 'Spreadsheet'],
    isPremium: false,
    publishedAt: '2024-01-20'
  },
  {
    id: '4',
    title: 'Virtual Events Masterclass',
    description: 'Comprehensive course on hosting engaging and profitable virtual events.',
    type: 'course',
    category: 'Virtual Events',
    duration: '6 hours',
    author: {
      name: 'Michael Oduor',
      role: 'Virtual Event Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
    url: '/courses/virtual-events',
    rating: 4.9,
    views: 6789,
    level: 'advanced',
    tags: ['Virtual', 'Technology', 'Engagement'],
    isPremium: true,
    publishedAt: '2024-02-10'
  }
];

const categories = ['All', 'Event Planning', 'Marketing', 'Finance', 'Virtual Events', 'Technology', 'Legal'];
const types = ['All', 'Guides', 'Videos', 'Templates', 'Webinars', 'Courses', 'eBooks'];

export const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set());

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || 
      (selectedType === 'Guides' && resource.type === 'guide') ||
      (selectedType === 'Videos' && resource.type === 'video') ||
      (selectedType === 'Templates' && resource.type === 'template') ||
      (selectedType === 'Webinars' && resource.type === 'webinar') ||
      (selectedType === 'Courses' && resource.type === 'course') ||
      (selectedType === 'eBooks' && resource.type === 'ebook');
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const handleSaveResource = (resourceId: string) => {
    setSavedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
        toast.success('Resource removed from library');
      } else {
        newSet.add(resourceId);
        toast.success('Resource saved to library');
      }
      return newSet;
    });
  };

  const handleShare = (resource: Resource) => {
    navigator.clipboard.writeText(`${window.location.origin}/resources/${resource.id}`);
    toast.success('Link copied to clipboard');
  };

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      case 'webinar': return <Video className="w-4 h-4" />;
      case 'course': return <GraduationCap className="w-4 h-4" />;
      case 'ebook': return <Download className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: Resource['level']) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Learn from the Best
              </Badge>
              <h1 className="text-5xl font-bold mb-6">Resource Center</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Guides, templates, courses, and tools to help you create amazing events.
                From beginner basics to advanced strategies.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-white text-gray-900 rounded-xl"
                />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-blue-100">Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-blue-100">Expert Authors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100K+</div>
                  <div className="text-blue-100">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8/5</div>
                  <div className="text-blue-100">Average Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Type Filters */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow group">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {resource.isPremium && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                        Premium
                      </Badge>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-lg p-2">
                      {getTypeIcon(resource.type)}
                    </div>
                    {resource.duration && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.duration}
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className={getLevelColor(resource.level)}>
                        {resource.level}
                      </Badge>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={resource.author.avatar}
                        alt={resource.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{resource.author.name}</p>
                        <p className="text-xs text-gray-600">{resource.author.role}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {resource.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {resource.views.toLocaleString()}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {resource.downloadUrl ? (
                        <Button variant="default" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      ) : (
                        <Button variant="default" size="sm" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveResource(resource.id)}
                      >
                        <BookmarkPlus className={`w-4 h-4 ${savedResources.has(resource.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare(resource)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Share your expertise and help others succeed with their events
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Submit a Resource
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Become an Author
                <GraduationCap className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};