import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Newspaper, Download, Mail, ExternalLink, Calendar, User } from 'lucide-react';

export const Press: React.FC = () => {
  const pressReleases = [
    {
      date: '2024-03-15',
      title: 'Vibe Connect Raises $10M Series A to Expand Across Africa',
      publication: 'TechCrunch',
      link: '#'
    },
    {
      date: '2024-02-28',
      title: 'How Vibe Connect is Revolutionizing Event Management in Kenya',
      publication: 'Business Daily',
      link: '#'
    },
    {
      date: '2024-01-20',
      title: 'Vibe Connect Partners with Safaricom for M-Pesa Integration',
      publication: 'The Standard',
      link: '#'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Media Center</Badge>
            <h1 className="text-5xl font-bold mb-6">Press & Media</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Latest news, press releases, and media resources about Vibe Connect.
            </p>
            <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100">
              <Mail className="w-5 h-5 mr-2" />
              Press Inquiries
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Press Coverage</h2>
              <div className="space-y-4">
                {pressReleases.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.publication}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Media Kit</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Download Resources</CardTitle>
                  <CardDescription>Logos, brand guidelines, and company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Brand Guidelines (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Logo Pack (ZIP)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Company Fact Sheet
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Executive Bios & Photos
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Press Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-8 h-8 text-gray-400" />
                    <div>
                      <p className="font-semibold">Sarah Wanjiru</p>
                      <p className="text-sm text-gray-600">Head of Communications</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">press@vibeconnect.com</p>
                  <p className="text-sm text-gray-600">+254 700 123 456</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
