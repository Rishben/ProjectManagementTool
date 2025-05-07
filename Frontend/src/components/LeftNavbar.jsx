import { motion } from 'framer-motion';
import {
  CheckSquare,
  Menu,
  MessageSquare,
  PenTool,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';

const LeftNavbar = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('tasks');
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { id: 'tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { id: 'groupChat', icon: <MessageSquare size={20} />, label: 'Group Chat' },
    { id: 'directMessages', icon: <MessageSquare size={20} />, label: 'Direct Messages' },
    { id: 'drawing', icon: <PenTool size={20} />, label: 'Drawing Board' },
    { id: 'members', icon: <Users size={20} />, label: 'Team Members' }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      width: "14rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: {
      width: "4rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const iconVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };
  
  return (
    <motion.div 
      className="h-screen bg-gray-100 border-r border-gray-200 flex flex-col shadow-sm"
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="open"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen && (
          <motion.h1
            className="text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Team Space
          </motion.h1>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>
      
      <div className="py-4 flex-grow overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <motion.button
                className={`flex items-center w-full px-4 py-3 text-left`}
                onClick={() => setActiveSidebarItem(item.id)}
                animate={{
                  backgroundColor: activeSidebarItem === item.id ? '#dbeafe' : 'transparent',
                  color: activeSidebarItem === item.id ? '#2563eb' : '#374151'
                }}
                whileHover={{ 
                  backgroundColor: activeSidebarItem === item.id ? '#dbeafe' : '#f3f4f6'
                }}
                whileTap={{ scale: 0.98 }}
                initial={false}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="mr-3"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.icon}
                </motion.div>
                {isOpen && (
                  <motion.span
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile view toggle button (visible only on small screens) */}
      <motion.button
        className="lg:hidden fixed bottom-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
    </motion.div>
  );
};

export default LeftNavbar;