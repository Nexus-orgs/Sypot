import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const events = [
    {
      id: '1',
      title: 'Summer Music Festival',
      location: 'Central Park, New York',
      date: 'Fri, Jul 12',
      time: '7:00 PM',
      image:
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    },
    {
      id: '2',
      title: 'Artisan Market',
      location: 'Downtown, Los Angeles',
      date: 'Sat, Jul 13',
      time: '10:00 AM',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800',
    },
    {
      id: '3',
      title: 'Tech Conference 2024',
      location: 'Convention Center, San Francisco',
      date: 'Mon, Jul 15',
      time: '9:00 AM',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
      id: '4',
      title: 'Food & Wine Festival',
      location: 'Marina Bay, Singapore',
      date: 'Sat, Jul 20',
      time: '6:00 PM',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    },
  ];

  const SearchIcon = () => (
    <Svg
      width={24}
      height={24}
      fill={theme.colors.textLight}
      viewBox="0 0 256 256"
    >
      <Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </Svg>
  );

  const BookmarkIcon = () => (
    <Svg
      width={20}
      height={20}
      fill={theme.colors.subtleLight}
      viewBox="0 0 256 256"
    >
      <Path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
    </Svg>
  );

  const ShareIcon = () => (
    <Svg
      width={20}
      height={20}
      fill={theme.colors.subtleLight}
      viewBox="0 0 256 256"
    >
      <Path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z" />
    </Svg>
  );

  const renderEventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventDateTime}>
          {item.date} · {item.time}
        </Text>
      </View>
      <View style={styles.eventActions}>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <BookmarkIcon />
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <ShareIcon />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.appName}>Sypot</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.sectionTitle}>For You</Text>}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: `${theme.colors.backgroundLight}CC`,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: theme.colors.textLight,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    paddingTop: theme.spacing.md,
  },
  listContainer: {
    paddingBottom: theme.spacing.xl,
  },
  eventCard: {
    marginBottom: theme.spacing.lg,
  },
  eventImage: {
    width: width - theme.spacing.md * 2,
    height: (width - theme.spacing.md * 2) * 0.75,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
  },
  eventInfo: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  eventTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.subtleLight,
    marginBottom: 2,
  },
  eventDateTime: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: 'normal',
    color: theme.colors.subtleLight,
  },
  eventActions: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.primary}1A`,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.sm,
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.subtleLight,
  },
});

export default HomeScreen;
