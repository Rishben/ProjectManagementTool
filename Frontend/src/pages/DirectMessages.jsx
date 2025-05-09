import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCheck, Clock, Menu, Search, Send, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DirectMessages = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const {code}=useParams()
  
  // Fetch team members data
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/projects/${code}`, { withCredentials: true });
        
        // Check if teamMembers exists in response and is an array
        const members = response.data && response.data.teamMembers && Array.isArray(response.data.teamMembers) 
          ? response.data.teamMembers 
          : [];
          
        setTeamMembers(members);
        
        // Set the first team member as selected if any exist
        if (members.length > 0) {
          setSelectedMember(members[0]);
          // You would load messages for this member here
          // loadMessagesForMember(members[0]._id);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Ensure teamMembers is always an array, even on error
        setTeamMembers([]);
      }
    };
    
    fetchTeamMembers();
  }, []); // Empty dependency array means this runs once on mount
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Create a function to load messages for a specific member
  const loadMessagesForMember = async (memberId) => {
    try {
      // Replace this with your actual API call to get messages
      // const response = await axios.get(`http://localhost:3000/messages/${memberId}`, { withCredentials: true });
      // setMessages(response.data.messages);
      
      // For now, using empty array until backend is connected
      setMessages([]);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };
  
  const filteredMembers = teamMembers ? teamMembers.filter(member => 
    member && (
      (member.name && member.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  ) : [];
  
  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    loadMessagesForMember(member._id);
    if (isMobile) {
      setShowSidebar(false);
    }
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMember) return;
    
    // Create a new message object
    const newMessageObj = {
      id: Date.now(), // Using timestamp as temporary ID
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    
    // Update messages with animation
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    // Here you would send the message to your backend API
    // sendMessageToApi(selectedMember._id, newMessage);
    
    // Simulate status changes (sending → sent → delivered → read)
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => msg.id === newMessageObj.id ? {...msg, status: 'sent'} : msg)
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => msg.id === newMessageObj.id ? {...msg, status: 'delivered'} : msg)
        );
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => msg.id === newMessageObj.id ? {...msg, status: 'read'} : msg)
          );
        }, 1000);
      }, 1000);
    }, 1000);
  };
  
  const MessageStatus = ({ status }) => {
    if (status === 'sending') return <Clock className="h-4 w-4 text-gray-400" />;
    if (status === 'sent') return <Check className="h-4 w-4 text-gray-400" />;
    if (status === 'delivered') return <CheckCheck className="h-4 w-4 text-gray-400" />;
    if (status === 'read') return <CheckCheck className="h-4 w-4 text-blue-500" />;
    return null;
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-full overflow-hidden" 
    >
      <div className="flex w-full h-full bg-white rounded-lg shadow overflow-hidden">
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobile ? '100%' : '33.333%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${isMobile ? 'absolute z-10 left-0 top-0 bottom-0 bg-white' : 'relative'} border-r border-gray-200 flex flex-col`}
              style={{ maxWidth: isMobile ? '100%' : '33.333%' }}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">Direct Messages</h2>
                {isMobile && (
                  <button 
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>
              
              <div className="p-4">
                <motion.div 
                  className="relative"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </motion.div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {filteredMembers && filteredMembers.map((member) => (
                    <motion.div
                      key={member?._id || `member-${Math.random()}`} // Fallback key if _id is missing
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedMember?._id === member?._id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => handleMemberSelect(member)}
                      whileHover={{ backgroundColor: "#F9FAFB" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {member?.name ? member.name.charAt(0) : '?'}
                          </div>
                          {member?.isOnline && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                            ></motion.div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{member?.name || 'Unknown'}</h3>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{member?.email || 'No email'}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Right Panel - Chat */}
        <div className={`flex flex-col ${showSidebar && !isMobile ? 'w-2/3' : 'w-full'} h-full`}>
          {selectedMember ? (
            <>
              {/* Chat Header */}
              <motion.div 
                key={selectedMember._id + "-header"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 px-4 md:px-6 py-4 border-b border-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {isMobile && !showSidebar && (
                    <button 
                      onClick={toggleSidebar}
                      className="mr-3 p-1 rounded-full hover:bg-gray-100"
                    >
                      <Menu className="h-5 w-5 text-gray-500" />
                    </button>
                  )}
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {selectedMember.name.charAt(0)}
                      </div>
                      {selectedMember.isOnline && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"
                        ></motion.div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{selectedMember.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 truncate">{selectedMember.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      No messages yet. Send a message to start the conversation!
                    </p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        <motion.div
                          className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <p className="text-sm md:text-base">{message.text}</p>
                          <div className={`text-xs mt-1 flex items-center justify-end ${
                            message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                            {message.sender === 'me' && (
                              <span className="ml-1">
                                <MessageStatus status={message.status} />
                              </span>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
              
              {/* Message Input */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex-shrink-0 p-3 md:p-4 border-t border-gray-200"
              >
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l-md px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-r-md transition-colors"
                  >
                    <Send className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.button>
                </form>
              </motion.div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-center p-4">
                Select a team member to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default DirectMessages;