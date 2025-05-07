import {
  BellIcon,
  Cross1Icon,
  ExitIcon,
  HamburgerMenuIcon,
  PersonIcon
} from "@radix-ui/react-icons";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Header = ({ handleLogout}) => {
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  // Sample notifications data
  const notifications = [
    { id: 1, message: "New task assigned to you", time: "5 min ago", read: false },
    { id: 2, message: "Project deadline updated", time: "1 hour ago", read: false },
    { id: 3, message: "Team meeting scheduled for tomorrow", time: "3 hours ago", read: true }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Close dropdown menus when clicking elsewhere
  const handleClickOutside = (setter) => {
    setter(false);
  };
  
  // Toggle dropdown menus
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setNotificationsOpen(!notificationsOpen);
    setProfileMenuOpen(false);
  };
  
  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setProfileMenuOpen(!profileMenuOpen);
    setNotificationsOpen(false);
  };
  
  const fetchTeamLeaderName = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/teamLeader/getTeamLeader`, { withCredentials: true });
      setTeamLeaderName(response.data.teamLeadName);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      fetchTeamLeaderName();
  }, []);
  
  
  return (
    <header className="bg-white w-full shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Header */}
        <div className="flex items-center justify-between">
          {/* Logo and Product Name */}
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
            
            {/* Product Name and Tagline */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-xs sm:text-sm text-gray-600">Project Management</p>
            </div>
          </div>
          
          {/* Mobile Menu Button - Only shown on small screens */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? 
                <Cross1Icon className="h-6 w-6" /> : 
                <HamburgerMenuIcon className="h-6 w-6" />
              }
            </button>
          </div>
          
          {/* Center Section - Dashboard Title - Hidden on mobile */}
          <div className="hidden md:block text-center">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">Team Leader Dashboard</h2>
          </div>
          
          {/* Right Side - Actions - Hidden on mobile, shown in dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNotifications}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full relative"
              >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
              
              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                      <button className="text-xs text-indigo-600 hover:text-indigo-800">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No notifications
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-indigo-50' : ''}`}
                        >
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                            {!notification.read && (
                              <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-xs text-center w-full text-indigo-600 hover:text-indigo-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <PersonIcon className="h-5 w-5" />
                </div>
                <span className="hidden lg:inline-block text-sm font-medium">{teamLeaderName}</span>
              </motion.button>
              
              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >                  
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <PersonIcon className="h-4 w-4" />
                    <span>Your Profile</span>
                  </a>                  
                  <div className="border-t border-gray-200 mt-1">
                    <motion.button
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <ExitIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu - Only visible when toggled */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 pt-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              {/* User Profile Section */}
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <PersonIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              
              {/* Notifications Section */}
              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h3>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {notifications.slice(0, 2).map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-2 rounded-md text-sm ${!notification.read ? 'bg-indigo-50' : 'bg-gray-50'}`}
                    >
                      <p className="font-medium text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                  
                  {notifications.length > 2 && (
                    <a href="#all-notifications" className="text-xs text-indigo-600 block text-center">
                      View all notifications
                    </a>
                  )}
                </div>
              </div>
              
              {/* Actions Section */}
              <div className="space-y-2 border-t border-gray-200 pt-3">
                <a href="#profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                  <PersonIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Your Profile</span>
                </a>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors mt-2"
                >
                  <span>Logout</span>
                  <ExitIcon className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;