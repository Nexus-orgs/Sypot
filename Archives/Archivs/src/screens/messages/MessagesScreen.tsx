import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { colors, spacing, typography, borderRadius } from '../../utils/theme';

const mockChats = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'Hey! Are you going to the music festival tomorrow?',
    timestamp: '2 min',
    unread: 2,
  },
  {
    id: '2',
    name: 'Tech Meetup Group',
    lastMessage: 'Thanks everyone for joining today!',
    timestamp: '1h',
    unread: 0,
  },
  {
    id: '3',
    name: 'Mike Chen',
    lastMessage: 'The food truck rally was amazing!',
    timestamp: '3h',
    unread: 1,
  },
];

export default function MessagesScreen() {
  const ChatItem = ({ chat }: { chat: (typeof mockChats)[0] }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {chat.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.backgroundLight}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.composeButton}>
          <Text style={styles.composeText}>✏️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatsList}>
        {mockChats.map(chat => (
          <ChatItem key={chat.id} chat={chat} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.textDark,
  },
  composeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  composeText: {
    fontSize: typography.fontSize.lg,
  },
  chatsList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral100,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chatName: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  timestamp: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral500,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginRight: spacing.sm,
  },
  unreadBadge: {
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: 'white',
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
  },
});
