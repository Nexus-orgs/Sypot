import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { colors, spacing, typography, borderRadius, shadows } from '../../utils/theme';

const categories = ['All', 'Music', 'Food', 'Sports', 'Tech', 'Art', 'Business'];

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events, places, people..."
          placeholderTextColor={colors.neutral500}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Popular Events</Text>
        
        {/* Placeholder content */}
        {[1, 2, 3, 4].map((index) => (
          <TouchableOpacity key={index} style={styles.eventCard}>
            <View style={styles.eventImagePlaceholder}>
              <Text style={styles.eventImageText}>🎉</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Sample Event {index}</Text>
              <Text style={styles.eventDate}>Tomorrow • 7:00 PM</Text>
              <Text style={styles.eventLocation}>Sample Location</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  searchInput: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.base,
    ...shadows.sm,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'white',
    marginRight: spacing.sm,
    ...shadows.sm,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
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
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  eventImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: colors.neutral100,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageText: {
    fontSize: 32,
  },
  eventInfo: {
    flex: 1,
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  eventDate: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
  },
});