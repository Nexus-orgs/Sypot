"use client"

import { useState } from "react"
import { Layout } from "@/components/Layout"
import { SEO } from "@/components/SEO"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Edit,
  Trash2,
  CalendarIcon,
  Clock,
  Percent,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Copy,
  Share2,
  Gift,
  Tag,
  Zap,
  Star,
} from "lucide-react"
import { format } from "date-fns"

interface Offer {
  id: string
  title: string
  description: string
  type: "percentage" | "fixed_amount" | "buy_one_get_one" | "happy_hour"
  value: number
  code: string
  startDate: Date
  endDate: Date
  isActive: boolean
  usageLimit?: number
  usedCount: number
  minSpend?: number
  applicableItems: string[]
  targetAudience: "all" | "new_customers" | "vip" | "returning"
  createdAt: Date
}

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "Happy Hour Special",
      description: "50% off all drinks from 5-7 PM",
      type: "percentage",
      value: 50,
      code: "HAPPY50",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true,
      usageLimit: 100,
      usedCount: 23,
      minSpend: 1000,
      applicableItems: ["drinks", "cocktails"],
      targetAudience: "all",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Weekend Brunch Deal",
      description: "Buy one brunch item, get one 50% off",
      type: "buy_one_get_one",
      value: 50,
      code: "BRUNCH50",
      startDate: new Date(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      isActive: true,
      usageLimit: 50,
      usedCount: 12,
      applicableItems: ["brunch", "breakfast"],
      targetAudience: "all",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "New Customer Welcome",
      description: "KES 500 off your first order",
      type: "fixed_amount",
      value: 500,
      code: "WELCOME500",
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      isActive: true,
      usedCount: 45,
      minSpend: 2000,
      applicableItems: ["all"],
      targetAudience: "new_customers",
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [newOffer, setNewOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    type: "percentage",
    value: 0,
    code: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    targetAudience: "all",
    applicableItems: [],
  })

  const offerTypes = [
    { value: "percentage", label: "Percentage Discount", icon: <Percent className="w-4 h-4" /> },
    { value: "fixed_amount", label: "Fixed Amount Off", icon: <DollarSign className="w-4 h-4" /> },
    { value: "buy_one_get_one", label: "Buy One Get One", icon: <Gift className="w-4 h-4" /> },
    { value: "happy_hour", label: "Happy Hour", icon: <Clock className="w-4 h-4" /> },
  ]

  const targetAudiences = [
    { value: "all", label: "All Customers" },
    { value: "new_customers", label: "New Customers" },
    { value: "returning", label: "Returning Customers" },
    { value: "vip", label: "VIP Members" },
  ]

  const generateOfferCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setNewOffer((prev) => ({ ...prev, code }))
  }

  const handleCreateOffer = () => {
    if (!newOffer.title || !newOffer.code) return

    const offer: Offer = {
      id: Date.now().toString(),
      title: newOffer.title!,
      description: newOffer.description || "",
      type: newOffer.type as Offer["type"],
      value: newOffer.value || 0,
      code: newOffer.code!,
      startDate: newOffer.startDate!,
      endDate: newOffer.endDate!,
      isActive: newOffer.isActive || true,
      usageLimit: newOffer.usageLimit,
      usedCount: 0,
      minSpend: newOffer.minSpend,
      applicableItems: newOffer.applicableItems || [],
      targetAudience: newOffer.targetAudience as Offer["targetAudience"],
      createdAt: new Date(),
    }

    setOffers((prev) => [offer, ...prev])
    setIsCreateDialogOpen(false)
    setNewOffer({
      title: "",
      description: "",
      type: "percentage",
      value: 0,
      code: "",
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isActive: true,
      targetAudience: "all",
      applicableItems: [],
    })
  }

  const toggleOfferStatus = (id: string) => {
    setOffers((prev) => prev.map((offer) => (offer.id === id ? { ...offer, isActive: !offer.isActive } : offer)))
  }

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== id))
  }

  const copyOfferCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const getOfferTypeIcon = (type: string) => {
    const offerType = offerTypes.find((t) => t.value === type)
    return offerType?.icon || <Tag className="w-4 h-4" />
  }

  const getOfferValue = (offer: Offer) => {
    switch (offer.type) {
      case "percentage":
        return `${offer.value}% off`
      case "fixed_amount":
        return `KES ${offer.value} off`
      case "buy_one_get_one":
        return `BOGO ${offer.value}% off`
      case "happy_hour":
        return `${offer.value}% off`
      default:
        return `${offer.value}% off`
    }
  }

  const activeOffers = offers.filter((offer) => offer.isActive)
  const inactiveOffers = offers.filter((offer) => !offer.isActive)
  const totalRedemptions = offers.reduce((sum, offer) => sum + offer.usedCount, 0)
  const totalSavings = offers.reduce((sum, offer) => {
    if (offer.type === "fixed_amount") {
      return sum + offer.value * offer.usedCount
    }
    return sum + offer.usedCount * 100 // Estimated savings
  }, 0)

  return (
    <Layout>
      <SEO
        title="Offers & Promotions | Sypot"
        description="Create and manage special deals, discounts, and promotions for your business."
        canonical="/offers"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">Offers & Promotions</h1>
                <p className="text-xl opacity-90">Create compelling deals to attract and retain customers</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Offer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Offer</DialogTitle>
                    <DialogDescription>Set up a new promotion or discount for your customers</DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Offer Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Happy Hour Special"
                        value={newOffer.title}
                        onChange={(e) => setNewOffer((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Offer Type</Label>
                      <Select
                        value={newOffer.type}
                        onValueChange={(value) => setNewOffer((prev) => ({ ...prev, type: value as Offer["type"] }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {offerTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                {type.icon}
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="value">Discount Value</Label>
                      <Input
                        id="value"
                        type="number"
                        placeholder="e.g., 50"
                        value={newOffer.value}
                        onChange={(e) => setNewOffer((prev) => ({ ...prev, value: Number(e.target.value) }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="code">Promo Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="code"
                          placeholder="PROMO50"
                          value={newOffer.code}
                          onChange={(e) => setNewOffer((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                        />
                        <Button type="button" variant="outline" onClick={generateOfferCode}>
                          <Zap className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your offer..."
                        value={newOffer.description}
                        onChange={(e) => setNewOffer((prev) => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newOffer.startDate ? format(newOffer.startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newOffer.startDate}
                            onSelect={(date) => setNewOffer((prev) => ({ ...prev, startDate: date || new Date() }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newOffer.endDate ? format(newOffer.endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newOffer.endDate}
                            onSelect={(date) => setNewOffer((prev) => ({ ...prev, endDate: date || new Date() }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="usageLimit">Usage Limit (Optional)</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        placeholder="e.g., 100"
                        value={newOffer.usageLimit || ""}
                        onChange={(e) =>
                          setNewOffer((prev) => ({
                            ...prev,
                            usageLimit: e.target.value ? Number(e.target.value) : undefined,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minSpend">Minimum Spend (Optional)</Label>
                      <Input
                        id="minSpend"
                        type="number"
                        placeholder="e.g., 1000"
                        value={newOffer.minSpend || ""}
                        onChange={(e) =>
                          setNewOffer((prev) => ({
                            ...prev,
                            minSpend: e.target.value ? Number(e.target.value) : undefined,
                          }))
                        }
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select
                        value={newOffer.targetAudience}
                        onValueChange={(value) =>
                          setNewOffer((prev) => ({ ...prev, targetAudience: value as Offer["targetAudience"] }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {targetAudiences.map((audience) => (
                            <SelectItem key={audience.value} value={audience.value}>
                              {audience.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateOffer}>Create Offer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="container mx-auto px-4 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Offers</p>
                    <p className="text-3xl font-bold">{activeOffers.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Redemptions</p>
                    <p className="text-3xl font-bold">{totalRedemptions}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Customer Savings</p>
                    <p className="text-3xl font-bold">KES {totalSavings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                    <p className="text-3xl font-bold">12.5%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Offers ({activeOffers.length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({inactiveOffers.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOffers.map((offer) => (
                  <Card key={offer.id} className="relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => copyOfferCode(offer.code)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {getOfferTypeIcon(offer.type)}
                        <Badge variant="secondary">{offer.type.replace("_", " ")}</Badge>
                        <Badge variant="default" className="bg-green-500">
                          Active
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{offer.title}</CardTitle>
                      <CardDescription>{offer.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">{getOfferValue(offer)}</p>
                          <p className="text-sm text-muted-foreground">Code: {offer.code}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{offer.usedCount}</p>
                          <p className="text-sm text-muted-foreground">
                            {offer.usageLimit ? `/ ${offer.usageLimit} uses` : "uses"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Valid until:</span>
                          <span>{format(offer.endDate, "MMM dd, yyyy")}</span>
                        </div>
                        {offer.minSpend && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Min spend:</span>
                            <span>KES {offer.minSpend}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target:</span>
                          <span className="capitalize">{offer.targetAudience.replace("_", " ")}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => toggleOfferStatus(offer.id)}>
                          Deactivate
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteOffer(offer.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {activeOffers.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Offers</h3>
                    <p className="text-muted-foreground mb-4">Create your first offer to start attracting customers</p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Offer
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="inactive" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inactiveOffers.map((offer) => (
                  <Card key={offer.id} className="relative overflow-hidden opacity-75">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {getOfferTypeIcon(offer.type)}
                        <Badge variant="outline">{offer.type.replace("_", " ")}</Badge>
                        <Badge variant="secondary">Inactive</Badge>
                      </div>
                      <CardTitle className="text-xl">{offer.title}</CardTitle>
                      <CardDescription>{offer.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-muted-foreground">{getOfferValue(offer)}</p>
                          <p className="text-sm text-muted-foreground">Code: {offer.code}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-muted-foreground">{offer.usedCount}</p>
                          <p className="text-sm text-muted-foreground">total uses</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => toggleOfferStatus(offer.id)}>
                          Reactivate
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteOffer(offer.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {inactiveOffers.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Inactive Offers</h3>
                    <p className="text-muted-foreground">All your offers are currently active</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Offers</CardTitle>
                    <CardDescription>Based on redemption rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {offers
                        .sort((a, b) => b.usedCount - a.usedCount)
                        .slice(0, 5)
                        .map((offer, index) => (
                          <div key={offer.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-bold">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-medium">{offer.title}</p>
                                <p className="text-sm text-muted-foreground">{offer.code}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{offer.usedCount} uses</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm text-muted-foreground">
                                  {offer.usageLimit ? Math.round((offer.usedCount / offer.usageLimit) * 100) : 0}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Offer Performance Metrics</CardTitle>
                    <CardDescription>Key insights about your promotions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Average Redemption Rate</span>
                          <span className="text-sm font-bold">15.2%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "15.2%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Customer Acquisition</span>
                          <span className="text-sm font-bold">23 new customers</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Revenue Impact</span>
                          <span className="text-sm font-bold">+KES 45,000</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-3">Recommendations</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Consider extending your Happy Hour offer - it has the highest redemption rate</li>
                          <li>• Create more offers targeting new customers to boost acquisition</li>
                          <li>• Weekend promotions show 40% higher engagement</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}

export default Offers
