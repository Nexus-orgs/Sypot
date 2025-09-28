import React, { useState, useEffect, useCallback } from 'react';
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
import { Event, Business } from '../../types/navigation';
import {
  getMockEvents,
  getMockBusinesses,
  searchEvents,
  eventCategories,
} from '../../services/mockData';
import { EventCardSkeleton } from '../../components/SkeletonLoader';
import Input from '../../components/Input';
import Card from '../../components/Card';
import Button from '../../components/Button';

type TabType = 'events' | 'businesses';

export default function ExploreScreenEnhanced() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (searchText.trim()) {
      handleSearch();
    } else {
      loadEventsByCategory();
    }
  }, [searchText, selectedCategory]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [eventsData, businessesData] = await Promise.all([
        getMockEvents(),
        getMockBusinesses(),
      ]);
      setEvents(eventsData);
      setBusinesses(businessesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEventsByCategory = async () => {
    if (activeTab !== 'events') {
      return;
    }

    try {
      const eventsData = await getMockEvents(
        selectedCategory === 'All' ? undefined : selectedCategory,
      );
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleSearch = useCallback(async () => {
    if (!searchText.trim()) {
      return;
    }

    try {
      setSearchLoading(true);
      if (activeTab === 'events') {
        const searchResults = await searchEvents(searchText);
        setEvents(searchResults);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setSearchLoading(false);
    }
  }, [searchText, activeTab]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
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

  const EventCard = ({ event }: { event: Event }) => (
    <Card
      onPress={() => console.log('Event pressed:', event.id)}
      style={styles.itemCard}
    >
      <View style={styles.cardContent}>
        <View style={styles.eventImagePlaceholder}>
          <Text style={styles.eventImageText}>
            {eventCategories.find(cat => cat.name === event.category)?.emoji ||
              '📅'}
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {event.title}
          </Text>
          <Text style={styles.itemDate}>{formatDate(event.date)}</Text>
          <Text style={styles.itemLocation} numberOfLines={1}>
            {event.location}
          </Text>
          <View style={styles.itemFooter}>
            <Text style={styles.attendeeCount}>
              {event.attendeeCount} attending
            </Text>
            <Text style={styles.eventPrice}>
              {event.price ? `$${event.price}` : 'Free'}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const BusinessCard = ({ business }: { business: Business }) => (
    <Card
      onPress={() => console.log('Business pressed:', business.id)}
      style={styles.itemCard}
    >
      <View style={styles.cardContent}>
        <View style={styles.businessImagePlaceholder}>
          <Text style={styles.businessImageText}>🏢</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {business.name}
          </Text>
          <Text style={styles.businessCategory}>{business.category}</Text>
          <Text style={styles.itemLocation} numberOfLines={1}>
            {business.location}
          </Text>
          <View style={styles.itemFooter}>
            <Text style={styles.rating}>⭐ {business.rating}</Text>
          </View>
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

  const EmptyState = ({ type }: { type: TabType }) => (
    <Card style={styles.emptyState}>
      <Text style={styles.emptyStateEmoji}>
        {searchText ? '🔍' : type === 'events' ? '📅' : '🏢'}
      </Text>
      <Text style={styles.emptyStateTitle}>
        {searchText ? 'No results found' : `No ${type} available`}
      </Text>
      <Text style={styles.emptyStateText}>
        {searchText
          ? 'Try adjusting your search terms or browse by category.'
          : `Check back later for new ${type} or try a different category.`}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search events, places, people..."
          value={searchText}
          onChangeText={setSearchText}
          leftIcon={<Text style={styles.searchIcon}>🔍</Text>}
          rightIcon={
            searchText ? (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            ) : undefined
          }
        />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <Button
          title="Events"
          onPress={() => setActiveTab('events')}
          variant={activeTab === 'events' ? 'primary' : 'outline'}
          size="small"
          style={[styles.tabButton, activeTab === 'events' && styles.activeTab]}
        />
        <Button
          title="Businesses"
          onPress={() => setActiveTab('businesses')}
          variant={activeTab === 'businesses' ? 'primary' : 'outline'}
          size="small"
          style={[
            styles.tabButton,
            activeTab === 'businesses' && styles.activeTab,
          ]}
        />
      </View>

      {/* Categories (only show for events) */}
      {activeTab === 'events' && !searchText && (
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
      )}

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchText
              ? 'Search Results'
              : activeTab === 'events'
              ? selectedCategory === 'All'
                ? 'Popular Events'
                : `${selectedCategory} Events`
              : 'Popular Businesses'}
          </Text>
          {!loading && (
            <Text style={styles.resultCount}>
              {activeTab === 'events' ? events.length : businesses.length}{' '}
              results
            </Text>
          )}
        </View>

        {loading || searchLoading ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))
        ) : (
          <>
            {activeTab === 'events' ? (
              events.length === 0 ? (
                <EmptyState type="events" />
              ) : (
                events.map(event => <EventCard key={event.id} event={event} />)
              )
            ) : businesses.length === 0 ? (
              <EmptyState type="businesses" />
            ) : (
              businesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))
            )}
          </>
        )}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.textDark,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchIcon: {
    fontSize: typography.fontSize.base,
  },
  clearIcon: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral500,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  categoriesContainer: {
    marginBottom: spacing.lg,
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
    color: colors.textDark,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  content: {
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
    color: colors.textDark,
  },
  resultCount: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
  },
  itemCard: {
    padding: spacing.sm,
  },
  cardContent: {
    flexDirection: 'row',
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
  businessImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  businessImageText: {
    fontSize: 32,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  itemDate: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  businessCategory: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemLocation: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginBottom: spacing.sm,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeeCount: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral500,
  },
  eventPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  rating: {
    fontSize: typography.fontSize.sm,
    color: colors.warning,
    fontWeight: '600',
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
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  emptyStateText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    textAlign: 'center',
    lineHeight: 20,
  },
});
