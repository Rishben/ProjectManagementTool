// import { motion } from 'framer-motion';
// import { Send } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// const ChatPanel = ({ selectedUser }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   //Delete Later
//   const socket = useRef(null);
// useEffect(() => {
//   socket.current = io('http://localhost:3000');
//   return () => {
//     socket.current.disconnect();
//   };
// }, []);
  
//   const [roomID, setRoomID] = useState('');
// const joinRoom = () => {
//   if (!roomID.trim()) return;
//   socket.current.emit('join_room', roomID);
//   console.log('Joined room:', roomID);
// };

//   // Reset messages when selected user changes
//   useEffect(() => {
//     // In a real app, you'd fetch messages for the selected user here
//     setMessages([]);
//   }, [selectedUser]);


//   //deleteLater
//   useEffect(() => {
//     socket.current.on('receive_message', (data) => {
//       console.log('Received message:', data);
//       setMessages(prev => [...prev, data]);
//     });
//   }, []);

//   const handleSendMessage = () => {
//     if (!message.trim() || !selectedUser) return;

//     // Add message to chat
//     const newMessage = {
//     //   id: Date.now(),
//       text: message,
//       sender: 'me',
//       timestamp: new Date(),
//     };
    
//     setMessages([...messages, newMessage]);
//     setMessage('');
    
//     socket.current.emit('send_message', {
//       roomID: roomID,
//       message: message,
//     });

//     // Simulate reply (in a real app, you would handle this with websockets)
//     // setTimeout(() => {
//     //   const reply = {
//     //     id: Date.now() + 1,
//     //     text: `This is a simulated reply from ${selectedUser.name || 'User'}`,
//     //     sender: 'them',
//     //     timestamp: new Date(),
//     //   };
//     //   setMessages(prev => [...prev, reply]);
//     // }, 1000);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   if (!selectedUser) {
//     return (
//       <div className="flex flex-col h-full items-center justify-center bg-white p-8 text-center">
//         <div className="rounded-full bg-gray-100 p-8 mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//           </svg>
//         </div>
//         <h2 className="text-xl font-semibold text-gray-700 mb-2">Start a conversation</h2>
//         <p className="text-gray-500">Select a user from the list to begin messaging</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-[calc(100vh-80px)] bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 p-4 flex items-center">
//         <div className="relative mr-3">
//           <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600 font-medium text-lg">
//             {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : '?'}
//           </div>
//           {selectedUser.isOnline && (
//             <div className="absolute bottom-0 right-0">
//               <div className="h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
//             </div>
//           )}
//         </div>
//         <div>
//           <h2 className="font-medium text-gray-800">{selectedUser.name || 'User'}</h2>
//           <div className="text-xs text-gray-500 flex items-center">
//             <span className={`inline-block w-2 h-2 rounded-full mr-1 ${selectedUser.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//             {selectedUser.isOnline ? 'Online' : 'Offline'}
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         <div className="space-y-3">
//           {messages.length === 0 ? (
//             //delete later
//             <div>
//                 <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} placeholder='RoomID'/>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={joinRoom}>Join</button>
//             </div>
//             //till here

//             // <div className="text-center py-8">
//             //   <p className="text-gray-500 text-sm">No messages yet</p>
//             //   <p className="text-gray-400 text-xs mt-1">Send a message to start the conversation</p>
//             // </div>
//           ) : (
//             messages.map((msg) => (
//               <motion.div
//                 key={msg.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
//                   msg.sender === 'me' 
//                     ? 'bg-blue-500 text-white rounded-br-none' 
//                     : 'bg-gray-200 text-gray-800 rounded-bl-none'
//                 }`}>
//                   <p>{msg.text}</p>
//                   <div className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
//                     {formatTime(msg.timestamp)}
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Message Input */}
//       <div className="border-t border-gray-200 p-4">
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type a message..."
//             className="flex-1 border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 gap-3 hover:bg-blue-600 flex items-center justify-center text-white rounded-r-full px-3 py-[9px] transition-colors"
//             disabled={!message.trim()}
//           >

//              Send <Send/>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPanel;

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const ChatPanel = ({ selectedUser, currentUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  // Connect to socket when component mounts
  useEffect(() => {
    socket.current = io('http://localhost:3000');
    
    // Clean up on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

  // Generate and join room when a user is selected
  useEffect(() => {
    if (!selectedUser || !currentUser) return;
    
    // Create a consistent room ID based on user IDs
    // This ensures the same room is created regardless of who initiates
    const ids = [selectedUser._id, currentUser.id].sort();
    const roomID = `room_${ids[0]}_${ids[1]}`;
    
    // Join the room
    socket.current.emit('join_room', roomID);
    console.log(`Connected to room: ${roomID} with ${selectedUser.name}`);
    
    // Load previous messages for this room
    // In a real app, you'd fetch from a database
    setMessages([]); // Reset messages when changing rooms
  }, [selectedUser, currentUser]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket.current) return;
    
    socket.current.on('receive_message', (data) => {
      console.log('Received message:', data);
      // Only add the message if it's not from ourselves
      if (data.senderId !== currentUser?.id) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: data.text,
          sender: 'them',
          timestamp: new Date(),
        }]);
      }
    });
    
    // Cleanup listener when component unmounts
    return () => {
      socket.current.off('receive_message');
    };
  }, [currentUser]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser || !currentUser) return;

    // Create room ID the same way as in the useEffect
    console.log("selectedUser id is", selectedUser._id)
    const ids = [selectedUser._id, currentUser.id].sort();
    const roomID = `room_${ids[0]}_${ids[1]}`;

    // Add message to local state
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'me',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Send message to socket server
    socket.current.emit('send_message', {
      roomID: roomID,
      message: message,
      senderId: currentUser.id,
      receiverId: selectedUser._id
    });
    
    // Clear input field
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
      console.log("selectedUser", selectedUser)
  }, [selectedUser])

  if (!selectedUser) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-white p-8 text-center">
        <div className="rounded-full bg-gray-100 p-8 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Start a conversation</h2>
        <p className="text-gray-500">Select a user from the list to begin messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex items-center">
        <div className="relative mr-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600 font-medium text-lg">
            {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : '?'}
          </div>
          {selectedUser.isOnline && (
            <div className="absolute bottom-0 right-0">
              <div className="h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
          )}
        </div>
        <div>
          <h2 className="font-medium text-gray-800">{selectedUser.name || 'User'}</h2>
          <div className="text-xs text-gray-500 flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${selectedUser.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            {selectedUser.isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No messages yet</p>
              <p className="text-gray-400 text-xs mt-1">Send a message to start the conversation</p>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  msg.sender === 'me' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-r-full transition-colors ${
              message.trim() 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!message.trim()}
          >
            Send <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;