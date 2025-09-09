import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Rocket, 
  Heart, 
  TrendingUp,
  Send,
  Upload,
  FileText,
  Check,
  Star,
  Trophy,
  Target,
  Zap,
  Coffee,
  Gift,
  Shield,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  deadline?: string;
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    coverLetter: "",
    resume: null as File | null,
    experience: "",
    availability: "",
    salary: "",
    referral: "",
  });
  const { toast } = useToast();

  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Nairobi, Kenya (Hybrid)",
      type: "Full-time",
      level: "Senior",
      salary: "KES 200,000 - 350,000",
      description: "Join our engineering team to build the future of event discovery. You'll work on cutting-edge features using React, Node.js, and PostgreSQL.",
      requirements: [
        "5+ years of experience with React and Node.js",
        "Strong understanding of PostgreSQL and database design",
        "Experience with real-time applications",
        "Excellent problem-solving skills",
        "Team player with great communication skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Health insurance for you and family",
        "Flexible working hours",
        "Learning & development budget",
        "Team building events"
      ],
      posted: "2 days ago",
      deadline: "Dec 31, 2024"
    },
    {
      id: "2",
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      level: "Mid-Senior",
      salary: "KES 150,000 - 250,000",
      description: "Design beautiful and intuitive experiences for millions of users discovering events and places.",
      requirements: [
        "3+ years of product design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing mobile and web design",
        "Understanding of user research methodologies",
        "Experience with design sprints"
      ],
      benefits: [
        "Work from anywhere",
        "Top-tier equipment",
        "Annual design conference budget",
        "Health and wellness stipend",
        "Quarterly team retreats"
      ],
      posted: "1 week ago"
    },
    {
      id: "3",
      title: "Community Manager",
      department: "Marketing",
      location: "Nairobi, Kenya",
      type: "Full-time",
      level: "Mid",
      salary: "KES 80,000 - 150,000",
      description: "Build and nurture our community of event organizers and attendees across Kenya.",
      requirements: [
        "2+ years in community management",
        "Excellent written and verbal communication",
        "Experience with social media management",
        "Event planning experience is a plus",
        "Passion for local culture and events"
      ],
      benefits: [
        "Event attendance budget",
        "Flexible schedule",
        "Career growth opportunities",
        "Health insurance",
        "Performance bonuses"
      ],
      posted: "3 days ago"
    },
    {
      id: "4",
      title: "Data Analyst",
      department: "Analytics",
      location: "Nairobi, Kenya (Hybrid)",
      type: "Full-time",
      level: "Junior-Mid",
      salary: "KES 100,000 - 180,000",
      description: "Help us understand user behavior and optimize the platform through data-driven insights.",
      requirements: [
        "2+ years of data analysis experience",
        "Proficiency in SQL and Python",
        "Experience with visualization tools (Tableau, PowerBI)",
        "Strong analytical and problem-solving skills",
        "Business acumen"
      ],
      benefits: [
        "Learning opportunities",
        "Hybrid work model",
        "Health coverage",
        "Stock options",
        "Annual bonus"
      ],
      posted: "5 days ago"
    },
    {
      id: "5",
      title: "Business Development Manager",
      department: "Sales",
      location: "Nairobi, Kenya",
      type: "Full-time",
      level: "Senior",
      salary: "KES 150,000 - 300,000 + Commission",
      description: "Drive partnerships with event organizers and businesses to expand our platform.",
      requirements: [
        "5+ years in B2B sales or business development",
        "Proven track record of closing deals",
        "Strong network in events/hospitality industry",
        "Excellent negotiation skills",
        "Self-motivated and results-driven"
      ],
      benefits: [
        "Uncapped commission",
        "Company car allowance",
        "Premium health insurance",
        "Performance incentives",
        "Executive coaching"
      ],
      posted: "1 day ago"
    },
    {
      id: "6",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      level: "Mid-Senior",
      salary: "KES 180,000 - 280,000",
      description: "Ensure our infrastructure scales smoothly as we grow to millions of users.",
      requirements: [
        "3+ years of DevOps experience",
        "Experience with AWS/GCP",
        "Docker and Kubernetes expertise",
        "CI/CD pipeline management",
        "Infrastructure as Code (Terraform)"
      ],
      benefits: [
        "Remote-first culture",
        "Equipment budget",
        "Conference attendance",
        "Flexible hours",
        "Equity package"
      ],
      posted: "4 days ago"
    }
  ];

  const companyValues = [
    { icon: Heart, title: "User First", description: "Everything we do starts with our users' needs" },
    { icon: Rocket, title: "Innovation", description: "We constantly push boundaries and try new things" },
    { icon: Users, title: "Collaboration", description: "Great ideas come from working together" },
    { icon: Trophy, title: "Excellence", description: "We strive for excellence in everything we do" },
    { icon: Globe, title: "Diversity", description: "We celebrate diverse perspectives and backgrounds" },
    { icon: Shield, title: "Integrity", description: "We do the right thing, even when no one's watching" }
  ];

  const perks = [
    { icon: DollarSign, title: "Competitive Salary", description: "Market-leading compensation packages" },
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance and gym membership" },
    { icon: TrendingUp, title: "Career Growth", description: "Clear progression paths and mentorship" },
    { icon: Coffee, title: "Work-Life Balance", description: "Flexible hours and unlimited PTO" },
    { icon: Gift, title: "Stock Options", description: "Own a piece of the company you're building" },
    { icon: Zap, title: "Latest Tech", description: "Top-tier equipment and tools" }
  ];

  const handleJobApplication = async () => {
    if (applicationStep === 1) {
      // Validate step 1
      if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      setApplicationStep(2);
    } else if (applicationStep === 2) {
      // Validate step 2
      if (!applicationData.coverLetter || !applicationData.resume) {
        toast({
          title: "Missing Documents",
          description: "Please provide both cover letter and resume",
          variant: "destructive"
        });
        return;
      }
      setApplicationStep(3);
    } else if (applicationStep === 3) {
      // Submit application
      try {
        // Here we would normally upload the resume and save to database
        // For demo, we'll simulate the submission
        
        // Create email body
        const emailBody = `
New Job Application Received

Position: ${selectedJob?.title}
Department: ${selectedJob?.department}

Applicant Information:
- Name: ${applicationData.fullName}
- Email: ${applicationData.email}
- Phone: ${applicationData.phone}
- LinkedIn: ${applicationData.linkedIn || 'Not provided'}
- Portfolio: ${applicationData.portfolio || 'Not provided'}

Experience: ${applicationData.experience}
Availability: ${applicationData.availability}
Expected Salary: ${applicationData.salary}
Referral: ${applicationData.referral || 'None'}

Cover Letter:
${applicationData.coverLetter}

Resume: [Attached]
        `;

        // Simulate sending email (in production, this would use a backend email service)
        console.log("Sending application email:", emailBody);

        toast({
          title: "Application Submitted! 🎉",
          description: "We've received your application and will review it shortly.",
        });

        // Reset form
        setShowApplicationDialog(false);
        setApplicationStep(1);
        setApplicationData({
          fullName: "",
          email: "",
          phone: "",
          linkedIn: "",
          portfolio: "",
          coverLetter: "",
          resume: null,
          experience: "",
          availability: "",
          salary: "",
          referral: "",
        });
      } catch (error) {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      setApplicationData({ ...applicationData, resume: file });
    }
  };

  return (
    <Layout>
      <SEO 
        title="Careers at Sypot - Join Our Team" 
        description="Build the future of event discovery with us. Explore exciting career opportunities at Sypot."
        canonical="/careers"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Briefcase className="h-3 w-3 mr-1" />
              We're Hiring!
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join the Sypot Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Help us connect millions of people with amazing experiences
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-medium">{jobs.length} Open Positions</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Remote & On-site</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">50+ Team Members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Company Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <value.icon className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Perks & Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Perks & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <perk.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.type}
                            </span>
                            {job.salary && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">{job.level}</Badge>
                        <span className="text-xs text-muted-foreground">{job.posted}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{job.description}</p>
                    <Button 
                      onClick={() => {
                        setSelectedJob(job);
                        setShowApplicationDialog(true);
                      }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="engineering" className="space-y-4">
              {jobs.filter(j => j.department === "Engineering").map((job) => (
                <Card key={job.id}>
                  {/* Same card content as above */}
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
            
            {/* Similar for other tabs */}
          </Tabs>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Step {applicationStep} of 3 - {applicationStep === 1 ? "Personal Information" : applicationStep === 2 ? "Documents" : "Additional Information"}
            </DialogDescription>
          </DialogHeader>

          {applicationStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={applicationData.fullName}
                    onChange={(e) => setApplicationData({...applicationData, fullName: e.target.value})}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                    placeholder="+254 700 000 000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    value={applicationData.linkedIn}
                    onChange={(e) => setApplicationData({...applicationData, linkedIn: e.target.value})}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio/Website</Label>
                <Input
                  id="portfolio"
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                  placeholder="https://johndoe.com"
                />
              </div>
            </div>
          )}

          {applicationStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                  placeholder="Tell us why you're excited about this role..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="resume">Resume/CV * (PDF, DOC, DOCX - Max 5MB)</Label>
                <div className="mt-2">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    required
                  />
                  {applicationData.resume && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      <span>{applicationData.resume.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {applicationStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Years of Relevant Experience</Label>
                <Select value={applicationData.experience} onValueChange={(value) => setApplicationData({...applicationData, experience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-5">4-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">When can you start?</Label>
                <Select value={applicationData.availability} onValueChange={(value) => setApplicationData({...applicationData, availability: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="2weeks">2 weeks</SelectItem>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="2months">2 months</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="salary">Expected Salary (KES)</Label>
                <Input
                  id="salary"
                  value={applicationData.salary}
                  onChange={(e) => setApplicationData({...applicationData, salary: e.target.value})}
                  placeholder="e.g., 150,000 - 200,000"
                />
              </div>

              <div>
                <Label htmlFor="referral">How did you hear about this position?</Label>
                <Input
                  id="referral"
                  value={applicationData.referral}
                  onChange={(e) => setApplicationData({...applicationData, referral: e.target.value})}
                  placeholder="e.g., LinkedIn, Friend, Job Board"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            {applicationStep > 1 && (
              <Button variant="outline" onClick={() => setApplicationStep(applicationStep - 1)}>
                Previous
              </Button>
            )}
            <Button onClick={handleJobApplication}>
              {applicationStep === 3 ? (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Application
                </>
              ) : (
                "Next"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Careers;