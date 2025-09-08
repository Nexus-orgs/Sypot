import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Calendar, 
  Users, 
  MessageCircle,
  Heart,
  Star,
  Ticket,
  CheckCircle,
  X,
  MoreVertical
} from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: "1",
      type: "event_reminder",
      title: "Event Reminder",
      message: "Jazz Night at Blue Note starts in 2 hours",
      time: "2 hours ago",
      read: false,
      icon: Calendar,
      avatar: "/placeholder.svg",
      actionable: true
    },
    {
      id: "2", 
      type: "friend_request",
      title: "New Friend Request",
      message: "Emma Lewis sent you a friend request",
      time: "4 hours ago",
      read: false,
      icon: Users,
      avatar: "/placeholder.svg",
      actionable: true
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      message: "Sarah Johnson: Thanks for the event recommendation!",
      time: "6 hours ago", 
      read: true,
      icon: MessageCircle,
      avatar: "/placeholder.svg",
      actionable: false
    },
    {
      id: "4",
      type: "event_like",
      title: "Event Liked",
      message: "Mike Roberts liked your event 'Rooftop Yoga Session'",
      time: "1 day ago",
      read: true,
      icon: Heart,
      avatar: "/placeholder.svg",
      actionable: false
    },
    {
      id: "5",
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message: "Your booking for Art Gallery Opening has been confirmed",
      time: "2 days ago",
      read: true,
      icon: Ticket,
      avatar: "/placeholder.svg",
      actionable: false
    },
    {
      id: "6",
      type: "review_received",
      title: "New Review",
      message: "You received a 5-star review for your event",
      time: "3 days ago",
      read: true,
      icon: Star,
      avatar: "/placeholder.svg",
      actionable: false
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconColor = (type: string) => {
    switch (type) {
      case "event_reminder":
        return "text-blue-500";
      case "friend_request":
        return "text-green-500";
      case "message":
        return "text-purple-500";
      case "event_like":
        return "text-red-500";
      case "booking_confirmed":
        return "text-orange-500";
      case "review_received":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const markAsRead = (id: string) => {
    // Handle marking notification as read
    console.log("Mark as read:", id);
  };

  const markAllAsRead = () => {
    // Handle marking all notifications as read
    console.log("Mark all as read");
  };

  const NotificationCard = ({ notification }: { notification: any }) => {
    const IconComponent = notification.icon;
    
    return (
      <Card className={`transition-colors ${!notification.read ? 'bg-muted/50 border-primary/20' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className={`p-2 rounded-full bg-muted ${getIconColor(notification.type)}`}>
                <IconComponent className="h-5 w-5" />
              </div>
              {!notification.read && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              {notification.actionable && !notification.read && (
                <div className="flex gap-2 mt-3">
                  {notification.type === "friend_request" && (
                    <>
                      <Button size="sm" variant="vibrant">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </>
                  )}
                  {notification.type === "event_reminder" && (
                    <Button size="sm" variant="vibrant">
                      View Event
                    </Button>
                  )}
                </div>
              )}
              
              {!notification.read && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="mt-2 h-8 text-xs"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read;
    if (filter === "events") return notification.type.includes("event");
    if (filter === "social") return ["friend_request", "message", "event_like"].includes(notification.type);
    return true;
  });

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your Sypot activity
              </p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{unreadCount}</div>
              <div className="text-sm text-muted-foreground">Unread</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{notifications.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">3</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="events">
              Events
            </TabsTrigger>
            <TabsTrigger value="social">
              Social
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === "unread" 
                    ? "You're all caught up! No unread notifications."
                    : "No notifications to show for this filter."
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="/activity">Activity</Link>
          </Button>
          <Button variant="vibrant" asChild>
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;