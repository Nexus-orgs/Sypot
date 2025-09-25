import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const EventDetailsScreen = ({ navigation, route }) => {
  const [isAttending, setIsAttending] = useState(false);
  
  const event = route?.params?.event || {
    id: '1',
    title: 'Summer Music Festival 2024',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    date: 'Friday, July 12',
    time: '7:00 PM - 11:00 PM',
    location: 'Central Park, New York',
    price: '$45',
    organizer: 'NYC Events Co.',
    organizerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    attendees: 234,
    maxAttendees: 500,
    description: 'Join us for an unforgettable evening of live music featuring top artists from around the world. This outdoor festival will feature multiple stages, food trucks, and art installations. Come experience the magic of summer nights with great music and amazing people!',
    highlights: [
      '5 Live Bands',
      'Food & Drinks',
      'Art Installations',
      'VIP Area Available',
    ],
  };

  const BackIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.textLight} viewBox="0 0 256 256">
      <Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
    </Svg>
  );

  const ShareIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.textLight} viewBox="0 0 256 256">
      <Path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z" />
    </Svg>
  );

  const LocationIcon = () => (
    <Svg width={16} height={16} fill={theme.colors.subtleLight} viewBox="0 0 256 256">
      <Path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
    </Svg>
  );

  const CalendarIcon = () => (
    <Svg width={16} height={16} fill={theme.colors.subtleLight} viewBox="0 0 256 256">
      <Path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM48,208V96H208V208Z" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          
          {/* Back and Share buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <BackIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <ShareIcon />
            </TouchableOpacity>
          </View>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
        </View>

        {/* Event Info */}
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          {/* Date and Location */}
          <View style={styles.infoRow}>
            <CalendarIcon />
            <Text style={styles.infoText}>{event.date} · {event.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <LocationIcon />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>

          {/* Organizer */}
          <TouchableOpacity style={styles.organizerCard} activeOpacity={0.8}>
            <Image source={{ uri: event.organizerAvatar }} style={styles.organizerAvatar} />
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerLabel}>Organized by</Text>
              <Text style={styles.organizerName}>{event.organizer}</Text>
            </View>
            <Text style={styles.followButton}>Follow</Text>
          </TouchableOpacity>

          {/* Attendees */}
          <View style={styles.attendeesSection}>
            <Text style={styles.sectionTitle}>Attendees</Text>
            <View style={styles.attendeesInfo}>
              <Text style={styles.attendeesCount}>
                {event.attendees}/{event.maxAttendees} attending
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${(event.attendees / event.maxAttendees) * 100}%` }
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Highlights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            {event.highlights.map((highlight, index) => (
              <View key={index} style={styles.highlightItem}>
                <Text style={styles.highlightBullet}>•</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>{event.price}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.attendButton, isAttending && styles.attendingButton]}
              onPress={() => setIsAttending(!isAttending)}
              activeOpacity={0.8}
            >
              <Text style={[styles.attendButtonText, isAttending && styles.attendingButtonText]}>
                {isAttending ? 'Attending ✓' : 'Get Tickets'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: width,
    height: width * 0.75,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
  },
  headerButtons: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  categoryText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.subtleLight,
  },
  organizerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.md,
    ...theme.shadows.sm,
  },
  organizerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
  },
  organizerName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  followButton: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  attendeesSection: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.sm,
  },
  attendeesInfo: {
    marginTop: theme.spacing.sm,
  },
  attendeesCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.subtleLight,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  description: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
    lineHeight: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
  },
  highlightBullet: {
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
  },
  highlightText: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  priceLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
  },
  price: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  attendButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  attendingButton: {
    backgroundColor: theme.colors.success,
  },
  attendButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'bold',
  },
  attendingButtonText: {
    color: theme.colors.white,
  },
});

export default EventDetailsScreen;