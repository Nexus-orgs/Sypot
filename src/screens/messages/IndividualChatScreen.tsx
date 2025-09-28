import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { Message } from '../../types/navigation';
import { mockMessages } from '../../services/mockData';

interface RouteParams {
  chatId: string;
  userName: string;
}

interface ChatMessage extends Message {
  isOwn: boolean;
}

export default function IndividualChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId, userName } = route.params as RouteParams;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMessages();
    navigation.setOptions({ title: userName });
  }, [chatId, userName]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create sample conversation with the user
      const chatMessages: ChatMessage[] = [
        {
          id: 'msg1',
          text: 'Hey! Are you going to the music festival this weekend?',
          userId: 'user1',
          userName: userName,
          timestamp: new Date('2024-07-25T14:30:00'),
          avatar: '👩‍💼',
          isOwn: false,
        },
        {
          id: 'msg2',
          text: "Yes! I already got my tickets. Can't wait! 🎵",
          userId: 'currentUser',
          userName: 'You',
          timestamp: new Date('2024-07-25T14:32:00'),
          isOwn: true,
        },
        {
          id: 'msg3',
          text: 'The lineup looks amazing this year. Should we meet up there?',
          userId: 'user1',
          userName: userName,
          timestamp: new Date('2024-07-25T14:35:00'),
          avatar: '👩‍💼',
          isOwn: false,
        },
        {
          id: 'msg4',
          text: "Definitely! Let's coordinate closer to the event. I'm really excited about the headliner!",
          userId: 'currentUser',
          userName: 'You',
          timestamp: new Date('2024-07-25T14:37:00'),
          isOwn: true,
        },
        {
          id: 'msg5',
          text: "Same here! I've been following them for years. This will be my first time seeing them live.",
          userId: 'user1',
          userName: userName,
          timestamp: new Date('2024-07-25T14:40:00'),
          avatar: '👩‍💼',
          isOwn: false,
        },
      ];

      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) {
      return;
    }

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: inputText.trim(),
      userId: 'currentUser',
      userName: 'You',
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Auto-scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate response (optional)
    setTimeout(() => {
      const responses = [
        'That sounds great!',
        'Absolutely! 🎉',
        "I'm looking forward to it!",
        "Can't wait!",
        'Sounds like a plan!',
      ];

      const responseMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        text: responses[Math.floor(Math.random() * responses.length)],
        userId: 'user1',
        userName: userName,
        timestamp: new Date(),
        avatar: '👩‍💼',
        isOwn: false,
      };

      setMessages(prev => [...prev, responseMessage]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.isOwn
            ? styles.ownMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        {!item.isOwn && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.avatar || item.userName.charAt(0)}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.messageBubble,
            item.isOwn ? styles.ownMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.isOwn ? styles.ownMessageText : styles.otherMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              item.isOwn ? styles.ownMessageTime : styles.otherMessageTime,
            ]}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  const handleMoreOptions = () => {
    Alert.alert('Chat Options', 'What would you like to do?', [
      { text: 'View Profile', onPress: () => console.log('View profile') },
      { text: 'Mute Notifications', onPress: () => console.log('Mute') },
      {
        text: 'Block User',
        style: 'destructive',
        onPress: () => console.log('Block'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

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

        <View style={styles.headerInfo}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.headerName}>{userName}</Text>
            <Text style={styles.headerStatus}>Active now</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.moreButton} onPress={handleMoreOptions}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading messages...</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
          />
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor={colors.neutral500}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
            />

            <TouchableOpacity
              style={styles.attachButton}
              onPress={() =>
                Alert.alert('Attach', 'File attachment coming soon!')
              }
            >
              <Text style={styles.attachButtonText}>📎</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim()
                ? styles.sendButtonActive
                : styles.sendButtonInactive,
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  backButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerAvatarText: {
    color: 'white',
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
  headerName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textDark,
  },
  headerStatus: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    marginTop: 2,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: typography.fontSize.xl,
    color: colors.textDark,
  },
  chatContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    color: colors.neutral600,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  ownMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: 'white',
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  ownMessageBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: borderRadius.sm,
  },
  otherMessageBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: borderRadius.sm,
  },
  messageText: {
    fontSize: typography.fontSize.base,
    lineHeight: 20,
  },
  ownMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: colors.textDark,
  },
  messageTime: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: colors.neutral500,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    maxHeight: 100,
    minHeight: 40,
    textAlignVertical: 'center',
  },
  attachButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  attachButtonText: {
    fontSize: typography.fontSize.base,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: colors.neutral300,
  },
  sendButtonText: {
    fontSize: typography.fontSize.lg,
    color: 'white',
  },
});
