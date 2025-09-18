import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Clock,
  MapPin,
  Activity,
  PieChart,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Analytics: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: 'Ksh 2.5M', change: '+23%', trend: 'up' },
    { label: 'Active Users', value: '15,234', change: '+15%', trend: 'up' },
    { label: 'Events Created', value: '342', change: '+8%', trend: 'up' },
    { label: 'Conversion Rate', value: '4.2%', change: '-2%', trend: 'down' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your performance and insights</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'}>
                        {stat.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {stat.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue over the last year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">
                      <BarChart3 className="w-16 h-16 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>New vs returning users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">
                      <PieChart className="w-16 h-16 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Events</CardTitle>
                  <CardDescription>Your best performing events this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Summer Music Festival', 'Tech Conference 2024', 'Food & Wine Weekend'].map((event, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{event}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {Math.floor(Math.random() * 500 + 100)} attendees
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              Ksh {Math.floor(Math.random() * 50000 + 10000).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Progress value={Math.random() * 100} className="w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Detailed revenue breakdown and trends</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">
                    <Activity className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Insights</CardTitle>
                  <CardDescription>Understand your audience demographics and behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Age Distribution</h4>
                      <div className="space-y-2">
                        {['18-24', '25-34', '35-44', '45+'].map((age) => (
                          <div key={age} className="flex items-center justify-between">
                            <span className="text-sm">{age}</span>
                            <Progress value={Math.random() * 100} className="w-24" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Top Locations</h4>
                      <div className="space-y-2">
                        {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'].map((city) => (
                          <div key={city} className="flex items-center justify-between">
                            <span className="text-sm flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {city}
                            </span>
                            <span className="text-sm font-medium">{Math.floor(Math.random() * 1000 + 100)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Device Types</h4>
                      <div className="space-y-2">
                        {['Mobile', 'Desktop', 'Tablet'].map((device) => (
                          <div key={device} className="flex items-center justify-between">
                            <span className="text-sm">{device}</span>
                            <span className="text-sm font-medium">{Math.floor(Math.random() * 100)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                  <CardDescription>Analyze your event metrics and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">
                    <Calendar className="w-16 h-16 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};
