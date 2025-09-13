"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart3,
  Users,
  CalendarIcon,
  DollarSign,
  Star,
  TrendingUp,
  Eye,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Clock,
  MapPin,
  Check,
  X,
  MoreHorizontal,
  CalendarDays,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Reservation {
  id: number
  customer: string
  email: string
  phone: string
  date: string
  time: string
  party: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  specialRequests?: string
  tableNumber?: string
  createdAt: string
  totalAmount?: number
}

const BusinessDashboard = () => {
  const [timeRange, setTimeRange] = useState("week")
  const [reservationFilter, setReservationFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)

  // New reservation form state
  const [newReservation, setNewReservation] = useState({
    customer: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    party: 2,
    specialRequests: "",
    tableNumber: "",
  })

  const stats = {
    totalViews: 1245,
    reservations: 89,
    revenue: 125000,
    rating: 4.8,
    reviews: 124,
  }

  const reservations: Reservation[] = [
    {
      id: 1,
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+254 712 345 678",
      date: "2024-01-15",
      time: "19:00",
      party: 4,
      status: "confirmed",
      specialRequests: "Window table preferred",
      tableNumber: "A12",
      createdAt: "2024-01-10T10:30:00Z",
      totalAmount: 8000,
    },
    {
      id: 2,
      customer: "Mike Roberts",
      email: "mike@example.com",
      phone: "+254 723 456 789",
      date: "2024-01-15",
      time: "20:30",
      party: 2,
      status: "pending",
      specialRequests: "Anniversary dinner",
      createdAt: "2024-01-12T14:20:00Z",
      totalAmount: 4500,
    },
    {
      id: 3,
      customer: "Emma Wilson",
      email: "emma@example.com",
      phone: "+254 734 567 890",
      date: "2024-01-16",
      time: "18:00",
      party: 6,
      status: "confirmed",
      tableNumber: "B05",
      createdAt: "2024-01-11T16:45:00Z",
      totalAmount: 12000,
    },
    {
      id: 4,
      customer: "James Brown",
      email: "james@example.com",
      phone: "+254 745 678 901",
      date: "2024-01-14",
      time: "19:30",
      party: 3,
      status: "completed",
      tableNumber: "C08",
      createdAt: "2024-01-09T12:15:00Z",
      totalAmount: 6750,
    },
    {
      id: 5,
      customer: "Lisa Davis",
      email: "lisa@example.com",
      phone: "+254 756 789 012",
      date: "2024-01-13",
      time: "20:00",
      party: 2,
      status: "cancelled",
      specialRequests: "Dietary restrictions: vegetarian",
      createdAt: "2024-01-08T09:30:00Z",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Jazz Night",
      date: "Jan 15, 2024",
      attendees: 45,
      capacity: 60,
      revenue: 67500,
    },
    {
      id: 2,
      title: "Soul Sunday",
      date: "Jan 21, 2024",
      attendees: 32,
      capacity: 50,
      revenue: 32000,
    },
  ]

  const timeSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"]

  const tables = [
    "A01",
    "A02",
    "A03",
    "A04",
    "A05",
    "A06",
    "A07",
    "A08",
    "A09",
    "A10",
    "A11",
    "A12",
    "B01",
    "B02",
    "B03",
    "B04",
    "B05",
    "B06",
    "B07",
    "B08",
    "C01",
    "C02",
    "C03",
    "C04",
    "C05",
    "C06",
    "C07",
    "C08",
  ]

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchQuery === "" ||
      reservation.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.phone.includes(searchQuery)

    const matchesFilter = reservationFilter === "all" || reservation.status === reservationFilter

    const matchesDate = !selectedDate || reservation.date === format(selectedDate, "yyyy-MM-dd")

    return matchesSearch && matchesFilter && matchesDate
  })

  const handleCreateReservation = () => {
    // In a real app, this would make an API call
    console.log("Creating reservation:", newReservation)
    setIsNewReservationOpen(false)
    setNewReservation({
      customer: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      party: 2,
      specialRequests: "",
      tableNumber: "",
    })
  }

  const handleUpdateReservationStatus = (id: number, status: Reservation["status"]) => {
    // In a real app, this would make an API call
    console.log(`Updating reservation ${id} to ${status}`)
  }

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3 h-3" />
      case "pending":
        return <Clock className="w-3 h-3" />
      case "cancelled":
        return <X className="w-3 h-3" />
      case "completed":
        return <UserCheck className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
              <p className="text-muted-foreground">Blue Note Jazz Club</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button>Edit Profile</Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservations</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservations}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES {stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating}</div>
              <p className="text-xs text-muted-foreground">{stats.reviews} reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +23 new this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reservations</CardTitle>
                  <CardDescription>Latest booking requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.slice(0, 3).map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{reservation.customer}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(reservation.date), "MMM dd, yyyy")} at {reservation.time} • Party of{" "}
                            {reservation.party}
                          </div>
                        </div>
                        <Badge
                          variant={reservation.status === "confirmed" ? "default" : "secondary"}
                          className={cn("text-white", getStatusColor(reservation.status))}
                        >
                          {getStatusIcon(reservation.status)}
                          <span className="ml-1">{reservation.status}</span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Your scheduled events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{event.title}</div>
                          <Badge variant="outline">{event.date}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.attendees}/{event.capacity} attendees • KES {event.revenue.toLocaleString()} revenue
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold">Reservation Management</h3>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reservations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <Select value={reservationFilter} onValueChange={setReservationFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-40 bg-transparent">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    <div className="p-3 border-t">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(undefined)} className="w-full">
                        Clear filter
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>

                <Dialog open={isNewReservationOpen} onOpenChange={setIsNewReservationOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Reservation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create New Reservation</DialogTitle>
                      <DialogDescription>Add a new reservation to your system</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customer">Customer Name</Label>
                          <Input
                            id="customer"
                            value={newReservation.customer}
                            onChange={(e) => setNewReservation({ ...newReservation, customer: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="party">Party Size</Label>
                          <Select
                            value={newReservation.party.toString()}
                            onValueChange={(value) =>
                              setNewReservation({ ...newReservation, party: Number.parseInt(value) })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? "person" : "people"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newReservation.email}
                          onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newReservation.phone}
                          onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                          placeholder="+254 712 345 678"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newReservation.date}
                            onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Select
                            value={newReservation.time}
                            onValueChange={(value) => setNewReservation({ ...newReservation, time: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="table">Table (Optional)</Label>
                        <Select
                          value={newReservation.tableNumber}
                          onValueChange={(value) => setNewReservation({ ...newReservation, tableNumber: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Auto-assign" />
                          </SelectTrigger>
                          <SelectContent>
                            {tables.map((table) => (
                              <SelectItem key={table} value={table}>
                                Table {table}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requests">Special Requests</Label>
                        <Textarea
                          id="requests"
                          value={newReservation.specialRequests}
                          onChange={(e) => setNewReservation({ ...newReservation, specialRequests: e.target.value })}
                          placeholder="Any special requirements..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsNewReservationOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateReservation}>Create Reservation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Party</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{reservation.customer}</div>
                            {reservation.specialRequests && (
                              <div className="text-xs text-muted-foreground mt-1">{reservation.specialRequests}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              {reservation.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {reservation.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{format(new Date(reservation.date), "MMM dd, yyyy")}</div>
                            <div className="text-sm text-muted-foreground">{reservation.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {reservation.party}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {reservation.tableNumber ? (
                            <Badge variant="secondary">
                              <MapPin className="h-3 w-3 mr-1" />
                              {reservation.tableNumber}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Auto-assign</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("text-white", getStatusColor(reservation.status))}>
                            {getStatusIcon(reservation.status)}
                            <span className="ml-1 capitalize">{reservation.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {reservation.totalAmount ? (
                            <span className="font-medium">KES {reservation.totalAmount.toLocaleString()}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {reservation.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateReservationStatus(reservation.id, "confirmed")}
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateReservationStatus(reservation.id, "cancelled")}
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Cancel
                                </Button>
                              </>
                            )}
                            {reservation.status === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateReservationStatus(reservation.id, "completed")}
                              >
                                <UserCheck className="h-3 w-3 mr-1" />
                                Complete
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredReservations.length === 0 && (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reservations found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || reservationFilter !== "all" || selectedDate
                        ? "Try adjusting your filters"
                        : "Create your first reservation to get started"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Event Management</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Event Management</h3>
                  <p className="text-muted-foreground">Create and manage your business events</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                  <p className="text-muted-foreground">Manage and respond to customer feedback</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground">Detailed insights and performance metrics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default BusinessDashboard
