import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  MapPin, 
  Clock, 
  Camera, 
  Globe,
  Phone,
  Mail,
  CheckCircle,
  X,
  Plus
} from "lucide-react";

const BusinessRegistration = () => {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState("");
  const [openingHours, setOpeningHours] = useState<Record<string, { open: string; close: string; closed: boolean }>>({
    monday: { open: "09:00", close: "22:00", closed: false },
    tuesday: { open: "09:00", close: "22:00", closed: false },
    wednesday: { open: "09:00", close: "22:00", closed: false },
    thursday: { open: "09:00", close: "22:00", closed: false },
    friday: { open: "09:00", close: "23:00", closed: false },
    saturday: { open: "09:00", close: "23:00", closed: false },
    sunday: { open: "", close: "", closed: true }
  });

  const businessCategories = [
    "Restaurant", "Bar/Club", "Hotel", "Gym/Fitness", "Spa/Wellness",
    "Entertainment", "Event Venue", "Retail", "Service", "Other"
  ];

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateOpeningHours = (day: string, field: string, value: string | boolean) => {
    setOpeningHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Register Your Business</h1>
              <Badge variant="outline">Step {step} of {totalSteps}</Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Tell us about your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input id="business-name" placeholder="e.g., Blue Note Jazz Club" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your business, services, and what makes it special"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+254 700 123 456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="info@yourbusiness.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input id="website" placeholder="www.yourbusiness.com" />
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={nextStep} variant="vibrant">
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details
                </CardTitle>
                <CardDescription>
                  Where is your business located?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input id="address" placeholder="Street address, building name, floor" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="e.g., Nairobi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area/Neighborhood *</Label>
                    <Input id="area" placeholder="e.g., Westlands" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location on Map</Label>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Click to set your location on the map</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                  <Button onClick={nextStep} variant="vibrant">
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Operating Hours */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Operating Hours
                </CardTitle>
                <CardDescription>
                  When is your business open?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-24 capitalize font-medium">{day}</div>
                    <div className="flex-1 flex items-center gap-2">
                      {hours.closed ? (
                        <span className="text-muted-foreground">Closed</span>
                      ) : (
                        <>
                          <Input
                            type="time"
                            value={hours.open}
                            onChange={(e) => updateOpeningHours(day, 'open', e.target.value)}
                            className="w-32"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={hours.close}
                            onChange={(e) => updateOpeningHours(day, 'close', e.target.value)}
                            className="w-32"
                          />
                        </>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateOpeningHours(day, 'closed', !hours.closed)}
                    >
                      {hours.closed ? 'Open' : 'Closed'}
                    </Button>
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Button onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                  <Button onClick={nextStep} variant="vibrant">
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Images & Final Review */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Images & Final Review
                </CardTitle>
                <CardDescription>
                  Add photos and review your information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Cover Photo</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      A high-quality image that represents your business
                    </p>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Drag and drop a cover photo, or click to browse
                      </p>
                      <Button variant="outline">Choose Cover Photo</Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Logo</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your business logo (square format recommended)
                    </p>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Button variant="outline">Upload Logo</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Review Your Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Business Type:</span>
                      <span>{businessType || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>Entertainment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="secondary">Pending Verification</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button onClick={prevStep} variant="outline">
                    Previous
                  </Button>
                  <Button variant="vibrant">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit for Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default BusinessRegistration;
