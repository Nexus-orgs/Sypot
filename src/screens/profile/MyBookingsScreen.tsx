import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, typography, borderRadius, shadows } from '../../utils/theme';
import { Event } from '../../types/navigation';
import { mockEvents } from '../../services/mockData';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { EventCardSkeleton } from '../../components/SkeletonLoader';

interface Booking extends Event {
  bookingId: string;
  bookingDate: Date;
  ticketNumber: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  qrCode?: string;
}

export default function MyBookingsScreen() {
  const navigation = useNavigation();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock bookings from events
      const mockBookings: Booking[] = mockEvents.slice(0, 4).map((event, index) => ({
        ...event,
        bookingId: `BK${Date.now() + index}`,
        bookingDate: new Date(),
        ticketNumber: `TK${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        status: index === 3 ? 'cancelled' : 'confirmed',
        qrCode: `QR${Math.random().toString(36).substr(2, 12)}`,
      }));
      
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const getFilteredBookings = () => {
    const now = new Date();
    return bookings.filter(booking => {
      const isUpcoming = booking.date > now;
      return activeTab === 'upcoming' ? isUpcoming : !isUpcoming;
    });
  };

  const handleCancelBooking = (booking: Booking) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for "${booking.title}"?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setBookings(prev => prev.map(b => 
              b.bookingId === booking.bookingId 
                ? { ...b, status: 'cancelled' }
                : b
            ));
            Alert.alert('Cancelled', 'Your booking has been cancelled successfully.');
          }
        }
      ]
    );
  };

  const handleViewTicket = (booking: Booking) => {
    Alert.alert(
      'Digital Ticket',
      `Event: ${booking.title}\nTicket: ${booking.ticketNumber}\nStatus: ${booking.status.toUpperCase()}`,
      [
        { text: 'Share Ticket', onPress: () => console.log('Share ticket') },
        { text: 'Download', onPress: () => console.log('Download ticket') },
        { text: 'Close' }
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Free';
    return `$${price}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'cancelled':
        return colors.error;
      default:
        return colors.neutral500;
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        <View style={styles.eventImagePlaceholder}>
          <Text style={styles.eventImageText}>🎫</Text>
        </View>
        
        <View style={styles.bookingInfo}>
          <Text style={styles.eventTitle} numberOfLines={2}>{booking.title}</Text>
          <Text style={styles.eventDate}>{formatDate(booking.date)}</Text>
          <Text style={styles.eventLocation} numberOfLines={1}>{booking.location}</Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
              <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.ticketNumber}>#{booking.ticketNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          title="View Ticket"
          variant="outline"
          size="small"
          onPress={() => handleViewTicket(booking)}
          style={styles.actionButton}
        />
        
        {booking.status === 'confirmed' && activeTab === 'upcoming' && (
          <Button
            title="Cancel"
            variant="outline"
            size="small"
            onPress={() => handleCancelBooking(booking)}
            style={[styles.actionButton, styles.cancelButton]}
            textStyle={styles.cancelButtonText}
          />
        )}
        
        {booking.status === 'confirmed' && (
          <Button
            title="Share"
            variant="ghost"
            size="small"
            onPress={() => Alert.alert('Share', 'Sharing event details...')}
            style={styles.shareButton}
          />
        )}
      </View>
    </Card>
  );

  const EmptyState = ({ type }: { type: 'upcoming' | 'past' }) => (
    <Card style={styles.emptyState}>
      <Text style={styles.emptyStateEmoji}>
        {type === 'upcoming' ? '📅' : '📜'}
      </Text>
      <Text style={styles.emptyStateTitle}>
        No {type} bookings
      </Text>
      <Text style={styles.emptyStateText}>
        {type === 'upcoming' 
          ? 'You haven\'t booked any upcoming events yet. Explore events to find something exciting!'
          : 'You don\'t have any past event bookings to show.'
        }
      </Text>
      {type === 'upcoming' && (
        <Button
          title="Explore Events"
          variant="primary"
          size="small"
          onPress={() => navigation.navigate('Explore' as never)}
          style={styles.exploreButton}
        />
      )}
    </Card>
  );

  const filteredBookings = getFilteredBookings();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Bookings</Text>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => Alert.alert('Filter', 'Booking filters will be implemented.')}
        >
          <Text style={styles.filterButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'upcoming' && styles.activeTabText
          ]}>
            Upcoming ({bookings.filter(b => b.date > new Date()).length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && styles.activeTab
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'past' && styles.activeTabText
          ]}>
            Past ({bookings.filter(b => b.date <= new Date()).length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))
        ) : filteredBookings.length === 0 ? (
          <EmptyState type={activeTab} />
        ) : (
          <>
            <View style={styles.statsContainer}>
              <Card style={styles.statsCard}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{bookings.length}</Text>
                  <Text style={styles.statLabel}>Total Bookings</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </Text>
                  <Text style={styles.statLabel}>Confirmed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    ${bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
                  </Text>
                  <Text style={styles.statLabel}>Total Spent</Text>
                </View>
              </Card>
            </View>

            {filteredBookings.map((booking) => (
              <BookingCard key={booking.bookingId} booking={booking} />
            ))}
          </>
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: typography.fontSize.base,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral600,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  statsContainer: {
    marginVertical: spacing.md,
  },
  statsCard: {
    padding: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral200,
    marginHorizontal: spacing.lg,
  },
  bookingCard: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  eventImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  eventImageText: {
    fontSize: 32,
  },
  bookingInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  eventDate: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginBottom: spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    color: 'white',
    fontWeight: '600',
  },
  ticketNumber: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral500,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  cancelButton: {
    borderColor: colors.error,
  },
  cancelButtonText: {
    color: colors.error,
  },
  shareButton: {
    paddingHorizontal: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  exploreButton: {
    paddingHorizontal: spacing.xl,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});