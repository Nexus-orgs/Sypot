import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Code,
  Terminal,
  Book,
  Zap,
  Shield,
  Globe,
  Clock,
  CheckCircle,
  Copy,
  ExternalLink,
  ArrowRight,
  Key,
  Database,
  Settings,
  TrendingUp,
  Users,
  Lock,
  Rocket,
  FileCode,
  GitBranch,
  Play
} from 'lucide-react';
import { toast } from 'sonner';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  parameters?: string[];
  response: string;
}

interface APIPlan {
  name: string;
  price: string;
  requests: string;
  features: string[];
  highlighted?: boolean;
}

const endpoints: Record<string, APIEndpoint[]> = {
  events: [
    {
      method: 'GET',
      endpoint: '/api/v1/events',
      description: 'List all events with pagination and filters',
      parameters: ['page', 'limit', 'category', 'location', 'date_from', 'date_to'],
      response: '{ events: [...], total: 100, page: 1 }'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/events/{id}',
      description: 'Get detailed information about a specific event',
      response: '{ id, title, description, location, date, tickets, ... }'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/events',
      description: 'Create a new event',
      parameters: ['title', 'description', 'location', 'date', 'capacity'],
      response: '{ id, status: "created", event: {...} }'
    },
    {
      method: 'PUT',
      endpoint: '/api/v1/events/{id}',
      description: 'Update an existing event',
      response: '{ id, status: "updated", event: {...} }'
    }
  ],
  tickets: [
    {
      method: 'POST',
      endpoint: '/api/v1/tickets/book',
      description: 'Book tickets for an event',
      parameters: ['event_id', 'quantity', 'ticket_type', 'user_info'],
      response: '{ booking_id, tickets: [...], qr_codes: [...] }'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/tickets/{booking_id}',
      description: 'Retrieve booking details',
      response: '{ booking_id, event, tickets, status, payment_info }'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/tickets/validate',
      description: 'Validate ticket QR code at entry',
      parameters: ['qr_code', 'event_id'],
      response: '{ valid: true, ticket_info: {...}, entry_time: "..." }'
    }
  ],
  users: [
    {
      method: 'GET',
      endpoint: '/api/v1/users/profile',
      description: 'Get user profile information',
      response: '{ id, name, email, preferences, events_attended, ... }'
    },
    {
      method: 'PUT',
      endpoint: '/api/v1/users/preferences',
      description: 'Update user preferences',
      parameters: ['categories', 'locations', 'notifications'],
      response: '{ status: "updated", preferences: {...} }'
    }
  ],
  analytics: [
    {
      method: 'GET',
      endpoint: '/api/v1/analytics/events/{id}',
      description: 'Get event analytics and insights',
      response: '{ attendance, demographics, revenue, engagement, ... }'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/analytics/trends',
      description: 'Get trending events and categories',
      response: '{ trending_events: [...], popular_categories: [...] }'
    }
  ]
};

const apiPlans: APIPlan[] = [
  {
    name: 'Developer',
    price: 'Free',
    requests: '1,000/month',
    features: [
      'Core API endpoints',
      'Basic authentication',
      'Community support',
      'Rate limiting: 10 req/min',
      'Test environment access'
    ]
  },
  {
    name: 'Startup',
    price: 'Ksh 9,999/mo',
    requests: '100,000/month',
    features: [
      'All Developer features',
      'Advanced endpoints',
      'OAuth 2.0 authentication',
      'Email support',
      'Rate limiting: 100 req/min',
      'Webhook notifications',
      'Custom headers'
    ],
    highlighted: true
  },
  {
    name: 'Business',
    price: 'Ksh 29,999/mo',
    requests: '1,000,000/month',
    features: [
      'All Startup features',
      'Premium endpoints',
      'SSO integration',
      'Priority support',
      'Rate limiting: 500 req/min',
      'Real-time data sync',
      'Custom integrations',
      'SLA guarantee'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    requests: 'Unlimited',
    features: [
      'All Business features',
      'Dedicated infrastructure',
      'Custom rate limits',
      '24/7 phone support',
      'On-premise deployment',
      'Custom API development',
      'Training & onboarding',
      'Dedicated account manager'
    ]
  }
];

const codeExamples = {
  javascript: `// JavaScript/Node.js Example
const axios = require('axios');

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.vibeconnect.com/v1';

// Get events
async function getEvents() {
  try {
    const response = await axios.get(\`\${BASE_URL}/events\`, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      params: {
        category: 'music',
        location: 'Nairobi',
        limit: 10
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}`,
  python: `# Python Example
import requests

API_KEY = 'your_api_key_here'
BASE_URL = 'https://api.vibeconnect.com/v1'

# Get events
def get_events():
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    params = {
        'category': 'music',
        'location': 'Nairobi',
        'limit': 10
    }
    
    response = requests.get(f'{BASE_URL}/events', 
                           headers=headers, 
                           params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Error: {response.status_code}')
        return None`,
  curl: `# cURL Example
curl -X GET "https://api.vibeconnect.com/v1/events?category=music&location=Nairobi&limit=10" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"

# Create an event
curl -X POST "https://api.vibeconnect.com/v1/events" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Summer Music Festival",
    "description": "Annual outdoor music festival",
    "location": "Uhuru Park, Nairobi",
    "date": "2024-07-15T18:00:00Z",
    "capacity": 5000
  }'`
};

export const APIAccess: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('events');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'curl'>('javascript');

  const handleCopyCode = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(language);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Developer Platform
              </Badge>
              <h1 className="text-5xl font-bold mb-6">Vibe Connect API</h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Build amazing event experiences with our powerful REST API.
                Access real-time data, manage events, and integrate seamlessly.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100">
                  Get API Key
                  <Key className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  View Documentation
                  <Book className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-slate-300">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">&lt; 50ms</div>
                  <div className="text-slate-300">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">10M+</div>
                  <div className="text-slate-300">API Calls/Day</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5,000+</div>
                  <div className="text-slate-300">Developers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Endpoint Categories */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.keys(endpoints).map((category) => (
                    <Button
                      key={category}
                      variant={selectedEndpoint === category ? 'default' : 'ghost'}
                      className="w-full justify-start capitalize"
                      onClick={() => setSelectedEndpoint(category)}
                    >
                      <Database className="w-4 h-4 mr-2" />
                      {category}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Endpoint Details */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{selectedEndpoint} API</CardTitle>
                  <CardDescription>
                    Endpoints for managing {selectedEndpoint}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {endpoints[selectedEndpoint].map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex items-start gap-3 mb-2">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <code className="flex-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                      {endpoint.parameters && (
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-gray-500">Parameters:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {endpoint.parameters.map((param) => (
                              <Badge key={param} variant="outline" className="text-xs">
                                {param}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-gray-500">Response:</span>
                        <code className="block text-xs mt-1 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                          {endpoint.response}
                        </code>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Quick Start</h2>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Examples</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={selectedLanguage === 'javascript' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLanguage('javascript')}
                    >
                      JavaScript
                    </Button>
                    <Button
                      variant={selectedLanguage === 'python' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLanguage('python')}
                    >
                      Python
                    </Button>
                    <Button
                      variant={selectedLanguage === 'curl' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLanguage('curl')}
                    >
                      cURL
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{codeExamples[selectedLanguage]}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4"
                    onClick={() => handleCopyCode(codeExamples[selectedLanguage], selectedLanguage)}
                  >
                    {copiedCode === selectedLanguage ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">API Pricing Plans</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.highlighted ? 'border-purple-500 shadow-xl' : ''}`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <div className="text-sm text-gray-600">{plan.requests}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="w-full mt-6"
                  >
                    {plan.name === 'Developer' ? 'Start Free' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Developers Choose Our API</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Zap className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Average response time under 50ms with global CDN distribution
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Enterprise Security</CardTitle>
                  <CardDescription>
                    OAuth 2.0, API keys, rate limiting, and end-to-end encryption
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Globe className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Global Scale</CardTitle>
                  <CardDescription>
                    Handle millions of requests with auto-scaling infrastructure
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <GitBranch className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Version Control</CardTitle>
                  <CardDescription>
                    Backward compatible API versioning with deprecation notices
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <FileCode className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>SDKs & Libraries</CardTitle>
                  <CardDescription>
                    Official SDKs for JavaScript, Python, PHP, Ruby, and more
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Developer Support</CardTitle>
                  <CardDescription>
                    Active community, comprehensive docs, and responsive support
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Building Today</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get your API key and build amazing event experiences
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started Free
                <Rocket className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Talk to Sales
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};