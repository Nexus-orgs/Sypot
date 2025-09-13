"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Calendar, DollarSign, Users, Clock, Building2, Activity, Loader2 } from "lucide-react"
import { clientQueries } from "@/lib/supabase/queries"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import type { Event, Business } from "@/lib/supabase/types"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [dateFilter, setDateFilter] = useState("all")
  const [events, setEvents] = useState<Event[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const categories = [
    { id: "all", label: "All", icon: "🎯" },
    { id: "Music & Entertainment", label: "Music", icon: "🎵" },
    { id: "Food & Drink", label: "Food & Drink", icon: "🍴" },
    { id: "Sports & Recreation", label: "Sports", icon: "⚽" },
    { id: "Arts & Culture", label: "Culture", icon: "🎨" },
    { id: "Bar & Nightlife", label: "Nightlife", icon: "🌃" },
    { id: "Outdoor & Adventure", label: "Outdoor", icon: "🏞️" },
    { id: "Fitness & Wellness", label: "Wellness", icon: "🧘" },
    { id: "Technology", label: "Tech", icon: "💻" },
    { id: "Social & Networking", label: "Social", icon: "👥" },
  ]

  const dateFilters = [
    { value: "all", label: "All Dates" },
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "this_week", label: "This Week" },
    { value: "this_weekend", label: "This Weekend" },
    { value: "next_week", label: "Next Week" },
    { value: "this_month", label: "This Month" },
  ]

  useEffect(() => {
    fetchEvents()
    fetchBusinesses()
  }, [activeFilter, dateFilter, priceRange])

  const fetchEvents = async () => {
    try {
      setLoading(true)

      const filters: any = {
        limit: 20,
      }

      if (activeFilter !== "all") {
        filters.category = activeFilter
      }

      // Apply date filter
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      switch (dateFilter) {
        case "today":
          filters.start_date_gte = today.toISOString()
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
          filters.start_date_lt = tomorrow.toISOString()
          break
        case "tomorrow":
          const tomorrowStart = new Date(today)
          tomorrowStart.setDate(tomorrowStart.getDate() + 1)
          filters.start_date_gte = tomorrowStart.toISOString()
          const dayAfterTomorrow = new Date(tomorrowStart)
          dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1)
          filters.start_date_lt = dayAfterTomorrow.toISOString()
          break
        case "this_week":
          const endOfWeek = new Date(today)
          endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()))
          filters.start_date_lte = endOfWeek.toISOString()
          break
        case "this_weekend":
          const friday = new Date(today)
          friday.setDate(friday.getDate() + (5 - friday.getDay()))
          filters.start_date_gte = friday.toISOString()
          const monday = new Date(friday)
          monday.setDate(monday.getDate() + 3)
          filters.start_date_lt = monday.toISOString()
          break
        case "this_month":
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
          filters.start_date_lte = endOfMonth.toISOString()
          break
      }

      const { data, error } = await clientQueries.getEvents(filters)

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const fetchBusinesses = async () => {
    try {
      const filters: any = {
        limit: 20,
      }

      if (activeFilter !== "all") {
        filters.category = activeFilter
      }

      const { data, error } = await clientQueries.getBusinesses(filters)

      if (error) throw error
      setBusinesses(data || [])
    } catch (error) {
      console.error("Error fetching businesses:", error)
      setBusinesses([])
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchEvents()
    fetchBusinesses()
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events, places, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button type="submit" className="h-12">
              Search
            </Button>

            {/* Filter Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 bg-transparent">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Results</SheetTitle>
                  <SheetDescription>Refine your search with these filters</SheetDescription>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  {/* Date Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateFilters.map((filter) => (
                          <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Price Range (KES {priceRange[0]} - {priceRange[1]})
                    </label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={10000} step={100} className="mt-2" />
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setDateFilter("all")
                      setPriceRange([0, 10000])
                      setActiveFilter("all")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </form>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                size="sm"
                className="rounded-full"
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events ({events.length})
            </TabsTrigger>
            <TabsTrigger value="places">
              <Building2 className="h-4 w-4 mr-2" />
              Places ({businesses.length})
            </TabsTrigger>
            <TabsTrigger value="activities">
              <Activity className="h-4 w-4 mr-2" />
              Activities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button onClick={() => navigate("/create-event")}>Create an Event</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/40 relative overflow-hidden">
                      {event.image_url ? (
                        <img
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <Badge className="absolute top-3 left-3 bg-white/90">
                        {categories.find((c) => c.id === event.category)?.icon} {event.category}
                      </Badge>
                      {event.is_free && <Badge className="absolute top-3 right-3 bg-green-500 text-white">FREE</Badge>}
                      {event.is_featured && (
                        <Badge className="absolute bottom-3 left-3 bg-yellow-500 text-black">Featured</Badge>
                      )}
                      {event.is_trending && (
                        <Badge className="absolute bottom-3 right-3 bg-red-500 text-white">Trending</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {format(new Date(event.start_date), "MMM dd, yyyy - h:mm a")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            {event.is_free ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              <>
                                <DollarSign className="h-4 w-4" />
                                KES {(event.price || 0).toLocaleString()}
                              </>
                            )}
                          </div>
                          {event.max_attendees && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {event.current_attendees || 0} going
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="places" className="mt-6">
            {businesses.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No places found</h3>
                <p className="text-muted-foreground mb-4">Discover amazing venues and businesses</p>
                <Button onClick={() => navigate("/business/register")}>Register Your Business</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {businesses.map((business) => (
                  <Card
                    key={business.id}
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/40 relative">
                      {business.image_url ? (
                        <img
                          src={business.image_url || "/placeholder.svg"}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-secondary/40" />
                      )}
                      {business.is_verified && (
                        <Badge className="absolute top-3 right-3 bg-blue-500 text-white">Verified</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{business.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {business.city}, {business.state}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {business.description || "No description available"}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-500">★</span>
                            <span>{business.rating || 0}</span>
                            <span className="text-muted-foreground">({business.review_count || 0})</span>
                          </div>
                          {business.price_range && <Badge variant="outline">{business.price_range}</Badge>}
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Activities Coming Soon</h3>
              <p className="text-muted-foreground mb-4">Find group activities and social gatherings</p>
              <Button onClick={() => navigate("/create-event")}>Create an Activity</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Explore
