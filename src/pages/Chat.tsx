import { useState, useRef, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MoreVertical, Paperclip, Smile, Send, Mic, Camera,
  Phone, Video, ArrowLeft, Check, CheckCheck, Clock, Image,
  File, MapPin, User, Settings, Archive, Star, Trash2, MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'location';
  mediaUrl?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  isTyping?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
}

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/v2/avataaars/sarah.svg',
      lastMessage: "See you at the event tomorrow! 🎉",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
      isPinned: true
    },
    {
      id: '2',
      name: 'Event Planning Crew',
      avatar: 'https://api.dicebear.com/v2/avataaars/group.svg',
      lastMessage: "Mike: The venue is confirmed",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 5,
      isOnline: true
    },
    {
      id: '3',
      name: 'James Ochieng',
      avatar: 'https://api.dicebear.com/v2/avataaars/james.svg',
      lastMessage: "Thanks for the tickets!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '4',
      name: 'Lisa Kamau',
      avatar: 'https://api.dicebear.com/v2/avataaars/lisa.svg',
      lastMessage: "Photo from yesterday's concert",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
      isOnline: true,
      isTyping: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'other',
      content: "Hey! Are you coming to the Afrobeat Festival tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      senderId: 'me',
      content: "Yes! I already got my tickets. Can't wait! 🎵",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      senderId: 'other',
      content: "Awesome! Want to meet up before?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      senderId: 'me',
      content: "Sure! Let's meet at the main entrance at 6 PM",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'delivered',
      type: 'text'
    },
    {
      id: '5',
      senderId: 'other',
      content: "Perfect! See you there",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'read',
      type: 'text'
    },
    {
      id: '6',
      senderId: 'other',
      content: "See you at the event tomorrow! 🎉",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'read',
      type: 'text'
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: message,
      timestamp: new Date(),
      status: 'sending',
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, status: 'sent' } : m
      ));
    }, 500);

    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, status: 'delivered' } : m
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMessage.id ? { ...m, status: 'read' } : m
      ));
    }, 2000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3" />;
      case 'sent':
        return <Check className="w-3 h-3" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout noFooter noPadding fullWidth>
      <div className="flex h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
        {/* Sidebar - Conversations List */}
        <div className={cn(
          "w-full md:w-96 bg-white dark:bg-gray-950 border-r flex flex-col",
          selectedConversation && "hidden md:flex"
        )}>
          {/* Search Header */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search or start new chat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-100 dark:bg-gray-800 border-0"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors",
                  selectedConversation?.id === conv.id && "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conv.avatar} alt={conv.name} />
                    <AvatarFallback>{conv.name[0]}</AvatarFallback>
                  </Avatar>
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-950" />
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{conv.name}</p>
                      {conv.isPinned && <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />}
                      {conv.isMuted && <span className="text-xs">🔇</span>}
                    </div>
                    <span className="text-xs text-gray-500">
                      {format(conv.timestamp, 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conv.isTyping ? (
                        <span className="text-green-500">typing...</span>
                      ) : (
                        conv.lastMessage
                      )}
                    </p>
                    {conv.unreadCount > 0 && (
                      <Badge className="ml-2 bg-green-500 text-white">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-950 border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden mr-2"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-semibold">{selectedConversation.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.isTyping ? (
                        <span className="text-green-500">typing...</span>
                      ) : selectedConversation.isOnline ? (
                        'Online'
                      ) : (
                        'Last seen ' + format(selectedConversation.timestamp, 'HH:mm')
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="w-4 h-4 mr-2" />
                        Pin Chat
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive Chat
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.senderId === 'me' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[70%] px-4 py-2 rounded-lg",
                      msg.senderId === 'me' 
                        ? "bg-green-500 text-white rounded-br-none" 
                        : "bg-white dark:bg-gray-800 rounded-bl-none"
                    )}>
                      <p className="text-sm">{msg.content}</p>
                      <div className={cn(
                        "flex items-center justify-end gap-1 mt-1",
                        msg.senderId === 'me' ? "text-green-100" : "text-gray-500"
                      )}>
                        <span className="text-xs">
                          {format(msg.timestamp, 'HH:mm')}
                        </span>
                        {msg.senderId === 'me' && getMessageStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-950 border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <Smile className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleFileUpload}>
                  <Paperclip className="w-5 h-5" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => console.log('File selected:', e.target.files)}
                />
                <Input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                {message ? (
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onMouseDown={() => setIsRecording(true)}
                    onMouseUp={() => setIsRecording(false)}
                    className={isRecording ? "bg-red-500 text-white" : ""}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-4 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <MessageSquare className="w-24 h-24 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Welcome to Sypot Chat</h2>
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Chat;