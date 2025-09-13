import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/hooks/useAuth"
import { HelmetProvider } from "react-helmet-async"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import Index from "./pages/Index"
import Events from "./pages/Events"
import Auth from "./pages/Auth"
import VerifyEmail from "./pages/VerifyEmail"
import Explore from "./pages/Explore"
import EventDetails from "./pages/EventDetails"
import Profile from "./pages/Profile"
import CreateEvent from "./pages/CreateEvent"
import MyBookings from "./pages/MyBookings"
import BusinessDetails from "./pages/BusinessDetails"
import BusinessDashboard from "./pages/BusinessDashboard"
import BusinessRegistration from "./pages/BusinessRegistration"
import Chat from "./pages/Chat"
import Friends from "./pages/Friends"
import MapView from "./pages/MapView"
import Settings from "./pages/Settings"
import Notifications from "./pages/Notifications"
import Help from "./pages/Help"
import NotFound from "./pages/NotFound"
import Onboarding from "./pages/Onboarding"
import Activity from "./pages/Activity"
import MyEvents from "./pages/MyEvents"
import OrganizerDashboard from "./pages/OrganizerDashboard"
import ManageEvents from "./pages/ManageEvents"
import AttendeeManagement from "./pages/AttendeeManagement"
import TicketingDashboard from "./pages/TicketingDashboard"
import MenuUpload from "./pages/MenuUpload"
import ReservationManagement from "./pages/ReservationManagement"
import Offers from "./pages/Offers"
import AdminDashboard from "./pages/AdminDashboard"
import UserManagement from "./pages/UserManagement"
import EventModeration from "./pages/EventModeration"
import BusinessVerification from "./pages/BusinessVerification"
import Payments from "./pages/Payments"
import ReportsAnalytics from "./pages/ReportsAnalytics"
import ContactSupport from "./pages/ContactSupport"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Careers from "./pages/Careers"
import Checkout from "./pages/Checkout"
import GateEntry from "./pages/GateEntry"
import FindYourCrew from "./pages/FindYourCrew"
import Discover from "./pages/Discover"
import VirtualEvents from "./pages/VirtualEvents"
import MemoryBook from "./pages/MemoryBook"
import Rewards from "./pages/Rewards"
import TrendingEvents from "./pages/TrendingEvents"
import ThisWeekend from "./pages/ThisWeekend"
import FreeEvents from "./pages/FreeEvents"
import AboutUs from "./pages/AboutUs"
import PlacesNearYou from "./pages/PlacesNearYou"
import HiddenGems from "./pages/HiddenGems"

const queryClient = new QueryClient()

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/verify-email" element={<VerifyEmail />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/business/:id" element={<BusinessDetails />} />
              <Route path="/help" element={<Help />} />
              <Route path="/contact" element={<ContactSupport />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/trending-events" element={<TrendingEvents />} />
              <Route path="/this-weekend" element={<ThisWeekend />} />
              <Route path="/free-events" element={<FreeEvents />} />
              <Route path="/places-near-you" element={<PlacesNearYou />} />
              <Route path="/hidden-gems" element={<HiddenGems />} />

              {/* Protected Routes - Require Authentication */}
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity"
                element={
                  <ProtectedRoute>
                    <Activity />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-events"
                element={
                  <ProtectedRoute>
                    <MyEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/friends"
                element={
                  <ProtectedRoute>
                    <Friends />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/find-your-crew"
                element={
                  <ProtectedRoute>
                    <FindYourCrew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discover"
                element={
                  <ProtectedRoute>
                    <Discover />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/virtual-events"
                element={
                  <ProtectedRoute>
                    <VirtualEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/memory-book"
                element={
                  <ProtectedRoute>
                    <MemoryBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                }
              />

              {/* Event Creation - Requires Authentication */}
              <Route
                path="/create-event"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />

              {/* Business Routes - Require Business Owner Role */}
              <Route
                path="/register-business"
                element={
                  <ProtectedRoute>
                    <BusinessRegistration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business-dashboard"
                element={
                  <ProtectedRoute requiredUserType="business">
                    <BusinessDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business/menu"
                element={
                  <ProtectedRoute requiredUserType="business">
                    <MenuUpload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business/reservations"
                element={
                  <ProtectedRoute requiredUserType="business">
                    <ReservationManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business/offers"
                element={
                  <ProtectedRoute requiredUserType="business">
                    <Offers />
                  </ProtectedRoute>
                }
              />

              {/* Organizer Routes - Require Organizer Role */}
              <Route
                path="/organizer"
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/manage-events"
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <ManageEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/attendees"
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <AttendeeManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/ticketing"
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <TicketingDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gate-entry"
                element={
                  <ProtectedRoute requiredUserType="organizer">
                    <GateEntry />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes - Require Admin Role */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/events"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <EventModeration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/businesses"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <BusinessVerification />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <Payments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute requiredUserType="admin">
                    <ReportsAnalytics />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
)

export default App
