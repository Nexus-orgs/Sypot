import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  RefreshControl,
} from 'react-native';

import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../utils/theme';
import { Event } from '../../types/navigation';

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for an amazing night of music and fun!',
    date: new Date('2024-07-15'),
    location: 'Central Park, NYC',
    organizerId: 'org1',
    attendeeCount: 245,
    category: 'Music',
    price: 25,
  },
  {
    id: '2',
    title: 'Tech Meetup 2024',
    description: 'Networking event for tech professionals',
    date: new Date('2024-07-20'),
    location: 'Silicon Valley',
    organizerId: 'org2',
    attendeeCount: 89,
    category: 'Technology',
    price: 0,
  },
  {
    id: '3',
    title: 'Food Truck Rally',
    description: 'Best food trucks in the city gathered in one place',
    date: new Date('2024-07-25'),
    location: 'Downtown Plaza',
    organizerId: 'org3',
    attendeeCount: 156,
    category: 'Food & Drink',
  },
];

export default function HomeFeedScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [events] = useState<Event[]>(mockEvents);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const EventCard = ({ event }: { event: Event }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventImageContainer}>
        <View style={styles.eventImagePlaceholder}>
          <Text style={styles.eventImageText}>📅</Text>
        </View>
        <View style={styles.eventBadge}>
          <Text style={styles.eventBadgeText}>{event.category}</Text>
        </View>
      </View>

      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={styles.eventMetadata}>
          <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
          <Text style={styles.eventLocation}>{event.location}</Text>
        </View>

        <View style={styles.eventFooter}>
          <Text style={styles.attendeeCount}>
            {event.attendeeCount} attending
          </Text>
          <Text style={styles.eventPrice}>
            {event.price ? `$${event.price}` : 'Free'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.homeFeedBackground}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning! 👋</Text>
          <Text style={styles.subtitle}>Discover events around you</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileText}>👤</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionEmoji}>🎵</Text>
            <Text style={styles.actionText}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionEmoji}>🍽️</Text>
            <Text style={styles.actionText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionEmoji}>🏃</Text>
            <Text style={styles.actionText}>Sports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionEmoji}>💼</Text>
            <Text style={styles.actionText}>Business</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionEmoji}>🎨</Text>
            <Text style={styles.actionText}>Art</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Events Feed */}
      <ScrollView
        style={styles.eventsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Events For You</Text>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.homeFeedBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.homeFeedText,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedSubtle,
    marginTop: 2,
  },
  profileButton: {
    padding: spacing.xs,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.homeFeedPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: typography.fontSize.lg,
  },
  quickActions: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  actionButton: {
    alignItems: 'center',
    marginRight: spacing.lg,
    paddingVertical: spacing.sm,
  },
  actionEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSize.xs,
    color: colors.homeFeedSubtle,
    fontWeight: '500',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.homeFeedText,
    marginBottom: spacing.md,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  eventImageContainer: {
    position: 'relative',
  },
  eventImagePlaceholder: {
    height: 120,
    backgroundColor: colors.neutral100,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageText: {
    fontSize: 48,
  },
  eventBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.homeFeedPrimary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  eventBadgeText: {
    color: colors.homeFeedText,
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.homeFeedText,
    marginBottom: spacing.xs,
  },
  eventDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedSubtle,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  eventMetadata: {
    marginBottom: spacing.sm,
  },
  eventDate: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedText,
    fontWeight: '600',
  },
  eventLocation: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedSubtle,
    marginTop: 2,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeeCount: {
    fontSize: typography.fontSize.xs,
    color: colors.homeFeedSubtle,
  },
  eventPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedPrimary,
    fontWeight: '700',
  },
});
