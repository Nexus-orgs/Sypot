import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const ChatScreen = ({ navigation, route }) => {
  const conversation = route?.params?.conversation || {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    online: true,
  };

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hey! Are you coming to the festival tomorrow?",
      sender: 'other',
      time: '10:30 AM',
      avatar: conversation.avatar,
    },
    {
      id: '2',
      text: "Yes! I'm so excited! 🎉",
      sender: 'me',
      time: '10:32 AM',
    },
    {
      id: '3',
      text: "Great! Want to meet at the main entrance around 6?",
      sender: 'other',
      time: '10:33 AM',
      avatar: conversation.avatar,
    },
    {
      id: '4',
      text: "Perfect! See you there",
      sender: 'me',
      time: '10:35 AM',
    },
    {
      id: '5',
      text: "I'll bring the tickets",
      sender: 'me',
      time: '10:35 AM',
    },
    {
      id: '6',
      text: "Awesome! Thanks 👍",
      sender: 'other',
      time: '10:36 AM',
      avatar: conversation.avatar,
    },
    {
      id: '7',
      text: "Do you want me to pick you up?",
      sender: 'other',
      time: '10:37 AM',
      avatar: conversation.avatar,
    },
    {
      id: '8',
      text: "That would be great! I'll send you my address",
      sender: 'me',
      time: '10:38 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const BackIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.primary} viewBox="0 0 256 256">
      <Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
    </Svg>
  );

  const SendIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.primary} viewBox="0 0 256 256">
      <Path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,215.85,81.17,136H136a8,8,0,0,0,0-16H81.17L56,40.15l152,87.85Z" />
    </Svg>
  );

  const AttachIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.gray[500]} viewBox="0 0 256 256">
      <Path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z" />
    </Svg>
  );

  const MoreIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.textLight} viewBox="0 0 256 256">
      <Path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z" />
    </Svg>
  );

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate received message
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          text: "That sounds good! See you then 😊",
          sender: 'other',
          time: new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          avatar: conversation.avatar,
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const renderMessage = ({ item, index }) => {
    const isMe = item.sender === 'me';
    const showAvatar = !isMe && (index === 0 || messages[index - 1]?.sender !== 'other');
    
    return (
      <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
        {!isMe && showAvatar && (
          <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
        )}
        {!isMe && !showAvatar && <View style={styles.avatarPlaceholder} />}
        
        <View style={[styles.messageBubble, isMe ? styles.messageBubbleMe : styles.messageBubbleOther]}>
          <Text style={[styles.messageText, isMe && styles.messageTextMe]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTime, isMe && styles.messageTimeMe]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    // Scroll to bottom when new message is added
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerContent}>
          <Image source={{ uri: conversation.avatar }} style={styles.headerAvatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{conversation.name}</Text>
            <Text style={styles.headerStatus}>
              {conversation.online ? 'Online' : 'Offline'}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreIcon />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.chatContainer}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <Image source={{ uri: conversation.avatar }} style={styles.typingAvatar} />
            <View style={styles.typingBubble}>
              <Text style={styles.typingText}>typing...</Text>
            </View>
          </View>
        )}

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <AttachIcon />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.gray[400]}
            multiline
            maxHeight={100}
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.textLight,
  },
  headerStatus: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.success,
  },
  moreButton: {
    padding: theme.spacing.xs,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
    alignItems: 'flex-end',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: theme.spacing.sm,
  },
  avatarPlaceholder: {
    width: 32,
    marginRight: theme.spacing.sm,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  messageBubbleMe: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 4,
    ...theme.shadows.sm,
  },
  messageText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
    marginBottom: 4,
  },
  messageTextMe: {
    color: theme.colors.white,
  },
  messageTime: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.gray[500],
  },
  messageTimeMe: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  typingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: theme.spacing.sm,
  },
  typingBubble: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  typingText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  attachButton: {
    padding: theme.spacing.sm,
    marginBottom: 2,
  },
  textInput: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
    maxHeight: 100,
  },
  sendButton: {
    padding: theme.spacing.sm,
    marginBottom: 2,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatScreen;