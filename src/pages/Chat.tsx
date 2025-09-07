import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Search,
  Users,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile
} from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");

  const chatList = [
    {
      id: "1",
      type: "group",
      name: "Jazz Night Crew",
      lastMessage: "See you all tonight at 8pm!",
      lastMessageTime: "2 min ago",
      unread: 3,
      avatar: "/placeholder.svg",
      participants: 8
    },
    {
      id: "2", 
      type: "direct",
      name: "Sarah Johnson",
      lastMessage: "Thanks for the event recommendation",
      lastMessageTime: "1 hour ago",
      unread: 0,
      avatar: "/placeholder.svg",
      online: true
    },
    {
      id: "3",
      type: "group", 
      name: "Foodie Adventures",
      lastMessage: "Found this amazing new restaurant!",
      lastMessageTime: "3 hours ago",
      unread: 1,
      avatar: "/placeholder.svg",
      participants: 12
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "Mike Roberts",
      senderAvatar: "/placeholder.svg",
      message: "Hey everyone! Just confirmed my spot for tonight 🎷",
      timestamp: "2:30 PM",
      isOwn: false
    },
    {
      id: "2",
      sender: "You",
      message: "Awesome! Can't wait to see the lineup",
      timestamp: "2:32 PM", 
      isOwn: true
    },
    {
      id: "3",
      sender: "Sarah Johnson",
      senderAvatar: "/placeholder.svg",
      message: "I'll be there around 7:30. Anyone want to grab dinner first?",
      timestamp: "2:35 PM",
      isOwn: false
    },
    {
      id: "4",
      sender: "You",
      message: "I'm down for dinner! Know any good spots nearby?",
      timestamp: "2:36 PM",
      isOwn: true
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic
      setNewMessage("");
    }
  };

  const selectedChatData = chatList.find(chat => chat.id === selectedChat);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
            {/* Chat List Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Messages
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-1 p-3">
                      {chatList.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => setSelectedChat(chat.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedChat === chat.id 
                              ? 'bg-primary/10 border border-primary/20' 
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={chat.avatar} />
                              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {chat.type === 'direct' && chat.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium truncate">{chat.name}</span>
                                {chat.type === 'group' && (
                                  <Users className="h-3 w-3 text-muted-foreground" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                              {chat.unread > 0 && (
                                <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              {selectedChatData ? (
                <Card className="h-full flex flex-col">
                  {/* Chat Header */}
                  <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedChatData.avatar} />
                        <AvatarFallback>{selectedChatData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedChatData.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChatData.type === 'group' 
                            ? `${selectedChatData.participants} participants`
                            : 'Active now'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-[400px] p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            {!message.isOwn && (
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={message.senderAvatar} />
                                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`max-w-[70%] ${message.isOwn ? 'order-first' : ''}`}>
                              {!message.isOwn && (
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  {message.sender}
                                </p>
                              )}
                              <div
                                className={`rounded-2xl px-4 py-2 ${
                                  message.isOwn
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                }`}
                              >
                                <p className="text-sm">{message.message}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 text-right">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="pr-10"
                        />
                        <Button size="icon" variant="ghost" className="absolute right-1 top-1">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button onClick={sendMessage} variant="vibrant" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a chat to start messaging
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;