import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
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
import { getMockEvents, eventCategories } from '../../services/mockData';
import { EventCardSkeleton } from '../../components/SkeletonLoader';
import Card from '../../components/Card';

export default function HomeFeedScreenEnhanced() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadEvents();
  }, [selectedCategory]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await getMockEvents(
        selectedCategory === 'All' ? undefined : selectedCategory,
      );
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEvents();
    setRefreshing(false);
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
    if (!price) {
      return 'Free';
    }
    return `$${price}`;
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card onPress={() => console.log('Event pressed:', event.id)} padding="lg">
      <View style={styles.eventImageContainer}>
        <View style={styles.eventImagePlaceholder}>
          <Text style={styles.eventImageText}>
            {eventCategories.find(cat => cat.name === event.category)?.emoji ||
              '📅'}
          </Text>
        </View>
        <View style={styles.eventBadge}>
          <Text style={styles.eventBadgeText}>{event.category}</Text>
        </View>
      </View>

      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {event.description}
        </Text>

        <View style={styles.eventMetadata}>
          <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
          <Text style={styles.eventLocation} numberOfLines={1}>
            {event.location}
          </Text>
        </View>

        <View style={styles.eventFooter}>
          <Text style={styles.attendeeCount}>
            {event.attendeeCount} attending
          </Text>
          <Text style={[styles.eventPrice, !event.price && styles.freeEvent]}>
            {formatPrice(event.price)}
          </Text>
        </View>
      </View>
    </Card>
  );

  const CategoryChip = ({
    category,
  }: {
    category:
      | (typeof eventCategories)[0]
      | { name: string; emoji?: string; color?: string };
  }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === category.name && {
          backgroundColor: category.color || colors.primary,
        },
      ]}
      onPress={() => setSelectedCategory(category.name)}
    >
      {category.emoji && (
        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
      )}
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category.name && styles.selectedCategoryText,
        ]}
      >
        {category.name}
      </Text>
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
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          <CategoryChip category={{ name: 'All', emoji: '🌟' }} />
          {eventCategories.map(category => (
            <CategoryChip key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>

      {/* Events Feed */}
      <ScrollView
        style={styles.eventsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All'
              ? 'Events For You'
              : `${selectedCategory} Events`}
          </Text>
          <Text style={styles.eventCount}>
            {loading ? '...' : `${events.length} events`}
          </Text>
        </View>

        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))
        ) : events.length === 0 ? (
          // Empty state
          <Card style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>🔍</Text>
            <Text style={styles.emptyStateTitle}>No events found</Text>
            <Text style={styles.emptyStateText}>
              Try selecting a different category or check back later for new
              events.
            </Text>
          </Card>
        ) : (
          // Events list
          events.map(event => <EventCard key={event.id} event={event} />)
        )}
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
    position: 'relative',
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
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: spacing.md,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.lg,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'white',
    marginRight: spacing.sm,
    ...shadows.sm,
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedText,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.homeFeedText,
  },
  eventCount: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedSubtle,
  },
  eventImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  eventImagePlaceholder: {
    height: 120,
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.lg,
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
    // No padding here since Card component handles it
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
  freeEvent: {
    color: colors.success,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.homeFeedText,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: typography.fontSize.sm,
    color: colors.homeFeedSubtle,
    textAlign: 'center',
    lineHeight: 20,
  },
});
