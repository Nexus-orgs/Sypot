import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {HomeStackParamList} from '../../navigation/types';
import {Colors, Typography, Spacing} from '../../themes';
import EventCard from '../../components/cards/EventCard';

type HomeNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeFeed'>;

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for an amazing outdoor music festival featuring top artists and local bands. Food trucks, art installations, and great vibes!',
    date: 'Aug 15',
    time: '6:00 PM',
    location: 'Central Park, NYC',
    attendees: 247,
    price: '$45',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
  },
  {
    id: '2',
    title: 'Tech Startup Meetup',
    description: 'Network with fellow entrepreneurs and learn about the latest trends in tech startups. Includes dinner and drinks.',
    date: 'Aug 18',
    time: '7:30 PM',
    location: 'Innovation Hub',
    attendees: 89,
    price: 'Free',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
  },
  {
    id: '3',
    title: 'Yoga in the Park',
    description: 'Start your weekend with a refreshing yoga session in the beautiful morning light. All levels welcome!',
    date: 'Aug 20',
    time: '8:00 AM',
    location: 'Riverside Park',
    attendees: 34,
    price: '$15',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
  },
];

const HomeFeedScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [events, setEvents] = useState(mockEvents);
  const [refreshing, setRefreshing] = useState(false);

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetails', {eventId});
  };

  const handleSearch = () => {
    // Navigate to search or show search modal
  };

  const handleProfile = () => {
    navigation.navigate('UserProfile', {userId: 'current-user'});
  };

  const handleNotifications = () => {
    // Navigate to notifications
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderEvent = ({item}: {item: typeof mockEvents[0]}) => (
    <EventCard
      event={item}
      onPress={() => handleEventPress(item.id)}
      onBookmark={() => {}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleProfile}>
            <View style={styles.avatar}>
              <Icon name="person" size={24} color={Colors.textWhite} />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>Sarah</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
            <Icon name="search" size={24} color={Colors.textBlack} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotifications} style={styles.iconButton}>
            <Icon name="notifications-none" size={24} color={Colors.textBlack} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Discover</Text>
        <View style={styles.categories}>
          {['All', 'Music', 'Sports', 'Business', 'Wellness', 'Food'].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Events Near You</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightAlt,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundLight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  greeting: {
    ...Typography.bodyMedium,
    color: Colors.textGray,
  },
  userName: {
    ...Typography.headingSmall,
    color: Colors.textBlack,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  categoriesContainer: {
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.headingMedium,
    color: Colors.textBlack,
    marginBottom: Spacing.md,
  },
  categories: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.neutral200,
    borderRadius: 20,
  },
  categoryText: {
    ...Typography.bodySmall,
    color: Colors.textBlack,
    fontWeight: '500',
  },
  listHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
});

export default HomeFeedScreen;