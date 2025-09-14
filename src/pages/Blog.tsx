import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Clock, User, ArrowRight, Search, 
  TrendingUp, BookOpen, Hash, ChevronRight 
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "10 Tips for Hosting Successful Virtual Events in 2024",
      excerpt: "Learn how to engage your audience and create memorable experiences in the digital space with these proven strategies.",
      author: {
        name: "Sarah Kamau",
        avatar: "https://api.dicebear.com/v2/avataaars/sarah.svg",
        role: "Event Strategy Expert"
      },
      category: "Virtual Events",
      tags: ["Virtual", "Tips", "Technology"],
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
      readTime: "5 min read",
      publishedAt: "2024-02-20",
      featured: true
    },
    {
      id: "2",
      title: "The Rise of Hybrid Events: Best of Both Worlds",
      excerpt: "Discover how hybrid events are revolutionizing the event industry and why they're here to stay.",
      author: {
        name: "James Ochieng",
        avatar: "https://api.dicebear.com/v2/avataaars/james.svg",
        role: "Technology Writer"
      },
      category: "Industry Trends",
      tags: ["Hybrid", "Trends", "Future"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      readTime: "7 min read",
      publishedAt: "2024-02-18"
    },
    {
      id: "3",
      title: "Event Marketing: Social Media Strategies That Work",
      excerpt: "Maximize your event's reach with these proven social media marketing techniques and tools.",
      author: {
        name: "Grace Wanjiru",
        avatar: "https://api.dicebear.com/v2/avataaars/grace.svg",
        role: "Marketing Specialist"
      },
      category: "Marketing",
      tags: ["Social Media", "Marketing", "Promotion"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      readTime: "6 min read",
      publishedAt: "2024-02-15"
    },
    {
      id: "4",
      title: "Sustainable Events: Going Green Without Breaking the Bank",
      excerpt: "Practical tips for organizing eco-friendly events that don't compromise on quality or experience.",
      author: {
        name: "David Njoroge",
        avatar: "https://api.dicebear.com/v2/avataaars/david.svg",
        role: "Sustainability Advocate"
      },
      category: "Sustainability",
      tags: ["Green", "Eco-friendly", "Sustainability"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      readTime: "8 min read",
      publishedAt: "2024-02-12"
    },
    {
      id: "5",
      title: "The Psychology of Event Attendance: What Drives People",
      excerpt: "Understanding the motivations behind event attendance can help you create more compelling experiences.",
      author: {
        name: "Lisa Mwangi",
        avatar: "https://api.dicebear.com/v2/avataaars/lisa.svg",
        role: "Behavioral Analyst"
      },
      category: "Psychology",
      tags: ["Psychology", "Behavior", "Insights"],
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
      readTime: "10 min read",
      publishedAt: "2024-02-10"
    },
    {
      id: "6",
      title: "Event Tech Trends: AI, VR, and Beyond",
      excerpt: "Explore the cutting-edge technologies that are shaping the future of event experiences.",
      author: {
        name: "Mike Omondi",
        avatar: "https://api.dicebear.com/v2/avataaars/mike.svg",
        role: "Tech Innovation Lead"
      },
      category: "Technology",
      tags: ["AI", "VR", "Innovation"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
      readTime: "9 min read",
      publishedAt: "2024-02-08"
    }
  ];

  const categories = [
    "All",
    "Virtual Events",
    "Industry Trends",
    "Marketing",
    "Technology",
    "Sustainability",
    "Psychology",
    "Case Studies"
  ];

  const popularTags = [
    "Virtual Events",
    "Hybrid",
    "Marketing",
    "Technology",
    "Sustainability",
    "Tips",
    "Trends",
    "Innovation"
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <Layout>
      <SEO 
        title="Blog - Event Industry Insights | Sypot" 
        description="Stay updated with the latest trends, tips, and insights in the event industry."
        canonical="/blog"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <BookOpen className="w-3 h-3 mr-1" />
                Sypot Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Event Industry Insights
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Tips, trends, and strategies to help you create unforgettable events
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Featured Post */}
          {featuredPost && !searchQuery && selectedCategory === "all" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-8">
                    <Badge className="mb-4">{featuredPost.category}</Badge>
                    <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{featuredPost.author.name}</p>
                        <p className="text-sm text-muted-foreground">{featuredPost.author.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                    <Link to={`/blog/${featuredPost.id}`}>
                      <Button className="gap-2">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
                <TabsList className="flex-wrap h-auto">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category.toLowerCase()}
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 mb-4">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            Read
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No articles found matching your criteria</p>
                  </CardContent>
                </Card>
              )}

              {/* Load More */}
              {filteredPosts.length > 0 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter</CardTitle>
                  <CardDescription>
                    Get the latest insights delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input 
                    type="email" 
                    placeholder="Your email"
                    className="mb-3"
                  />
                  <Button className="w-full">Subscribe</Button>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post, index) => (
                      <Link 
                        key={post.id} 
                        to={`/blog/${post.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <span className="text-2xl font-bold text-muted-foreground">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {post.readTime}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;