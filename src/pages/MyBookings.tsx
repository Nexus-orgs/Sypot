import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket,
  QrCode,
  Download,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const upcomingBookings = [
    {
      id: 1,
      eventTitle: "Jazz Night at Blue Note",
      eventDate: "Jan 15, 2024",
      eventTime: "8:00 PM",
      location: "Blue Note Jazz Club, Westlands",
      ticketType: "General Admission",
      price: 1500,
      status: "confirmed",
      qrCode: "QR123456",
      bookingDate: "Jan 10, 2024"
    },
    {
      id: 2,
      eventTitle: "Rooftop Yoga Session",
      eventDate: "Jan 20, 2024",
      eventTime: "7:00 AM",
      location: "Karen Country Club",
      ticketType: "Early Bird",
      price: 0,
      status: "confirmed",
      qrCode: "QR789012",
      bookingDate: "Jan 12, 2024"
    }
  ];

  const pastBookings = [
    {
      id: 3,
      eventTitle: "Tech Meetup Nairobi",
      eventDate: "Jan 5, 2024",
      eventTime: "6:00 PM",
      location: "iHub, Ngong Road",
      ticketType: "Free Entry",
      price: 0,
      status: "attended",
      qrCode: "QR345678",
      bookingDate: "Dec 28, 2023"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "attended":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const BookingCard = ({ booking, showActions = true }: { booking: any, showActions?: boolean }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{booking.eventTitle}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {booking.eventDate} at {booking.eventTime}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {booking.location}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Ticket className="h-4 w-4" />
            {booking.ticketType} - {booking.price > 0 ? `KES ${booking.price.toLocaleString()}` : "Free"}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            Booked on {booking.bookingDate}
          </div>
        </div>

        {showActions && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm">
              <QrCode className="h-4 w-4 mr-2" />
              Show QR Code
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Event Chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              Manage your event tickets and reservations
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Events ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover amazing events and book your tickets
                  </p>
                  <Button variant="vibrant" asChild>
                    <Link to="/explore">Explore Events</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} showActions={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past events</h3>
                  <p className="text-muted-foreground">
                    Your attended events will appear here
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" asChild>
              <Link to="/events">Browse Events</Link>
            </Button>
            <Button variant="vibrant" asChild>
              <Link to="/profile">View Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBookings;
