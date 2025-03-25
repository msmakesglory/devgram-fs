import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data
const conversations = [
  {
    id: 'chat1',
    user: {
      id: 'user2',
      name: 'Jason Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      status: 'online',
    },
    lastMessage: {
      text: 'Hey, are you still looking for a backend developer?',
      timestamp: '10:32 AM',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'chat2',
    user: {
      id: 'user3',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      status: 'offline',
    },
    lastMessage: {
      text: 'I just checked out your tutorial, it was super helpful!',
      timestamp: 'Yesterday',
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: 'chat3',
    user: {
      id: 'user4',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      status: 'online',
    },
    lastMessage: {
      text: "Let's discuss the project details tomorrow.",
      timestamp: '2 days ago',
      isRead: true,
    },
    unreadCount: 0,
  },
];

const activeChat = {
  id: 'chat1',
  user: {
    id: 'user2',
    name: 'Jason Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'online',
    lastActive: 'Active now',
  },
  messages: [
    {
      id: 'msg1',
      sender: 'user2',
      text: 'Hey there! I saw your post about looking for a Node.js developer. Is the position still open?',
      timestamp: '10:15 AM',
    },
    {
      id: 'msg2',
      sender: 'me',
      text: 'Hi Jason! Yes, absolutely. I\'m building an API for a mobile app and could use some help with the Node.js backend.',
      timestamp: '10:18 AM',
    },
    {
      id: 'msg3',
      sender: 'user2',
      text: 'Great! I have 3 years of experience with Node.js and MongoDB. Can you tell me more about the project?',
      timestamp: '10:20 AM',
    },
    {
      id: 'msg4',
      sender: 'me',
      text: 'It\'s a fitness tracking app that needs user authentication, data storage, and integration with a few third-party APIs for health metrics.',
      timestamp: '10:25 AM',
    },
    {
      id: 'msg5',
      sender: 'user2',
      text: 'Sounds interesting! I\'ve worked on similar projects before. Would you prefer to use REST or GraphQL for the API?',
      timestamp: '10:28 AM',
    },
    {
      id: 'msg6',
      sender: 'me',
      text: 'I was thinking REST to keep it simple, but I\'m open to GraphQL if you think it would be better for this use case.',
      timestamp: '10:30 AM',
    },
    {
      id: 'msg7',
      sender: 'user2',
      text: 'Hey, are you still looking for a backend developer?',
      timestamp: '10:32 AM',
    },
  ],
};

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(activeChat.id);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you'd normally send the message to the API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-24 px-4 sm:px-6 max-w-screen-xl mx-auto">
        <div className="glass-panel rounded-xl overflow-hidden shadow-lg h-[calc(100vh-200px)] min-h-[500px] flex">
          {/* Chat List */}
          <div className="w-full sm:w-80 border-r border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold mb-3">Messages</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="w-full h-10 px-4 pl-10 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" size={16} />
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-81px)] subtle-scroll">
              {conversations.map((convo) => (
                <div 
                  key={convo.id}
                  onClick={() => setSelectedChat(convo.id)}
                  className={cn(
                    "flex items-center p-4 hover:bg-secondary/40 cursor-pointer transition-colors",
                    {
                      'bg-secondary/60': selectedChat === convo.id,
                    }
                  )}
                >
                  <div className="relative">
                    <img 
                      src={convo.user.avatar}
                      alt={convo.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span 
                      className={cn(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-background",
                        {
                          'bg-green-500': convo.user.status === 'online',
                          'bg-gray-400': convo.user.status === 'offline',
                        }
                      )}
                    />
                  </div>
                  
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium truncate">{convo.user.name}</h3>
                      <span className="text-xs text-foreground/60">{convo.lastMessage.timestamp}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-foreground/70 truncate">{convo.lastMessage.text}</p>
                      
                      {convo.unreadCount > 0 && (
                        <span className="ml-2 flex-shrink-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Content */}
          <div className="hidden sm:flex flex-col flex-1">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10">
              <div className="flex items-center">
                <img 
                  src={activeChat.user.avatar}
                  alt={activeChat.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-semibold">{activeChat.user.name}</h3>
                  <p className="text-xs text-foreground/60">{activeChat.user.lastActive}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full hover:bg-secondary/60 transition-colors">
                  <Phone size={18} className="text-foreground/70" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary/60 transition-colors">
                  <Video size={18} className="text-foreground/70" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary/60 transition-colors">
                  <Info size={18} className="text-foreground/70" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 subtle-scroll">
              {activeChat.messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "max-w-[75%]",
                    {
                      'ml-auto': msg.sender === 'me',
                    }
                  )}
                >
                  <div 
                    className={cn(
                      "rounded-2xl p-3 pb-2",
                      {
                        'bg-blue-500 text-white': msg.sender === 'me',
                        'bg-secondary/60': msg.sender !== 'me',
                      }
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p 
                    className={cn(
                      "text-xs mt-1",
                      {
                        'text-right text-foreground/60': msg.sender === 'me',
                        'text-foreground/60': msg.sender !== 'me',
                      }
                    )}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button 
                  type="button"
                  className="p-2 rounded-full hover:bg-secondary/60 transition-colors"
                >
                  <Paperclip size={20} className="text-foreground/70" />
                </button>
                
                <input 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 h-12 px-4 rounded-full border border-border bg-background/50 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 outline-none"
                />
                
                <button 
                  type="submit"
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    {
                      'bg-blue-500 text-white': message.trim(),
                      'bg-secondary/60 text-foreground/70': !message.trim(),
                    }
                  )}
                  disabled={!message.trim()}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
          
          {/* Empty State for Mobile */}
          <div className="flex flex-1 items-center justify-center bg-secondary/30 sm:hidden">
            <div className="text-center p-4">
              <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={24} className="text-foreground/70" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Messages</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
