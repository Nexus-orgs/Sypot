"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Star,
  Calendar,
  Heart,
  Share2,
  Search,
  Filter,
  ShoppingCart,
  Plus,
  Minus,
  Utensils,
  Wine,
  Cake,
  Leaf,
  Flame,
  ChefHat,
} from "lucide-react"
import { Link } from "react-router-dom"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  dietary?: string[]
  spiceLevel?: number
  popular?: boolean
  available: boolean
}

const BusinessDetails = () => {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [menuSearch, setMenuSearch] = useState("")
  const [menuCategory, setMenuCategory] = useState("all")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  // Mock business data
  const business = {
    id: id || "1",
    name: "Blue Note Jazz Club",
    category: "Entertainment",
    description:
      "Nairobi's premier jazz venue featuring live music, craft cocktails, and an intimate atmosphere perfect for date nights and music lovers.",
    address: "Westlands Road, Nairobi, Kenya",
    phone: "+254 700 123 456",
    website: "www.bluenote.co.ke",
    email: "info@bluenote.co.ke",
    rating: 4.8,
    reviewCount: 124,
    coverImageUrl: "/placeholder.svg",
    logoUrl: "/placeholder.svg",
    verified: true,
    openingHours: {
      monday: "6:00 PM - 2:00 AM",
      tuesday: "6:00 PM - 2:00 AM",
      wednesday: "6:00 PM - 2:00 AM",
      thursday: "6:00 PM - 2:00 AM",
      friday: "6:00 PM - 3:00 AM",
      saturday: "6:00 PM - 3:00 AM",
      sunday: "Closed",
    },
  }

  const upcomingEvents = [
    {
      id: 1,
      title: "Jazz Night",
      date: "Tonight",
      time: "8:00 PM",
      price: "KES 1,500",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Soul Sunday",
      date: "This Sunday",
      time: "7:00 PM",
      price: "KES 1,000",
      image: "/placeholder.svg",
    },
  ]

  const reviews = [
    {
      id: 1,
      user: { name: "Sarah K.", avatar: "/placeholder.svg" },
      rating: 5,
      comment: "Amazing atmosphere and incredible live music. Perfect for a special night out!",
      date: "2 days ago",
    },
    {
      id: 2,
      user: { name: "Mike R.", avatar: "/placeholder.svg" },
      rating: 4,
      comment: "Great cocktails and service. The jazz performances are top notch.",
      date: "1 week ago",
    },
  ]

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Signature Jazz Burger",
      description: "Angus beef patty with caramelized onions, aged cheddar, and our special jazz sauce",
      price: 1800,
      category: "mains",
      dietary: ["gluten-free-option"],
      popular: true,
      available: true,
    },
    {
      id: 2,
      name: "Smoky BBQ Ribs",
      description: "Slow-cooked pork ribs with house-made BBQ sauce and coleslaw",
      price: 2500,
      category: "mains",
      spiceLevel: 2,
      popular: true,
      available: true,
    },
    {
      id: 3,
      name: "Truffle Mac & Cheese",
      description: "Creamy mac and cheese with truffle oil and crispy breadcrumbs",
      price: 1400,
      category: "mains",
      dietary: ["vegetarian"],
      available: true,
    },
    {
      id: 4,
      name: "Grilled Salmon",
      description: "Atlantic salmon with lemon herb butter and seasonal vegetables",
      price: 2200,
      category: "mains",
      dietary: ["gluten-free", "healthy"],
      available: true,
    },
    {
      id: 5,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan, croutons, and classic caesar dressing",
      price: 1200,
      category: "starters",
      dietary: ["vegetarian", "gluten-free-option"],
      available: true,
    },
    {
      id: 6,
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in buffalo sauce with blue cheese dip",
      price: 1600,
      category: "starters",
      spiceLevel: 3,
      popular: true,
      available: true,
    },
    {
      id: 7,
      name: "Loaded Nachos",
      description: "Tortilla chips with cheese, jalapeños, sour cream, and guacamole",
      price: 1300,
      category: "starters",
      dietary: ["vegetarian"],
      spiceLevel: 2,
      available: true,
    },
    {
      id: 8,
      name: "Old Fashioned",
      description: "Classic whiskey cocktail with bitters and orange peel",
      price: 800,
      category: "drinks",
      available: true,
    },
    {
      id: 9,
      name: "Jazz Martini",
      description: "Our signature gin martini with a twist of lemon",
      price: 900,
      category: "drinks",
      popular: true,
      available: true,
    },
    {
      id: 10,
      name: "Craft Beer Selection",
      description: "Rotating selection of local and international craft beers",
      price: 600,
      category: "drinks",
      available: true,
    },
    {
      id: 11,
      name: "Espresso",
      description: "Rich, bold espresso shot",
      price: 300,
      category: "drinks",
      available: true,
    },
    {
      id: 12,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center and vanilla ice cream",
      price: 800,
      category: "desserts",
      dietary: ["vegetarian"],
      popular: true,
      available: true,
    },
    {
      id: 13,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 700,
      category: "desserts",
      dietary: ["vegetarian"],
      available: true,
    },
    {
      id: 14,
      name: "Seasonal Fruit Tart",
      description: "Fresh seasonal fruits on pastry cream with almond crust",
      price: 650,
      category: "desserts",
      dietary: ["vegetarian"],
      available: false,
    },
  ]

  const menuCategories = [
    { id: "all", label: "All Items", icon: <Utensils className="w-4 h-4" /> },
    { id: "starters", label: "Starters", icon: <ChefHat className="w-4 h-4" /> },
    { id: "mains", label: "Main Courses", icon: <Utensils className="w-4 h-4" /> },
    { id: "drinks", label: "Drinks", icon: <Wine className="w-4 h-4" /> },
    { id: "desserts", label: "Desserts", icon: <Cake className="w-4 h-4" /> },
  ]

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      menuSearch === "" ||
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase())

    const matchesCategory = menuCategory === "all" || item.category === menuCategory

    return matchesSearch && matchesCategory
  })

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === Number.parseInt(itemId))
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case "vegetarian":
        return <Leaf className="w-3 h-3 text-green-500" />
      case "vegan":
        return <Leaf className="w-3 h-3 text-green-600" />
      case "gluten-free":
        return <span className="text-xs font-bold text-blue-500">GF</span>
      case "healthy":
        return <span className="text-xs font-bold text-green-500">H</span>
      default:
        return null
    }
  }

  const getSpiceLevel = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame key={i} className={`w-3 h-3 ${i < level ? "text-red-500" : "text-gray-300"}`} />
    ))
  }

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Header */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg overflow-hidden">
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

              <div className="flex items-end gap-4 -mt-16 ml-6 relative z-10">
                <Avatar className="w-20 h-20 border-4 border-background">
                  <AvatarImage src={business.logoUrl || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl">{business.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="bg-background/80 backdrop-blur-md rounded-lg p-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{business.name}</h1>
                    {business.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {business.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{business.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{business.reviewCount} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{business.description}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id}>
                        <div className="aspect-video bg-gradient-warm"></div>
                        <CardHeader>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>
                            {event.date} at {event.time}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{event.price}</span>
                            <Button size="sm" variant="vibrant">
                              Book Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-lg font-semibold">Our Menu</h3>

                    {getCartItemCount() > 0 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="relative">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            View Cart ({getCartItemCount()})
                            <Badge variant="secondary" className="ml-2">
                              KES {getCartTotal().toLocaleString()}
                            </Badge>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Your Order</DialogTitle>
                            <DialogDescription>Review your items before placing the order</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {Object.entries(cart).map(([itemId, quantity]) => {
                              const item = menuItems.find((item) => item.id === Number.parseInt(itemId))
                              if (!item) return null

                              return (
                                <div key={itemId} className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      KES {item.price.toLocaleString()} each
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => removeFromCart(item.id)}
                                      className="h-8 w-8"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="w-8 text-center">{quantity}</span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => addToCart(item.id)}
                                      className="h-8 w-8"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}

                            <div className="border-t pt-4">
                              <div className="flex justify-between items-center font-semibold">
                                <span>Total:</span>
                                <span>KES {getCartTotal().toLocaleString()}</span>
                              </div>
                            </div>

                            <Button className="w-full">Place Order</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search menu items..."
                        value={menuSearch}
                        onChange={(e) => setMenuSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <Select value={menuCategory} onValueChange={setMenuCategory}>
                      <SelectTrigger className="w-full sm:w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {menuCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              {category.icon}
                              {category.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredMenuItems.map((item) => (
                      <Card key={item.id} className={`${!item.available ? "opacity-60" : ""}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                {item.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>

                              <div className="flex items-center gap-2 mb-2">
                                {item.dietary?.map((diet) => (
                                  <div key={diet} className="flex items-center gap-1">
                                    {getDietaryIcon(diet)}
                                  </div>
                                ))}
                                {item.spiceLevel && (
                                  <div className="flex items-center gap-1">{getSpiceLevel(item.spiceLevel)}</div>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">KES {item.price.toLocaleString()}</span>

                                {item.available ? (
                                  <div className="flex items-center gap-2">
                                    {cart[item.id] ? (
                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          onClick={() => removeFromCart(item.id)}
                                          className="h-8 w-8"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </Button>
                                        <span className="w-8 text-center font-medium">{cart[item.id]}</span>
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          onClick={() => addToCart(item.id)}
                                          className="h-8 w-8"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button size="sm" onClick={() => addToCart(item.id)}>
                                        <Plus className="w-3 h-3 mr-1" />
                                        Add
                                      </Button>
                                    )}
                                  </div>
                                ) : (
                                  <Badge variant="secondary">Unavailable</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredMenuItems.length === 0 && (
                    <div className="text-center py-12">
                      <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No items found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Reviews ({business.reviewCount})</h3>
                    <Button variant="outline">Write Review</Button>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <Avatar>
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{review.user.name}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                  ))}
                                  {[...Array(5 - review.rating)].map((_, i) => (
                                    <Star key={i + review.rating} className="h-4 w-4 text-muted-foreground" />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact & Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{business.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{business.website}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Opening Hours
                  </h4>
                  <div className="space-y-1 text-sm">
                    {Object.entries(business.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4" variant="vibrant">
                  <Calendar className="h-4 w-4 mr-2" />
                  Make Reservation
                </Button>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link to="/map">View on Map</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="/explore">Browse Places</Link>
          </Button>
          <Button variant="vibrant" asChild>
            <Link to="/events">View Events</Link>
          </Button>
        </div>
      </main>
    </Layout>
  )
}

export default BusinessDetails
