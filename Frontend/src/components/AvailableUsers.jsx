import { motion } from 'framer-motion';
import { useState } from 'react';

const AvailableUsers = ({ users, setSelectedUser }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUserClick = (user) => {
    setSelectedUserId(user._id);
    setSelectedUser(user); // Pass the entire user object instead of just the ID
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Direct Messages</h1>
      </div>
      
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full py-2 pl-9 pr-4 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-1">
        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
          <motion.div
            key={user._id}
            onClick={() => handleUserClick(user)}
            initial={{ opacity: 0.8 }}
            whileHover={{ 
              backgroundColor: "rgba(243, 244, 246, 1)",
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-3 rounded-md cursor-pointer mb-1
              ${selectedUserId === user._id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <div className="relative">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600 font-medium text-lg">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              {user.isOnline && (
                <div className="absolute bottom-0 right-0">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="h-3 w-3 bg-green-500 rounded-full border-2 border-white"
                  />
                </div>
              )}
            </div>
            <div className="ml-3 overflow-hidden">
              <div className="font-medium text-sm text-gray-800">{user.name || 'Unknown User'}</div>
              <div className="text-xs text-gray-500 truncate">{user.email || ''}</div>
            </div>
          </motion.div>
        )) : (
          <div className="text-center p-4 text-gray-500 text-sm">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableUsers;