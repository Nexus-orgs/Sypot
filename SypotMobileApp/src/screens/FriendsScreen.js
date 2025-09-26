import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const FriendsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const friends = [
    {
      id: '1',
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      mutualFriends: 12,
      isFollowing: true,
    },
    {
      id: '2',
      name: 'Mike Chen',
      username: '@mikechen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      mutualFriends: 8,
      isFollowing: true,
    },
    {
      id: '3',
      name: 'Emma Wilson',
      username: '@emmaw',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      mutualFriends: 15,
      isFollowing: true,
    },
    {
      id: '4',
      name: 'James Brown',
      username: '@jamesbrown',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      mutualFriends: 5,
      isFollowing: true,
    },
  ];

  const requests = [
    {
      id: '5',
      name: 'Lisa Park',
      username: '@lisapark',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      mutualFriends: 3,
      requestTime: '2 days ago',
    },
    {
      id: '6',
      name: 'Tom Anderson',
      username: '@tomanderson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
      mutualFriends: 7,
      requestTime: '1 week ago',
    },
  ];

  const suggestions = [
    {
      id: '7',
      name: 'Alex Rivera',
      username: '@alexr',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      mutualFriends: 18,
      isFollowing: false,
    },
    {
      id: '8',
      name: 'Nina Patel',
      username: '@ninap',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      mutualFriends: 10,
      isFollowing: false,
    },
  ];

  const SearchIcon = () => (
    <Svg width={20} height={20} fill={theme.colors.gray[400]} viewBox="0 0 256 256">
      <Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
    </Svg>
  );

  const UserPlusIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.primary} viewBox="0 0 256 256">
      <Path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z" />
    </Svg>
  );

  const renderFriend = ({ item }) => (
    <TouchableOpacity
      style={styles.friendCard}
      onPress={() => navigation.navigate('Profile', { user: item })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendUsername}>{item.username}</Text>
        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>
      </View>
      
      {activeTab === 'friends' && (
        <TouchableOpacity style={styles.followingButton}>
          <Text style={styles.followingButtonText}>Following</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendUsername}>{item.username}</Text>
        <Text style={styles.mutualFriends}>
          {item.mutualFriends} mutual friends • {item.requestTime}
        </Text>
        
        <View style={styles.requestActions}>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity style={styles.friendCard} activeOpacity={0.7}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendUsername}>{item.username}</Text>
        <Text style={styles.mutualFriends}>{item.mutualFriends} mutual friends</Text>
      </View>
      
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const getDisplayData = () => {
    switch (activeTab) {
      case 'friends':
        return friends.filter(f => 
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'requests':
        return requests;
      case 'suggestions':
        return suggestions;
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friends</Text>
        <TouchableOpacity>
          <UserPlusIcon />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests ({requests.length})
          </Text>
          {requests.length > 0 && <View style={styles.badge} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'suggestions' && styles.activeTab]}
          onPress={() => setActiveTab('suggestions')}
        >
          <Text style={[styles.tabText, activeTab === 'suggestions' && styles.activeTabText]}>
            Discover
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {activeTab === 'friends' && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput
              style={styles.searchInput}
              placeholder="Search friends..."
              placeholderTextColor={theme.colors.gray[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      )}

      {/* Content */}
      <FlatList
        data={getDisplayData()}
        renderItem={
          activeTab === 'requests' ? renderRequest : 
          activeTab === 'suggestions' ? renderSuggestion : 
          renderFriend
        }
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'requests' ? 'No pending requests' :
               activeTab === 'suggestions' ? 'No suggestions available' :
               searchQuery ? 'No friends found' : 'No friends yet'}
            </Text>
          </View>
        }
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
    paddingVertical: theme.spacing.md,
  },
  backButton: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    position: 'relative',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
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
    paddingVertical: theme.spacing.sm,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: theme.spacing.md,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  friendUsername: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: 4,
  },
  mutualFriends: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
  },
  followingButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
  },
  followingButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.textLight,
  },
  addButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
  },
  addButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.white,
  },
  requestActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  acceptButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
  },
  acceptButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.white,
  },
  declineButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[200],
  },
  declineButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.textLight,
  },
  emptyContainer: {
    paddingVertical: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[500],
  },
});

export default FriendsScreen;