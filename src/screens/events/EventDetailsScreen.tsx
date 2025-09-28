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
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from '../../utils/theme';
import { Event, User } from '../../types/navigation';
import { mockEvents, mockUsers } from '../../services/mockData';
import Button from '../../components/Button';
import Card from '../../components/Card';

const { width } = Dimensions.get('window');

interface RouteParams {
  eventId: string;
}

export default function EventDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params as RouteParams;

  const [event, setEvent] = useState<Event | null>(null);
  const [organizer, setOrganizer] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  useEffect(() => {
    loadEventDetails();
  }, [eventId]);

  const loadEventDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const eventData = mockEvents.find(e => e.id === eventId);
      if (eventData) {
        setEvent(eventData);
        const organizerData = mockUsers.find(
          u => u.id === eventData.organizerId,
        );
        setOrganizer(organizerData || null);
      }
    } catch (error) {
      console.error('Error loading event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookEvent = () => {
    if (!event) {
      return;
    }

    Alert.alert(
      'Book Event',
      `Would you like to book "${event.title}"?${
        event.price ? ` Price: $${event.price}` : ' This event is free.'
      }`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book Now',
          onPress: () => {
            setIsAttending(true);
            Alert.alert('Success!', 'You have successfully booked this event.');
          },
        },
      ],
    );
  };

  const handleShareEvent = () => {
    Alert.alert(
      'Share Event',
      'Sharing functionality will be implemented with native share API.',
    );
  };

  const handleMessageOrganizer = () => {
    if (!organizer) {
      return;
    }
    Alert.alert('Message Organizer', `Open chat with ${organizer.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Message', onPress: () => console.log('Navigate to chat') },
    ]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) {
      return 'Free Event';
    }
    return `$${price}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading event details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              isBookmarked && styles.bookmarkedButton,
            ]}
            onPress={() => setIsBookmarked(!isBookmarked)}
          >
            <Text style={styles.actionButtonText}>
              {isBookmarked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShareEvent}
          >
            <Text style={styles.actionButtonText}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <View style={styles.eventImage}>
            <Text style={styles.eventImageText}>🎉</Text>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{event.category}</Text>
          </View>
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📅</Text>
              <Text style={styles.metaText}>{formatDate(event.date)}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{event.location}</Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>👥</Text>
              <Text style={styles.metaText}>
                {event.attendeeCount} attending
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>💰</Text>
              <Text style={styles.metaText}>{formatPrice(event.price)}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About This Event</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </Card>

        {/* Organizer */}
        {organizer && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Organized By</Text>
            <TouchableOpacity
              style={styles.organizerCard}
              onPress={handleMessageOrganizer}
            >
              <View style={styles.organizerAvatar}>
                <Text style={styles.organizerAvatarText}>
                  {organizer.avatar || organizer.name.charAt(0)}
                </Text>
              </View>
              <View style={styles.organizerInfo}>
                <Text style={styles.organizerName}>{organizer.name}</Text>
                <Text style={styles.organizerStats}>
                  {organizer.eventsAttended} events • {organizer.friendsCount}{' '}
                  friends
                </Text>
              </View>
              <TouchableOpacity style={styles.messageButton}>
                <Text style={styles.messageButtonText}>💬</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>
        )}

        {/* Location Map Placeholder */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapText}>{event.location}</Text>
            <Button
              title="Open in Maps"
              variant="outline"
              size="small"
              onPress={() =>
                Alert.alert('Maps', 'Will open in device maps app')
              }
            />
          </View>
        </Card>

        {/* Attendees Placeholder */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Who's Going</Text>
          <View style={styles.attendeesContainer}>
            <View style={styles.attendeeAvatars}>
              {Array.from({ length: Math.min(5, event.attendeeCount) }).map(
                (_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.attendeeAvatar,
                      { marginLeft: index > 0 ? -10 : 0 },
                    ]}
                  >
                    <Text style={styles.attendeeAvatarText}>
                      {mockUsers[index % mockUsers.length]?.avatar || '👤'}
                    </Text>
                  </View>
                ),
              )}
            </View>
            <Text style={styles.attendeeCount}>
              {event.attendeeCount} people are attending
            </Text>
          </View>
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>
            {event.price ? 'Price' : 'Free Event'}
          </Text>
          <Text style={styles.priceValue}>{formatPrice(event.price)}</Text>
        </View>

        <Button
          title={isAttending ? 'Attending ✓' : 'Book Now'}
          onPress={handleBookEvent}
          variant={isAttending ? 'secondary' : 'primary'}
          size="large"
          style={styles.bookButton}
          disabled={isAttending}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    color: colors.neutral600,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.error,
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  backButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    ...shadows.sm,
  },
  bookmarkedButton: {
    backgroundColor: colors.error,
  },
  actionButtonText: {
    fontSize: typography.fontSize.base,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  eventImage: {
    height: 250,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageText: {
    fontSize: 64,
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  categoryBadgeText: {
    color: 'white',
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
  },
  eventInfo: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  eventTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.lg,
    lineHeight: 36,
  },
  eventMeta: {
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: typography.fontSize.base,
    marginRight: spacing.sm,
    width: 24,
  },
  metaText: {
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    flex: 1,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  eventDescription: {
    fontSize: typography.fontSize.base,
    color: colors.neutral700,
    lineHeight: 24,
  },
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  organizerAvatarText: {
    fontSize: typography.fontSize.lg,
    color: 'white',
    fontWeight: '600',
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  organizerStats: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: 2,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButtonText: {
    fontSize: typography.fontSize.base,
  },
  mapPlaceholder: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.neutral50,
    borderRadius: borderRadius.lg,
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  mapText: {
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  attendeesContainer: {
    alignItems: 'center',
  },
  attendeeAvatars: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  attendeeAvatarText: {
    fontSize: typography.fontSize.sm,
  },
  attendeeCount: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
  },
  bottomSpacing: {
    height: 120, // Space for bottom bar
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    ...shadows.lg,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
  },
  priceValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  bookButton: {
    width: '100%',
  },
});
