import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const MyBookingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = [
    {
      id: '1',
      title: 'Summer Music Festival',
      date: 'Fri, Jul 12',
      time: '7:00 PM',
      location: 'Central Park, New York',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
      ticketType: 'General Admission',
      ticketCount: 2,
      price: '$90',
    },
    {
      id: '2',
      title: 'Tech Conference 2024',
      date: 'Mon, Jul 15',
      time: '9:00 AM',
      location: 'Convention Center, SF',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      ticketType: 'VIP Pass',
      ticketCount: 1,
      price: '$299',
    },
    {
      id: '3',
      title: 'Food & Wine Festival',
      date: 'Sat, Jul 20',
      time: '6:00 PM',
      location: 'Marina Bay, Singapore',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      ticketType: 'Standard',
      ticketCount: 4,
      price: '$160',
    },
  ];

  const pastBookings = [
    {
      id: '4',
      title: 'Jazz Night',
      date: 'Sat, Jun 28',
      time: '8:00 PM',
      location: 'Blue Note Club',
      image: 'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=400',
      ticketType: 'Table for 2',
      ticketCount: 2,
      price: '$120',
    },
    {
      id: '5',
      title: 'Art Exhibition Opening',
      date: 'Sun, Jun 15',
      time: '2:00 PM',
      location: 'Modern Art Museum',
      image: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?w=400',
      ticketType: 'General Entry',
      ticketCount: 1,
      price: 'Free',
    },
  ];

  const TicketIcon = () => (
    <Svg width={20} height={20} fill={theme.colors.primary} viewBox="0 0 256 256">
      <Path d="M232,104a8,8,0,0,0,8-8V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V96a8,8,0,0,0,8,8,24,24,0,0,1,0,48,8,8,0,0,0-8,8v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160a8,8,0,0,0-8-8,24,24,0,0,1,0-48ZM32,167.2a40,40,0,0,0,0-78.4V64H88V192H32Zm192,24.8H104V64H224V88.8a40,40,0,0,0,0,78.4Z" />
    </Svg>
  );

  const QRIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.white} viewBox="0 0 256 256">
      <Path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h32A8,8,0,0,1,216,160Zm0,32v24a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z" />
    </Svg>
  );

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('TicketDetails', { booking: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.bookingImage} />
      
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingTitle} numberOfLines={1}>{item.title}</Text>
        
        <View style={styles.bookingDetails}>
          <Text style={styles.bookingDate}>{item.date} · {item.time}</Text>
          <Text style={styles.bookingLocation} numberOfLines={1}>{item.location}</Text>
        </View>
        
        <View style={styles.ticketInfo}>
          <View style={styles.ticketDetails}>
            <TicketIcon />
            <Text style={styles.ticketText}>
              {item.ticketCount} {item.ticketType}
            </Text>
          </View>
          <Text style={styles.ticketPrice}>{item.price}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.qrButton}>
        <QRIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming ({upcomingBookings.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past ({pastBookings.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.default,
  },
  bookingImage: {
    width: 100,
    height: 120,
  },
  bookingInfo: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  bookingTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  bookingDetails: {
    flex: 1,
  },
  bookingDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[700],
    marginBottom: 2,
  },
  bookingLocation: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
  },
  ticketInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  ticketText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[700],
  },
  ticketPrice: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  qrButton: {
    width: 60,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[500],
  },
});

export default MyBookingsScreen;