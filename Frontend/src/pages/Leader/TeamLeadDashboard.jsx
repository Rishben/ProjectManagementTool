// import { motion } from 'framer-motion';
// import {
//     CheckCircle,
//     ChevronLeft,
//     ChevronRight,
//     Clock,
//     List,
//     MessageSquare,
//     PenTool,
//     Plus,
//     User,
//     Users,
//     X
// } from 'lucide-react';
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const TeamLeadDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { team } = location.state || { 
//     team: { 
//       id: 1, 
//       name: 'Web Development', 
//       members: 4, 
//       code: 'WEB-DEV-2025', 
//       tasks: { todo: 5, inProgress: 3, completed: 7 } 
//     } 
//   };
  
//   const [activeSidebarItem, setActiveSidebarItem] = useState('tasks');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false);
//   const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo', assignedTo: '' });
  
//   const [tasks, setTasks] = useState([
//     { id: 1, title: 'Design Homepage', description: 'Create wireframes for the homepage', status: 'todo', assignedTo: 'Jane Smith' },
//     { id: 2, title: 'Setup API Routes', description: 'Implement backend API routes', status: 'todo', assignedTo: 'John Doe' },
//     { id: 3, title: 'User Authentication', description: 'Implement user login and registration', status: 'inProgress', assignedTo: 'Bob Johnson' },
//     { id: 4, title: 'Database Schema', description: 'Design the database schema', status: 'completed', assignedTo: 'Alice Brown' },
//     { id: 5, title: 'Frontend Components', description: 'Build reusable UI components', status: 'inProgress', assignedTo: 'John Doe' },
//   ]);
  
//   const [teamMembers, setTeamMembers] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'active' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'active' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'QA Engineer', status: 'active' },
//     { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Frontend Developer', status: 'active' },
//   ]);
  
//   const [chatMessages, setChatMessages] = useState([
//     { id: 1, sender: 'John Doe', message: 'Hey team, how are we progressing with the tasks?', time: '10:30 AM' },
//     { id: 2, sender: 'Jane Smith', message: 'I\'m almost done with the wireframes', time: '10:32 AM' },
//     { id: 3, sender: 'You', message: 'Great progress everyone! Let\'s meet at 2 PM to discuss.', time: '10:35 AM' },
//   ]);
  
//   const [newMessage, setNewMessage] = useState('');
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [directMessages, setDirectMessages] = useState({});
  
//   const handleAddTask = () => {
//     if (newTask.title.trim()) {
//       const task = {
//         id: tasks.length + 1,
//         ...newTask
//       };
//       setTasks([...tasks, task]);
//       setNewTask({ title: '', description: '', status: 'todo', assignedTo: '' });
//       setShowAddTaskModal(false);
//     }
//   };
  
//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       if (selectedMember) {
//         // Handle direct message
//         const memberDMs = directMessages[selectedMember.id] || [];
//         setDirectMessages({
//           ...directMessages,
//           [selectedMember.id]: [
//             ...memberDMs,
//             { id: memberDMs.length + 1, sender: 'You', message: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
//           ]
//         });
//       } else {
//         // Handle group message
//         setChatMessages([
//           ...chatMessages,
//           { id: chatMessages.length + 1, sender: 'You', message: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
//         ]);
//       }
//       setNewMessage('');
//     }
//   };
  
//   const renderSidebarContent = () => {
//     switch (activeSidebarItem) {
//       case 'tasks':
//         return (
//           <div className="p-4">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold">Tasks</h2>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//                 onClick={() => setShowAddTaskModal(true)}
//               >
//                 <Plus size={16} className="mr-1" />
//                 Add Task
//               </motion.button>
//             </div>
            
//             <div className="grid grid-cols-1 gap-6">
//               <div className="bg-red-50 p-4 rounded-lg border border-red-100">
//                 <h3 className="font-semibold flex items-center text-red-700 mb-3">
//                   <Clock size={18} className="mr-2" />
//                   To Do ({tasks.filter(t => t.status === 'todo').length})
//                 </h3>
//                 <div className="space-y-3">
//                   {tasks.filter(t => t.status === 'todo').map((task) => (
//                     <motion.div 
//                       key={task.id} 
//                       className="bg-white p-3 rounded shadow-sm"
//                       whileHover={{ scale: 1.03 }}
//                     >
//                       <p className="font-medium">{task.title}</p>
//                       <p className="text-sm text-gray-500">{task.description}</p>
//                       <div className="flex justify-between mt-2 text-xs text-gray-500">
//                         <span>Assigned to: {task.assignedTo}</span>
//                       </div>
//                     </motion.div>
//                   ))}
//                   {tasks.filter(t => t.status === 'todo').length === 0 && (
//                     <p className="text-sm text-gray-500">No tasks to do</p>
//                   )}
//                 </div>
//               </div>
              
//               <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
//                 <h3 className="font-semibold flex items-center text-yellow-700 mb-3">
//                   <Clock size={18} className="mr-2" />
//                   In Progress ({tasks.filter(t => t.status === 'inProgress').length})
//                 </h3>
//                 <div className="space-y-3">
//                   {tasks.filter(t => t.status === 'inProgress').map((task) => (
//                     <motion.div 
//                       key={task.id} 
//                       className="bg-white p-3 rounded shadow-sm"
//                       whileHover={{ scale: 1.03 }}
//                     >
//                       <p className="font-medium">{task.title}</p>
//                       <p className="text-sm text-gray-500">{task.description}</p>
//                       <div className="flex justify-between mt-2 text-xs text-gray-500">
//                         <span>Assigned to: {task.assignedTo}</span>
//                       </div>
//                     </motion.div>
//                   ))}
//                   {tasks.filter(t => t.status === 'inProgress').length === 0 && (
//                     <p className="text-sm text-gray-500">No tasks in progress</p>
//                   )}
//                 </div>
//               </div>
              
//               <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                 <h3 className="font-semibold flex items-center text-green-700 mb-3">
//                   <CheckCircle size={18} className="mr-2" />
//                   Completed ({tasks.filter(t => t.status === 'completed').length})
//                 </h3>
//                 <div className="space-y-3">
//                   {tasks.filter(t => t.status === 'completed').map((task) => (
//                     <motion.div 
//                       key={task.id} 
//                       className="bg-white p-3 rounded shadow-sm"
//                       whileHover={{ scale: 1.03 }}
//                     >
//                       <p className="font-medium">{task.title}</p>
//                       <p className="text-sm text-gray-500">{task.description}</p>
//                       <div className="flex justify-between mt-2 text-xs text-gray-500">
//                         <span>Assigned to: {task.assignedTo}</span>
//                       </div>
//                     </motion.div>
//                   ))}
//                   {tasks.filter(t => t.status === 'completed').length === 0 && (
//                     <p className="text-sm text-gray-500">No completed tasks</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
      
//       case 'groupChat':
//         return (
//           <div className="flex flex-col h-full">
//             <div className="p-4 border-b">
//               <h2 className="text-xl font-semibold">Group Chat</h2>
//               <p className="text-sm text-gray-500">{team.members} members</p>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {chatMessages.map((msg) => (
//                 <div 
//                   key={msg.id} 
//                   className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
//                     msg.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'
//                   }`}>
//                     {msg.sender !== 'You' && (
//                       <p className="font-medium text-sm text-blue-600">{msg.sender}</p>
//                     )}
//                     <p className="text-gray-800">{msg.message}</p>
//                     <p className="text-xs text-gray-500 text-right mt-1">{msg.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="p-4 border-t">
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   className="flex-1 border border-gray-300 rounded-md p-2"
//                   placeholder="Type your message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                   onClick={handleSendMessage}
//                 >
//                   Send
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         );
      
//       case 'directMessages':
//         return (
//           <div className="flex h-full">
//             <div className="w-1/3 border-r">
//               <div className="p-4 border-b">
//                 <h2 className="text-xl font-semibold">Team Members</h2>
//               </div>
//               <div className="overflow-y-auto">
//                 {teamMembers.map((member) => (
//                   <div 
//                     key={member.id}
//                     className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
//                       selectedMember?.id === member.id ? 'bg-blue-50' : ''
//                     }`}
//                     onClick={() => setSelectedMember(member)}
//                   >
//                     <p className="font-medium">{member.name}</p>
//                     <p className="text-xs text-gray-500">{member.role}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex-1 flex flex-col">
//               {selectedMember ? (
//                 <>
//                   <div className="p-4 border-b">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h2 className="text-lg font-semibold">{selectedMember.name}</h2>
//                         <p className="text-xs text-gray-500">{selectedMember.role}</p>
//                       </div>
//                       <button 
//                         className="text-gray-400 hover:text-gray-600"
//                         onClick={() => setSelectedMember(null)}
//                       >
//                         <X size={20} />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {(directMessages[selectedMember.id] || []).map((msg) => (
//                       <div 
//                         key={msg.id} 
//                         className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
//                       >
//                         <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
//                           msg.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'
//                         }`}>
//                           <p className="text-gray-800">{msg.message}</p>
//                           <p className="text-xs text-gray-500 text-right mt-1">{msg.time}</p>
//                         </div>
//                       </div>
//                     ))}
//                     {(!directMessages[selectedMember.id] || directMessages[selectedMember.id].length === 0) && (
//                       <div className="text-center text-gray-500 py-8">
//                         <p>No messages yet</p>
//                         <p className="text-sm">Start a conversation with {selectedMember.name}</p>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="p-4 border-t">
//                     <div className="flex space-x-2">
//                       <input
//                         type="text"
//                         className="flex-1 border border-gray-300 rounded-md p-2"
//                         placeholder={`Message ${selectedMember.name}...`}
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                       />
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                         onClick={handleSendMessage}
//                       >
//                         Send
//                       </motion.button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex-1 flex items-center justify-center text-gray-500">
//                   <div className="text-center">
//                     <Users size={48} className="mx-auto mb-4 opacity-30" />
//                     <p>Select a team member to start chatting</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
      
//       case 'drawing':
//         return (
//           <div className="p-4">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold">Drawing Board</h2>
//               <div className="flex space-x-2">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm"
//                 >
//                   Clear
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//                 >
//                   Save
//                 </motion.button>
//               </div>
//             </div>
            
//             <div className="bg-white border border-gray-300 rounded-lg p-2 mb-4">
//               <div className="flex space-x-2 mb-2">
//                 {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'].map((color) => (
//                   <div 
//                     key={color}
//                     className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
//                     style={{ backgroundColor: color }}
//                   />
//                 ))}
//               </div>
//               <div className="flex space-x-2">
//                 {[1, 2, 3, 5, 8].map((size) => (
//                   <div 
//                     key={size}
//                     className="w-8 h-8 rounded flex items-center justify-center bg-gray-100 cursor-pointer"
//                   >
//                     <div 
//                       className="rounded-full bg-black" 
//                       style={{ 
//                         width: size * 2, 
//                         height: size * 2 
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="bg-white border border-gray-300 rounded-lg h-96 flex items-center justify-center">
//               <p className="text-gray-400">Drawing canvas would be implemented here</p>
//             </div>
//           </div>
//         );
        
//       case 'members':
//         return (
//           <div className="p-4">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold">Team Members</h2>
//               <p className="text-sm text-gray-500">Team Code: <span className="font-mono">{team.code}</span></p>
//             </div>
            
//             <div className="space-y-4">
//               {teamMembers.map((member) => (
//                 <div key={member.id} className="bg-white p-4 rounded-lg shadow-sm">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium text-lg">{member.name}</p>
//                       <p className="text-gray-500">{member.email}</p>
//                     </div>
//                     <div className="flex items-center">
//                       <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                         member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
//                       }`}></span>
//                       <span className="text-sm text-gray-600">{member.role}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
      
//       default:
//         return <div>Select an option from the sidebar</div>;
//     }
//   };
  
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-white shadow-md transition-all ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
//         <div className="p-4 flex justify-between items-center border-b">
//           <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
//             <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
//           </div>
//           <button 
//             className="text-gray-500 hover:text-gray-800"
//             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//           >
//             {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//           </button>
//         </div>
        
//         <div className="py-4">
//           <div 
//             className={`flex items-center px-4 py-3 cursor-pointer ${activeSidebarItem === 'tasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//             onClick={() => setActiveSidebarItem('tasks')}
//           >
//             <List size={20} />
//             {!sidebarCollapsed && <span className="ml-3">Tasks</span>}
//           </div>
          
//           <div 
//             className={`flex items-center px-4 py-3 cursor-pointer ${activeSidebarItem === 'groupChat' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//             onClick={() => setActiveSidebarItem('groupChat')}
//           >
//             <MessageSquare size={20} />
//             {!sidebarCollapsed && <span className="ml-3">Group Chat</span>}
//           </div>
          
//           <div 
//             className={`flex items-center px-4 py-3 cursor-pointer ${activeSidebarItem === 'directMessages' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//             onClick={() => setActiveSidebarItem('directMessages')}
//           >
//             <User size={20} />
//             {!sidebarCollapsed && <span className="ml-3">Direct Messages</span>}
//           </div>
          
//           <div 
//             className={`flex items-center px-4 py-3 cursor-pointer ${activeSidebarItem === 'drawing' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//             onClick={() => setActiveSidebarItem('drawing')}
//           >
//             <PenTool size={20} />
//             {!sidebarCollapsed && <span className="ml-3">Drawing Board</span>}
//           </div>
          
//           <div 
//             className={`flex items-center px-4 py-3 cursor-pointer ${activeSidebarItem === 'members' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//             onClick={() => setActiveSidebarItem('members')}
//           >
//             <Users size={20} />
//             {!sidebarCollapsed && <span className="ml-3">Members</span>}
//           </div>
          
//           <div 
//             className="flex items-center px-4 py-3 cursor-pointer text-gray-700 hover:bg-gray-100 mt-auto"
//             onClick={() => navigate('/team-leader')}
//           >
//             <ChevronLeft size={20} />
//             {!sidebarCollapsed && <span className="ml-3">Back to Teams</span>}
//           </div>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm p-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-xl font-semibold">{team.name} Dashboard</h1>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-500">
//                 {team.members} members • {tasks.length} tasks
//               </span>
//             </div>
//           </div>
//         </header>
        
//         {/* Content */}
//         <main className="flex-1 overflow-y-auto">
//           {renderSidebarContent()}
//         </main>
//       </div>
      
//       {/* Add Task Modal */}
//       {showAddTaskModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div 
//             className="bg-white rounded-lg shadow-lg w-full max-w-md"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-4">Add New Task</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-title">
//                     Task Title
//                   </label>
//                   <input
//                     id="task-title"
//                     type="text"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     placeholder="Enter task title"
//                     value={newTask.title}
//                     onChange={(e) => setNewTask({...newTask, title: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-description">
//                     Description
//                   </label>
//                   <textarea
//                     id="task-description"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     placeholder="Enter task description"
//                     rows="3"
//                     value={newTask.description}
//                     onChange={(e) => setNewTask({...newTask, description: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-status">
//                     Status
//                   </label>
//                   <select
//                     id="task-status"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     value={newTask.status}
//                     onChange={(e) => setNewTask({...newTask, status: e.target.value})}
//                   >
//                     <option value="todo">To Do</option>
//                     <option value="inProgress">In Progress</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-assigned">
//                     Assign To
//                   </label>
//                   <select
//                     id="task-assigned"
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     value={newTask.assignedTo}
//                     onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
//                   >
//                     <option value="">Select team member</option>
//                     {teamMembers.map(member => (
//                       <option key={member.id} value={member.name}>{member.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
            
//             <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
//                 onClick={() => setShowAddTaskModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                 onClick={handleAddTask}
//               >
//                 Add Task
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamLeadDashboard;