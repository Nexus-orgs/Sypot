import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'See you at the festival! 🎉',
      time: '2m ago',
      unread: 2,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      online: true,
    },
    {
      id: '2',
      name: 'Event Group: Summer Fest',
      lastMessage: "Mike: Can't wait for tomorrow!",
      time: '15m ago',
      unread: 5,
      avatar:
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200',
      isGroup: true,
    },
    {
      id: '3',
      name: 'Alex Chen',
      lastMessage: 'Thanks for the invite 👍',
      time: '1h ago',
      unread: 0,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      online: false,
    },
    {
      id: '4',
      name: 'Jazz Night Organizer',
      lastMessage: 'Your ticket is confirmed',
      time: '3h ago',
      unread: 0,
      avatar:
        'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=200',
      online: true,
    },
    {
      id: '5',
      name: 'Emma Wilson',
      lastMessage: 'Photo from yesterday',
      time: '5h ago',
      unread: 1,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      online: false,
    },
    {
      id: '6',
      name: 'Yoga Class Group',
      lastMessage: 'Lisa: Class moved to 6 PM',
      time: 'Yesterday',
      unread: 0,
      avatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      isGroup: true,
    },
  ];

  const SearchIcon = () => (
    <Svg
      width={20}
      height={20}
      fill={theme.colors.gray[400]}
      viewBox="0 0 256 256"
    >
      <Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </Svg>
  );

  const NewMessageIcon = () => (
    <Svg
      width={24}
      height={24}
      fill={theme.colors.primary}
      viewBox="0 0 256 256"
    >
      <Path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" />
    </Svg>
  );

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('Chat', { conversation: item })}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && !item.isGroup && (
          <View style={styles.onlineIndicator} />
        )}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <View style={styles.conversationFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
          <NewMessageIcon />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={theme.colors.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={item => item.id}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: 'bold',
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
    color: theme.colors.textLight,
  },
  listContainer: {
    paddingBottom: theme.spacing.lg,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.success,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textLight,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  conversationTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});

export default MessagesScreen;
