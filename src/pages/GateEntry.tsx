import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  QrCode,
  Camera,
  Search,
  CheckCircle,
  XCircle,
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  Ticket,
  Download,
  RefreshCw,
  Shield,
  Zap,
  TrendingUp,
  BarChart3,
  Activity,
  Smartphone,
  ScanLine
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketData {
  id: string;
  ticketCode: string;
  holderName: string;
  holderEmail: string;
  ticketType: string;
  status: "valid" | "used" | "invalid" | "expired";
  checkInTime?: string;
  eventId: string;
  eventName: string;
}

interface EventStats {
  totalTickets: number;
  checkedIn: number;
  pending: number;
  vipTickets: number;
  generalTickets: number;
  recentCheckIns: Array<{
    name: string;
    time: string;
    type: string;
  }>;
}

const GateEntry = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [scanMode, setScanMode] = useState<"qr" | "manual">("qr");
  const [manualCode, setManualCode] = useState("");
  const [scanning, setScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState<TicketData | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"success" | "error" | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mock event stats
  const [eventStats, setEventStats] = useState<EventStats>({
    totalTickets: 500,
    checkedIn: 237,
    pending: 263,
    vipTickets: 50,
    generalTickets: 450,
    recentCheckIns: [
      { name: "John Doe", time: "2 min ago", type: "VIP" },
      { name: "Jane Smith", time: "5 min ago", type: "General" },
      { name: "Mike Johnson", time: "8 min ago", type: "General" },
      { name: "Sarah Williams", time: "12 min ago", type: "VIP" },
      { name: "Tom Brown", time: "15 min ago", type: "General" },
    ]
  });

  // Mock ticket database
  const mockTickets: { [key: string]: TicketData } = {
    "SYPOT-123456": {
      id: "1",
      ticketCode: "SYPOT-123456",
      holderName: "John Doe",
      holderEmail: "john@example.com",
      ticketType: "VIP",
      status: "valid",
      eventId: "event-1",
      eventName: "Jazz Night at Blue Note"
    },
    "SYPOT-789012": {
      id: "2",
      ticketCode: "SYPOT-789012",
      holderName: "Jane Smith",
      holderEmail: "jane@example.com",
      ticketType: "General",
      status: "valid",
      eventId: "event-1",
      eventName: "Jazz Night at Blue Note"
    },
    "SYPOT-345678": {
      id: "3",
      ticketCode: "SYPOT-345678",
      holderName: "Mike Johnson",
      holderEmail: "mike@example.com",
      ticketType: "General",
      status: "used",
      checkInTime: "2024-12-15 20:30",
      eventId: "event-1",
      eventName: "Jazz Night at Blue Note"
    },
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        // Start QR code scanning
        scanQRCode();
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    // Simulate QR code detection (in production, use a QR library like qr-scanner)
    const scanInterval = setInterval(() => {
      if (!cameraActive) {
        clearInterval(scanInterval);
        return;
      }

      // Draw video frame to canvas
      context.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
      
      // Simulate QR code detection after 3 seconds
      setTimeout(() => {
        if (cameraActive) {
          handleTicketVerification("SYPOT-123456"); // Simulate detected QR code
          stopCamera();
          clearInterval(scanInterval);
        }
      }, 3000);
    }, 100);
  };

  const handleTicketVerification = async (code: string) => {
    setScanning(true);
    setVerificationResult(null);
    setVerificationStatus(null);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const ticket = mockTickets[code.toUpperCase()];

    if (ticket) {
      if (ticket.status === "valid") {
        // Mark ticket as used
        ticket.status = "used";
        ticket.checkInTime = new Date().toLocaleString();
        
        setVerificationResult(ticket);
        setVerificationStatus("success");
        
        // Update stats
        setEventStats(prev => ({
          ...prev,
          checkedIn: prev.checkedIn + 1,
          pending: prev.pending - 1,
          recentCheckIns: [
            { 
              name: ticket.holderName, 
              time: "Just now", 
              type: ticket.ticketType 
            },
            ...prev.recentCheckIns.slice(0, 4)
          ]
        }));

        toast({
          title: "✅ Ticket Valid",
          description: `${ticket.holderName} - ${ticket.ticketType} ticket checked in`,
        });
      } else if (ticket.status === "used") {
        setVerificationResult(ticket);
        setVerificationStatus("error");
        toast({
          title: "⚠️ Ticket Already Used",
          description: `This ticket was checked in at ${ticket.checkInTime}`,
          variant: "destructive"
        });
      } else {
        setVerificationResult(ticket);
        setVerificationStatus("error");
        toast({
          title: "❌ Invalid Ticket",
          description: "This ticket is not valid for this event",
          variant: "destructive"
        });
      }
    } else {
      setVerificationStatus("error");
      toast({
        title: "❌ Ticket Not Found",
        description: "No ticket found with this code",
        variant: "destructive"
      });
    }

    setScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode) {
      handleTicketVerification(manualCode);
      setManualCode("");
    }
  };

  const exportAttendeeList = () => {
    // Simulate CSV export
    const csvContent = "Name,Email,Ticket Type,Check-in Time\n" +
      Object.values(mockTickets)
        .filter(t => t.status === "used")
        .map(t => `${t.holderName},${t.holderEmail},${t.ticketType},${t.checkInTime || ""}`)
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendees-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({
      title: "Export Complete",
      description: "Attendee list has been downloaded",
    });
  };

  const checkInPercentage = Math.round((eventStats.checkedIn / eventStats.totalTickets) * 100);

  if (profile?.user_type !== 'organizer' && profile?.user_type !== 'admin') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                Only event organizers can access the gate entry system
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Gate Entry System - Event Check-in | Sypot" 
        description="Manage event check-ins and verify tickets"
        canonical="/gate-entry"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Gate Entry System</h1>
              <p className="text-muted-foreground">Jazz Night at Blue Note - Dec 15, 2024</p>
            </div>
            <Button onClick={exportAttendeeList} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Attendees
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tickets</p>
                    <p className="text-2xl font-bold">{eventStats.totalTickets}</p>
                  </div>
                  <Ticket className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Checked In</p>
                    <p className="text-2xl font-bold text-green-600">{eventStats.checkedIn}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{eventStats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in Rate</p>
                    <p className="text-2xl font-bold">{checkInPercentage}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Check-in Progress</span>
              <span>{eventStats.checkedIn} / {eventStats.totalTickets}</span>
            </div>
            <Progress value={checkInPercentage} className="h-3" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scanner Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Verification</CardTitle>
                <CardDescription>Scan QR code or enter ticket number manually</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={scanMode} onValueChange={(v) => setScanMode(v as "qr" | "manual")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="qr">
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Scanner
                    </TabsTrigger>
                    <TabsTrigger value="manual">
                      <Search className="h-4 w-4 mr-2" />
                      Manual Entry
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="qr" className="space-y-4">
                    <div className="relative">
                      {!cameraActive ? (
                        <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                          <Button onClick={startCamera} size="lg">
                            <Camera className="h-5 w-5 mr-2" />
                            Start Scanner
                          </Button>
                        </div>
                      ) : (
                        <div className="relative">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full rounded-lg"
                          />
                          <canvas
                            ref={canvasRef}
                            className="hidden"
                            width={640}
                            height={480}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 border-2 border-primary rounded-lg">
                              <div className="w-full h-full relative">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-0 right-0 text-center">
                            <Badge variant="secondary" className="bg-black/50 text-white">
                              <ScanLine className="h-3 w-3 mr-1 animate-pulse" />
                              Scanning...
                            </Badge>
                          </div>
                          <Button
                            onClick={stopCamera}
                            size="sm"
                            variant="destructive"
                            className="absolute top-4 right-4"
                          >
                            Stop
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Alert>
                      <Smartphone className="h-4 w-4" />
                      <AlertDescription>
                        Position the QR code within the frame. The scanner will automatically detect and verify the ticket.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-4">
                    <form onSubmit={handleManualSubmit}>
                      <div className="space-y-4">
                        <div>
                          <Input
                            placeholder="Enter ticket code (e.g., SYPOT-123456)"
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            className="text-center text-lg font-mono"
                            disabled={scanning}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={scanning || !manualCode}>
                          {scanning ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <Search className="h-4 w-4 mr-2" />
                              Verify Ticket
                            </>
                          )}
                        </Button>
                      </div>
                    </form>

                    <div className="text-center text-sm text-muted-foreground">
                      <p>Enter the 12-character ticket code</p>
                      <p>Format: SYPOT-XXXXXX</p>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Verification Result */}
                {verificationResult && (
                  <div className="mt-6">
                    <Card className={verificationStatus === "success" ? "border-green-500" : "border-red-500"}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            {verificationStatus === "success" ? (
                              <>
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                Valid Ticket
                              </>
                            ) : (
                              <>
                                <XCircle className="h-6 w-6 text-red-600" />
                                Invalid Ticket
                              </>
                            )}
                          </CardTitle>
                          <Badge variant={verificationResult.ticketType === "VIP" ? "default" : "secondary"}>
                            {verificationResult.ticketType}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Ticket Code:</span>
                            <span className="font-mono">{verificationResult.ticketCode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Name:</span>
                            <span>{verificationResult.holderName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Email:</span>
                            <span>{verificationResult.holderEmail}</span>
                          </div>
                          {verificationResult.checkInTime && (
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Checked in at:</span>
                              <span>{verificationResult.checkInTime}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ticket Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">VIP Tickets</span>
                      <span className="text-sm font-medium">
                        {Math.round(eventStats.vipTickets * (checkInPercentage / 100))} / {eventStats.vipTickets}
                      </span>
                    </div>
                    <Progress 
                      value={checkInPercentage} 
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">General Tickets</span>
                      <span className="text-sm font-medium">
                        {Math.round(eventStats.generalTickets * (checkInPercentage / 100))} / {eventStats.generalTickets}
                      </span>
                    </div>
                    <Progress 
                      value={checkInPercentage} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Check-ins</CardTitle>
                <CardDescription>Last 5 attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventStats.recentCheckIns.map((checkIn, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{checkIn.name}</p>
                          <p className="text-xs text-muted-foreground">{checkIn.time}</p>
                        </div>
                      </div>
                      <Badge variant={checkIn.type === "VIP" ? "default" : "secondary"}>
                        {checkIn.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
                <Button className="w-full" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
                <Button className="w-full" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Alert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GateEntry;