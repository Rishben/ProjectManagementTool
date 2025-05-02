import React, { useState } from 'react';
import { 
  CheckSquare, 
  MessageSquare, 
  Users, 
  PenTool
} from 'lucide-react';

const LeftNavbar = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('tasks');

  const navItems = [
    { id: 'tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { id: 'groupChat', icon: <MessageSquare size={20} />, label: 'Group Chat' },
    { id: 'directMessages', icon: <MessageSquare size={20} />, label: 'Direct Messages' },
    { id: 'drawing', icon: <PenTool size={20} />, label: 'Drawing Board' },
    { id: 'members', icon: <Users size={20} />, label: 'Team Members' }
  ];

  return (
    <div className="h-screen w-56 bg-gray-100 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold">Team Space</h1>
      </div>
      
      <div className="py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeSidebarItem === item.id 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveSidebarItem(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftNavbar;