import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Accessibility as AccessibilityIcon, Eye, Ear, Brain, Keyboard, Monitor, Smartphone } from 'lucide-react';

export const Accessibility: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <AccessibilityIcon className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-6">Accessibility</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              We're committed to making Vibe Connect accessible to everyone.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2>Our Commitment</h2>
            <p>
              Vibe Connect is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Eye className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Visual</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• High contrast mode</li>
                  <li>• Screen reader support</li>
                  <li>• Resizable text</li>
                  <li>• Alternative text for images</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Ear className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Auditory</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Video captions</li>
                  <li>• Visual notifications</li>
                  <li>• Transcripts available</li>
                  <li>• No audio-only content</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Keyboard className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Motor</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Keyboard navigation</li>
                  <li>• Large click targets</li>
                  <li>• Focus indicators</li>
                  <li>• Skip navigation links</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Accessibility Issues</CardTitle>
              <CardDescription>
                Help us improve by reporting any accessibility barriers you encounter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you encounter any accessibility barriers or have suggestions for improvement, 
                please contact our accessibility team.
              </p>
              <Button>Contact Accessibility Team</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
