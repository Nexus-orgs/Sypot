import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BookOpen, Users, Shield, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

export const Guidelines: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-6">Community Guidelines</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Help us build a safe, inclusive, and vibrant community for everyone.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Heart className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Be Respectful</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Treat everyone with respect and kindness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Embrace diversity and different perspectives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>No harassment, discrimination, or hate speech</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Stay Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Protect your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Report suspicious or harmful behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Use secure payment methods only</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Be Authentic</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Use your real identity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Share accurate event information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Honor your commitments and RSVPs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
                <CardTitle>Prohibited Content</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Illegal activities or content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Spam or misleading information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✕</span>
                    <span>Copyright infringement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Event Organizer Guidelines</CardTitle>
              <CardDescription>Special guidelines for those creating and managing events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p>As an event organizer, you have additional responsibilities:</p>
                <ul className="space-y-2">
                  <li>• Provide accurate and complete event information</li>
                  <li>• Ensure venue safety and compliance with local regulations</li>
                  <li>• Communicate clearly with attendees before, during, and after events</li>
                  <li>• Handle refunds and cancellations fairly</li>
                  <li>• Maintain professional conduct at all times</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Violation of these guidelines may result in content removal, account suspension, or permanent ban.
            </p>
            <Button>Report a Violation</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
