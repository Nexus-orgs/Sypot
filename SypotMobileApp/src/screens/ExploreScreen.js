import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Music',
    'Sports',
    'Art',
    'Food',
    'Tech',
    'Business',
    'Outdoor',
  ];

  const exploreItems = [
    {
      id: '1',
      title: 'Jazz Night',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=400',
      attendees: 120,
    },
    {
      id: '2',
      title: 'Art Exhibition',
      category: 'Art',
      image: 'https://images.unsplash.com/photo-1545989253-02cc26577f88?w=400',
      attendees: 85,
    },
    {
      id: '3',
      title: 'Startup Meetup',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
      attendees: 200,
    },
    {
      id: '4',
      title: 'Food Festival',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      attendees: 350,
    },
    {
      id: '5',
      title: 'Hiking Adventure',
      category: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
      attendees: 45,
    },
    {
      id: '6',
      title: 'Basketball Tournament',
      category: 'Sports',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
      attendees: 150,
    },
  ];

  const SearchIcon = () => (
    <Svg width={20} height={20} fill={theme.colors.gray[400]} viewBox="0 0 256 256">
      <Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </Svg>
  );

  const FilterIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.textLight} viewBox="0 0 256 256">
      <Path d="M192,120v96a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V120H40a8,8,0,0,1-5.66-13.66l88-88a8,8,0,0,1,11.32,0l88,88A8,8,0,0,1,216,120Z" />
    </Svg>
  );

  const renderExploreItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exploreItem}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemOverlay}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemAttendees}>{item.attendees} attending</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, venues, and more..."
            placeholderTextColor={theme.colors.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={exploreItems}
        renderItem={renderExploreItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContainer}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: "bold",
    color: theme.colors.textLight,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    fontWeight: "normal",
    color: theme.colors.textLight,
  },
  categoriesContainer: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
    marginRight: theme.spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "500",
    color: theme.colors.textLight,
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  gridContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  exploreItem: {
    width: (width - theme.spacing.md * 3) / 2,
    height: (width - theme.spacing.md * 3) / 2,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  itemCategory: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: "500",
    color: theme.colors.primary,
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.white,
    marginBottom: 2,
  },
  itemAttendees: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: "normal",
    color: theme.colors.gray[300],
  },
});

export default ExploreScreen;