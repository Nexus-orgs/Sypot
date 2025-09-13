import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import MyBookings from "./pages/MyBookings";
import BusinessDetails from "./pages/BusinessDetails";
import BusinessDashboard from "./pages/BusinessDashboard";
import BusinessRegistration from "./pages/BusinessRegistration";
import Chat from "./pages/Chat";
import Friends from "./pages/Friends";
import MapView from "./pages/MapView";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Activity from "./pages/Activity";
import MyEvents from "./pages/MyEvents";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import ManageEvents from "./pages/ManageEvents";
import AttendeeManagement from "./pages/AttendeeManagement";
import TicketingDashboard from "./pages/TicketingDashboard";
import MenuUpload from "./pages/MenuUpload";
import ReservationManagement from "./pages/ReservationManagement";
import Offers from "./pages/Offers";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import EventModeration from "./pages/EventModeration";
import BusinessVerification from "./pages/BusinessVerification";
import Payments from "./pages/Payments";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ContactSupport from "./pages/ContactSupport";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Careers from "./pages/Careers";
import Checkout from "./pages/Checkout";
import GateEntry from "./pages/GateEntry";
import FindYourCrew from "./pages/FindYourCrew";
import Discover from "./pages/Discover";
import VirtualEvents from "./pages/VirtualEvents";
import MemoryBook from "./pages/MemoryBook";
import Rewards from "./pages/Rewards";
import TrendingEvents from "./pages/TrendingEvents";
import ThisWeekend from "./pages/ThisWeekend";
import FreeEvents from "./pages/FreeEvents";
import AboutUs from "./pages/AboutUs";
import PlacesNearYou from "./pages/PlacesNearYou";
import HiddenGems from "./pages/HiddenGems";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events" element={<Events />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/business/:id" element={<BusinessDetails />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/register-business" element={<BusinessRegistration />} />
          <Route path="/business/menu" element={<MenuUpload />} />
          <Route path="/business/reservations" element={<ReservationManagement />} />
          <Route path="/business/offers" element={<Offers />} />
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/organizer/manage-events" element={<ManageEvents />} />
          <Route path="/organizer/attendees" element={<AttendeeManagement />} />
          <Route path="/organizer/ticketing" element={<TicketingDashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<ContactSupport />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/gate-entry" element={<GateEntry />} />
          <Route path="/find-your-crew" element={<FindYourCrew />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/virtual-events" element={<VirtualEvents />} />
          <Route path="/memory-book" element={<MemoryBook />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/trending-events" element={<TrendingEvents />} />
          <Route path="/this-weekend" element={<ThisWeekend />} />
          <Route path="/free-events" element={<FreeEvents />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/places-near-you" element={<PlacesNearYou />} />
          <Route path="/hidden-gems" element={<HiddenGems />} />
          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/events" element={<EventModeration />} />
          <Route path="/admin/businesses" element={<BusinessVerification />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/reports" element={<ReportsAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
