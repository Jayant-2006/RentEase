import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { chatAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Chat = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    fetchChats();

    // If redirected with userId, create or get chat
    if (location.state?.userId) {
      handleCreateChat(location.state.userId);
    }

    // Set up polling for new messages
    const interval = setInterval(() => {
      if (selectedChat) {
        fetchMessages(selectedChat._id);
      }
    }, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(interval);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChats = async () => {
    try {
      const { data } = await chatAPI.getChats();
      setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChat = async (userId) => {
    try {
      const { data } = await chatAPI.createOrGetChat(userId);
      setChats((prev) => {
        const exists = prev.find((chat) => chat._id === data._id);
        if (exists) return prev;
        return [data, ...prev];
      });
      setSelectedChat(data);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await chatAPI.getMessages(chatId);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Save via HTTP API
    try {
      await chatAPI.sendMessage(selectedChat._id, newMessage);
      setNewMessage('');
      
      // Refresh messages after sending
      fetchMessages(selectedChat._id);
      fetchChats(); // Update chat list to show latest message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = () => {
    setTyping(true);
    
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
    }, 3000);
  };

  const getOtherParticipant = (chat) => {
    return chat.participants.find((p) => p._id !== user._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className="max-w-7xl mx-auto w-full flex shadow-lg" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Chat List Sidebar */}
        <div className="w-1/3 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b bg-primary text-white">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>

          {chats.length > 0 ? (
            <div>
              {chats.map((chat) => {
                const otherUser = getOtherParticipant(chat);
                return (
                  <div
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                      selectedChat?._id === chat._id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {otherUser?.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{otherUser?.name}</h3>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.messages.length > 0
                            ? chat.messages[chat.messages.length - 1].message
                            : 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600">
              <p>No conversations yet</p>
              <p className="text-sm mt-2">Start chatting with matched roommates!</p>
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-gray-50 flex items-center">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {getOtherParticipant(selectedChat)?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {getOtherParticipant(selectedChat)?.name}
                  </h3>
                  {typing && (
                    <p className="text-sm text-gray-600 italic">typing...</p>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => {
                  const isOwnMessage = msg.senderId === user._id || msg.senderId._id === user._id;
                  return (
                    <div
                      key={index}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwnMessage
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwnMessage ? 'text-indigo-200' : 'text-gray-500'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
                    className="flex-1 input"
                    placeholder="Type a message..."
                  />
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <p className="text-xl mb-2">Select a conversation to start chatting</p>
                <p className="text-sm">or connect with new matches from the Match page</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;