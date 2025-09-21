import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Typography, Spacing, BorderRadius} from '../../themes';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image?: string;
    attendees: number;
    price?: string;
    category: string;
  };
  onPress: () => void;
  onBookmark?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({event, onPress, onBookmark}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {event.image ? (
          <Image source={{uri: event.image}} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="event" size={32} color={Colors.textGray} />
          </View>
        )}
        <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmark}>
          <Icon name="bookmark-border" size={20} color={Colors.textWhite} />
        </TouchableOpacity>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{event.category}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={3}>
          {event.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Icon name="schedule" size={16} color={Colors.textGray} />
            <Text style={styles.detailText}>{event.date} • {event.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="location-on" size={16} color={Colors.textGray} />
            <Text style={styles.detailText} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.attendeesContainer}>
            <Icon name="people" size={16} color={Colors.primary} />
            <Text style={styles.attendeesText}>
              {event.attendees} attending
            </Text>
          </View>
          
          {event.price && (
            <Text style={styles.priceText}>{event.price}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.neutral200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: BorderRadius.full,
    padding: Spacing.xs,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.base,
  },
  categoryText: {
    ...Typography.caption,
    color: Colors.textWhite,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    padding: Spacing.md,
  },
  title: {
    ...Typography.headingSmall,
    color: Colors.textBlack,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.bodyMedium,
    color: Colors.textGray,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  details: {
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  detailText: {
    ...Typography.bodySmall,
    color: Colors.textGray,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  priceText: {
    ...Typography.headingSmall,
    color: Colors.secondary,
    fontWeight: '700',
  },
});

export default EventCard;