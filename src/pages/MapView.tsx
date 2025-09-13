"use client"

import { useState } from "react"
import { Layout } from "@/components/Layout"
import { SEO } from "@/components/SEO"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Map,
  Search,
  Filter,
  Navigation,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star,
  Layers,
  Compass,
  Route,
  Car,
  Bike,
  Footprints,
  X,
  Maximize,
  Minimize,
  RefreshCw,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

interface MapItem {
  id: string
  title: string
  category: string
  location: string
  coordinates: { lat: number; lng: number }
  type: "event" | "business"
  price?: string
  rating?: number
  attendees?: number
  reviews?: number
  openNow?: boolean
  date?: string
  time?: string
  distance?: number
}

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mapRadius, setMapRadius] = useState([5])
  const [showTraffic, setShowTraffic] = useState(false)
  const [showTransit, setShowTransit] = useState(false)
  const [mapStyle, setMapStyle] = useState("default")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [travelMode, setTravelMode] = useState("driving")
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)
  const navigate = useNavigate()

  const mapItems: MapItem[] = [
    {
      id: "1",
      title: "Jazz Night at Blue Note",
      category: "Music",
      type: "event",
      date: "Tonight",
      time: "8:00 PM",
      location: "Westlands",
      coordinates: { lat: -1.2621, lng: 36.8054 },
      price: "KES 1,500",
      attendees: 45,
      rating: 4.8,
      distance: 2.3,
    },
    {
      id: "2",
      title: "Rooftop Yoga Session",
      category: "Sports",
      type: "event",
      date: "Tomorrow",
      time: "7:00 AM",
      location: "Karen",
      coordinates: { lat: -1.3197, lng: 36.7077 },
      price: "Free",
      attendees: 12,
      rating: 4.9,
      distance: 8.7,
    },
    {
      id: "3",
      title: "Art Gallery Opening",
      category: "Culture",
      type: "event",
      date: "Saturday",
      time: "6:00 PM",
      location: "Museum Hill",
      coordinates: { lat: -1.2881, lng: 36.8233 },
      price: "KES 500",
      attendees: 78,
      rating: 4.7,
      distance: 4.1,
    },
    {
      id: "4",
      title: "Blue Note Jazz Club",
      category: "Entertainment",
      type: "business",
      location: "Westlands",
      coordinates: { lat: -1.2621, lng: 36.8054 },
      rating: 4.8,
      reviews: 124,
      openNow: true,
      distance: 2.3,
    },
    {
      id: "5",
      title: "Karen Country Club",
      category: "Sports & Recreation",
      type: "business",
      location: "Karen",
      coordinates: { lat: -1.3197, lng: 36.7077 },
      rating: 4.6,
      reviews: 89,
      openNow: true,
      distance: 8.7,
    },
    {
      id: "6",
      title: "Nairobi National Museum",
      category: "Culture",
      type: "business",
      location: "Museum Hill",
      coordinates: { lat: -1.2881, lng: 36.8233 },
      rating: 4.5,
      reviews: 256,
      openNow: true,
      distance: 4.1,
    },
  ]

  const filters = [
    { id: "all", label: "All", count: mapItems.length },
    { id: "events", label: "Events", count: mapItems.filter((item) => item.type === "event").length },
    { id: "businesses", label: "Places", count: mapItems.filter((item) => item.type === "business").length },
    { id: "music", label: "Music", count: mapItems.filter((item) => item.category === "Music").length },
    { id: "food", label: "Food & Drink", count: 0 },
    { id: "sports", label: "Sports", count: mapItems.filter((item) => item.category.includes("Sports")).length },
  ]

  const mapStyles = [
    { value: "default", label: "Default" },
    { value: "satellite", label: "Satellite" },
    { value: "terrain", label: "Terrain" },
    { value: "dark", label: "Dark Mode" },
  ]

  const travelModes = [
    { value: "driving", label: "Driving", icon: <Car className="w-4 h-4" /> },
    { value: "walking", label: "Walking", icon: <Footprints className="w-4 h-4" /> },
    { value: "cycling", label: "Cycling", icon: <Bike className="w-4 h-4" /> },
  ]

  const enableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLocationEnabled(true)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const filteredItems = mapItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "events" && item.type === "event") ||
      (selectedFilter === "businesses" && item.type === "business") ||
      item.category.toLowerCase().includes(selectedFilter.toLowerCase())

    const withinRadius = !userLocation || !item.distance || item.distance <= mapRadius[0]

    return matchesSearch && matchesFilter && withinRadius
  })

  const handleMapPinClick = (item: MapItem) => {
    setSelectedItem(item)
  }

  const getDirections = (item: MapItem) => {
    // In a real app, this would open directions in Google Maps or similar
    const url = `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}&travelmode=${travelMode}`
    window.open(url, "_blank")
  }

  return (
    <Layout>
      <SEO
        title="Map View | Sypot"
        description="Discover events and places near you with our interactive map."
        canonical="/map"
      />

      <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""} transition-all duration-300`}>
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isFullscreen ? "h-screen" : "h-[calc(100vh-12rem)]"}`}>
          {/* Sidebar */}
          <div className={`lg:col-span-1 space-y-6 ${isFullscreen ? "hidden lg:block" : ""}`}>
            {/* Search & Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Discover Nearby
                </CardTitle>
                <CardDescription>Find events and places around you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant={isLocationEnabled ? "default" : "outline"} size="sm" onClick={enableLocation}>
                    <Navigation className="h-4 w-4 mr-2" />
                    {isLocationEnabled ? "Located" : "My Location"}
                  </Button>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Map Filters</SheetTitle>
                        <SheetDescription>Customize your map view and search results</SheetDescription>
                      </SheetHeader>

                      <div className="space-y-6 mt-6">
                        <div className="space-y-2">
                          <Label>Search Radius: {mapRadius[0]} km</Label>
                          <Slider
                            value={mapRadius}
                            onValueChange={setMapRadius}
                            max={50}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Map Style</Label>
                          <Select value={mapStyle} onValueChange={setMapStyle}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {mapStyles.map((style) => (
                                <SelectItem key={style.value} value={style.value}>
                                  {style.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="traffic">Show Traffic</Label>
                            <Switch id="traffic" checked={showTraffic} onCheckedChange={setShowTraffic} />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="transit">Show Transit</Label>
                            <Switch id="transit" checked={showTransit} onCheckedChange={setShowTransit} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Travel Mode</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {travelModes.map((mode) => (
                              <Button
                                key={mode.value}
                                variant={travelMode === mode.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTravelMode(mode.value)}
                                className="flex flex-col gap-1 h-auto py-2"
                              >
                                {mode.icon}
                                <span className="text-xs">{mode.label}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.id)}
                      className="text-xs"
                    >
                      {filter.label}
                      <Badge variant="secondary" className="ml-1 text-xs">
                        {filter.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results List */}
            <Card className="flex-1">
              <Tabs defaultValue="list" className="w-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="nearby">Nearby</TabsTrigger>
                    </TabsList>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <TabsContent value="list" className="mt-0">
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="space-y-3 p-4">
                        {filteredItems.map((item) => (
                          <div
                            key={item.id}
                            className={`p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors ${
                              selectedItem?.id === item.id ? "bg-muted border-primary" : ""
                            }`}
                            onClick={() => handleMapPinClick(item)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm">{item.title}</h4>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {item.category}
                                </Badge>
                                {item.type === "business" && item.openNow && (
                                  <Badge variant="default" className="text-xs bg-green-500">
                                    Open
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="space-y-1 text-xs text-muted-foreground">
                              {item.type === "event" && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3" />
                                  <span>{item.date}</span>
                                  <Clock className="h-3 w-3 ml-2" />
                                  <span>{item.time}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                <span>{item.location}</span>
                                {item.distance && (
                                  <span className="ml-auto text-primary font-medium">{item.distance} km</span>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                {item.price && (
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-3 w-3" />
                                    <span>{item.price}</span>
                                  </div>
                                )}
                                {item.attendees && (
                                  <div className="flex items-center gap-2">
                                    <Users className="h-3 w-3" />
                                    <span>{item.attendees} going</span>
                                  </div>
                                )}
                                {item.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                    <span>{item.rating}</span>
                                    {item.reviews && <span>({item.reviews})</span>}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  getDirections(item)
                                }}
                              >
                                <Route className="w-3 h-3 mr-1" />
                                Directions
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigate(item.type === "event" ? `/event/${item.id}` : `/business/${item.id}`)
                                }}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="nearby" className="mt-0">
                    <div className="max-h-[400px] overflow-y-auto">
                      <div className="space-y-3 p-4">
                        {filteredItems
                          .sort((a, b) => (a.distance || 0) - (b.distance || 0))
                          .slice(0, 5)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={() => handleMapPinClick(item)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium text-sm">{item.title}</h4>
                                  <p className="text-xs text-muted-foreground">{item.location}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-primary">{item.distance} km</p>
                                  <p className="text-xs text-muted-foreground">
                                    {Math.round((item.distance || 0) * 12)} min walk
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Enhanced Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-full relative">
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <Button size="icon" variant="secondary" onClick={() => setIsFullscreen(!isFullscreen)}>
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
                <Button size="icon" variant="secondary">
                  <Layers className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <Compass className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-0 h-full">
                <div
                  className={`h-full bg-gradient-to-br ${
                    mapStyle === "dark"
                      ? "from-gray-900 to-gray-800"
                      : mapStyle === "satellite"
                        ? "from-green-900 to-blue-900"
                        : mapStyle === "terrain"
                          ? "from-amber-100 to-green-200"
                          : "from-primary/20 to-blue-500/20"
                  } rounded-lg flex items-center justify-center relative overflow-hidden`}
                >
                  {/* Enhanced Mock Map Interface */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                  {/* Traffic overlay */}
                  {showTraffic && (
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-red-500 opacity-60 rounded"></div>
                      <div className="absolute top-1/2 right-1/4 w-24 h-1 bg-yellow-500 opacity-60 rounded"></div>
                      <div className="absolute bottom-1/3 left-1/3 w-20 h-1 bg-green-500 opacity-60 rounded"></div>
                    </div>
                  )}

                  {/* Transit lines */}
                  {showTransit && (
                    <div className="absolute inset-0">
                      <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-blue-600 opacity-40"></div>
                      <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-purple-600 opacity-40"></div>
                    </div>
                  )}

                  {/* User location pin */}
                  {isLocationEnabled && userLocation && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full absolute -top-2 -left-2 animate-ping"></div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Interactive Map Pins */}
                  {filteredItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                        selectedItem?.id === item.id ? "scale-125 z-20" : "z-10"
                      }`}
                      style={{
                        top: `${30 + ((index * 15) % 40)}%`,
                        left: `${25 + ((index * 20) % 50)}%`,
                      }}
                      onClick={() => handleMapPinClick(item)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                          item.type === "event" ? "bg-orange-500" : "bg-blue-500"
                        } ${selectedItem?.id === item.id ? "ring-2 ring-white ring-offset-2" : ""}`}
                      >
                        {item.type === "event" ? (
                          <Calendar className="w-4 h-4 text-white" />
                        ) : (
                          <MapPin className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Pin label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                        <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Center message when no location */}
                  {!isLocationEnabled && (
                    <div className="text-center z-10">
                      <Map className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-4">
                        Enable location services to see nearby events and places
                      </p>
                      <Button onClick={enableLocation} className="mb-2">
                        <Navigation className="w-4 h-4 mr-2" />
                        Enable Location Services
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Click on the pins above to explore events and venues
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Selected Item Details */}
              {selectedItem && (
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <Card className="bg-background/95 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{selectedItem.title}</h3>
                          <p className="text-sm text-muted-foreground">{selectedItem.location}</p>
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => setSelectedItem(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        {selectedItem.distance && (
                          <span className="flex items-center gap-1">
                            <Route className="w-3 h-3" />
                            {selectedItem.distance} km
                          </span>
                        )}
                        {selectedItem.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            {selectedItem.rating}
                          </span>
                        )}
                        {selectedItem.price && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {selectedItem.price}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => getDirections(selectedItem)}>
                          <Route className="w-3 h-3 mr-1" />
                          Directions
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(
                              selectedItem.type === "event"
                                ? `/event/${selectedItem.id}`
                                : `/business/${selectedItem.id}`,
                            )
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </Card>
          </div>
        </div>

        {!isFullscreen && (
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" asChild>
              <Link to="/explore">Browse All</Link>
            </Button>
            <Button asChild>
              <Link to="/events">View Events</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MapView
