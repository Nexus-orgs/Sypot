"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, DollarSign, Users, Clock, Share2, Heart, MessageCircle, Star, Loader2 } from "lucide-react"
import { clientQueries } from "@/lib/supabase/queries"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import type { Event, Business } from "@/lib/supabase/types"

const EventDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { toast } = useToast()
  const [event, setEvent] = useState<(Event & { businesses?: Business }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isGoing, setIsGoing] = useState(false)
  const [reservationLoading, setReservationLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchEvent(id)
    }
  }, [id])

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true)
      const { data, error } = await clientQueries.getEvent(eventId)

      if (error) throw error
      if (data) {
        setEvent(data)
      }
    } catch (error) {
      console.error("Error fetching event:", error)
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReservation = async () => {
    if (!user || !event) {
      toast({
        title: "Sign in required",
        description: "Please sign in to make a reservation",
        variant: "destructive",
      })
      return
    }

    try {
      setReservationLoading(true)

      const reservationData = {
        user_id: user.id,
        event_id: event.id,
        reservation_date: event.start_date,
        party_size: 1,
        contact_email: user.email || "",
        status: "pending" as const,
      }

      const { error } = await clientQueries.createReservation(reservationData)

      if (error) throw error

      setIsGoing(true)
      toast({
        title: "Reservation confirmed!",
        description: "You've successfully reserved your spot for this event",
      })
    } catch (error: any) {
      toast({
        title: "Reservation failed",
        description: error.message || "Failed to create reservation",
        variant: "destructive",
      })
    } finally {
      setReservationLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading event details...</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Not Found</CardTitle>
              <CardDescription>The event you're looking for doesn't exist or has been removed.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/events">Browse Events</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="aspect-video bg-gradient-primary rounded-lg relative overflow-hidden">
              {event.image_url ? (
                <img
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
              )}
              <Badge className="absolute top-4 left-4 bg-white/20 text-white border-white/30">{event.category}</Badge>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-white/20 text-white hover:bg-white/30"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="icon" variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold">{event.title}</h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{format(new Date(event.start_date), "MMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>
                    {format(new Date(event.start_date), "h:mm a")} - {format(new Date(event.end_date), "h:mm a")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">About this event</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description || "No description available for this event."}
                </p>
              </div>

              <Separator />

              {/* Business/Organizer Info */}
              {event.businesses && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Hosted by</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={event.businesses.image_url || "/placeholder.svg"} />
                      <AvatarFallback>{event.businesses.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{event.businesses.name}</span>
                        {event.businesses.is_verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span>
                          {event.businesses.rating || 0} ({event.businesses.review_count || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Attendees */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Going ({event.current_attendees || 0})</h3>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {/* Mock attendee avatars - in production, fetch real attendee data */}
                    {Array.from({ length: Math.min(4, event.current_attendees || 0) }).map((_, index) => (
                      <Avatar key={index} className="border-2 border-background">
                        <AvatarFallback>U{index + 1}</AvatarFallback>
                      </Avatar>
                    ))}
                    {(event.current_attendees || 0) > 4 && (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium border-2 border-background">
                        +{(event.current_attendees || 0) - 4}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {event.is_free ? "Free Event" : "Ticket Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {event.is_free ? "FREE" : `KES ${(event.price || 0).toLocaleString()}`}
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Available
                  </Badge>
                </div>

                {event.max_attendees && (
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Available spots:</span>
                      <span>{event.max_attendees - (event.current_attendees || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total capacity:</span>
                      <span>{event.max_attendees}</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  variant="vibrant"
                  onClick={handleReservation}
                  disabled={reservationLoading || isGoing}
                >
                  {reservationLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : isGoing ? (
                    "Reservation Confirmed"
                  ) : event.is_free ? (
                    "RSVP"
                  ) : (
                    "Get Ticket"
                  )}
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Find People to Go With
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">{event.address}</p>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link to="/map">View on Map</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
          <Button variant="vibrant" asChild>
            <Link to="/friends">Find People</Link>
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default EventDetails
