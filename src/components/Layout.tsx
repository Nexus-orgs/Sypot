import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Footer } from '@/components/Footer';
import {
  Home,
  Search,
  Map,
  Calendar,
  User,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Users,
  Building2,
  LayoutDashboard,
  Plus,
  Ticket,
  Activity,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  noFooter?: boolean;
  noPadding?: boolean;
}

export const Layout = ({ children, fullWidth = false, noFooter = false, noPadding = false }: LayoutProps) => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  
  // Pages that should have special layout treatment
  const isChatPage = location.pathname === '/chat';
  const isFullWidthPage = fullWidth || isChatPage;
  const shouldHideFooter = noFooter || isChatPage;
  const shouldRemovePadding = noPadding || isChatPage;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/map', icon: Map, label: 'Map' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/activity', icon: Activity, label: 'Activity' },
  ];

  const userMenuItems = [
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/my-bookings', icon: Ticket, label: 'My Bookings' },
    { path: '/my-events', icon: Calendar, label: 'My Events' },
    { path: '/friends', icon: Users, label: 'Friends' },
    { path: '/chat', icon: MessageSquare, label: 'Messages' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const organizerMenuItems = [
    { path: '/organizer', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/create-event', icon: Plus, label: 'Create Event' },
    { path: '/organizer/manage-events', icon: Calendar, label: 'Manage Events' },
    { path: '/organizer/attendees', icon: Users, label: 'Attendees' },
    { path: '/organizer/ticketing', icon: Ticket, label: 'Ticketing' },
  ];

  const businessMenuItems = [
    { path: '/business-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/register-business', icon: Building2, label: 'Register Business' },
    { path: '/business/menu', icon: Calendar, label: 'Menu/Programs' },
    { path: '/business/reservations', icon: Ticket, label: 'Reservations' },
    { path: '/business/offers', icon: Activity, label: 'Offers' },
  ];

  const adminMenuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { path: '/admin/users', icon: Users, label: 'User Management' },
    { path: '/admin/events', icon: Calendar, label: 'Event Moderation' },
    { path: '/admin/businesses', icon: Building2, label: 'Business Verification' },
    { path: '/admin/payments', icon: Ticket, label: 'Payments' },
    { path: '/admin/reports', icon: Activity, label: 'Analytics' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className={isFullWidthPage ? "px-4" : "container mx-auto px-4"}>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">Sypot</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/notifications')}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    3
                  </Badge>
                </Button>
              )}

              {/* Messages */}
              {user && !isChatPage && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/chat')}
                  className="relative"
                >
                  <MessageSquare className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    5
                  </Badge>
                </Button>
              )}

              {/* Create Event Button */}
              {user && (profile?.user_type === 'organizer' || profile?.user_type === 'admin') && (
                <Button
                  onClick={() => navigate('/create-event')}
                  size="sm"
                  className="hidden md:flex"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Create Event
                </Button>
              )}

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.display_name} />
                        <AvatarFallback>
                          {profile?.display_name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile?.display_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge variant="secondary" className="w-fit mt-1">
                          {profile?.user_type || 'visitor'}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* User Menu Items */}
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="cursor-pointer"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    ))}
                    
                    {/* Organizer Menu Items */}
                    {(profile?.user_type === 'organizer' || profile?.user_type === 'admin') && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Organizer</DropdownMenuLabel>
                        {organizerMenuItems.map((item) => (
                          <DropdownMenuItem
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="cursor-pointer"
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    
                    {/* Business Menu Items */}
                    {(profile?.user_type === 'business' || profile?.user_type === 'admin') && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Business</DropdownMenuLabel>
                        {businessMenuItems.map((item) => (
                          <DropdownMenuItem
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="cursor-pointer"
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    
                    {/* Admin Menu Items */}
                    {profile?.user_type === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Admin</DropdownMenuLabel>
                        {adminMenuItems.map((item) => (
                          <DropdownMenuItem
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="cursor-pointer"
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate('/auth')} size="sm">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - Hide on chat page */}
      {user && !isChatPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className={`
        flex-1
        ${!shouldRemovePadding ? (isFullWidthPage ? 'px-4 py-6' : 'container mx-auto px-4 py-6') : ''}
        ${!isChatPage && user ? 'pb-20 md:pb-6' : ''}
        ${isChatPage ? 'h-[calc(100vh-4rem)]' : ''}
      `}>
        {children}
      </main>
      
      {/* Footer - Hidden on chat and other specified pages */}
      {!shouldHideFooter && (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}
    </div>
  );
};