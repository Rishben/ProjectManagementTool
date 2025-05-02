// import { motion } from 'framer-motion';
// import { Check, CheckCircle, Clock, Copy, Plus, Users, X } from 'lucide-react';
// import React, { useState } from 'react';

// const TeamLeaderHome = () => {
//   const [teams, setTeams] = useState([
//     { 
//       id: 1, 
//       name: 'Web Development', 
//       members: 4, 
//       code: 'WEB-DEV-2025', 
//       tasks: {
//         todo: 5,
//         inProgress: 3,
//         completed: 7
//       }
//     },
//     { 
//       id: 2, 
//       name: 'UI/UX Design', 
//       members: 3, 
//       code: 'UIUX-2025', 
//       tasks: {
//         todo: 2,
//         inProgress: 4,
//         completed: 8
//       }
//     }
//   ]);
  
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
//   const [showTeamDetails, setShowTeamDetails] = useState(null);
//   const [newTeamName, setNewTeamName] = useState('');
//   const [copiedCode, setCopiedCode] = useState('');
  
//   const [teamMembers, setTeamMembers] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'active' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'active' },
//     { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'QA Engineer', status: 'inactive' },
//     { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Frontend Developer', status: 'active' },
//     { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Backend Developer', status: 'active' }
//   ]);

//   const handleCreateTeam = () => {
//     if (newTeamName.trim()) {
//       const newTeam = {
//         id: teams.length + 1,
//         name: newTeamName,
//         members: 0,
//         code: `${newTeamName.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
//         tasks: {
//           todo: 0,
//           inProgress: 0,
//           completed: 0
//         }
//       };
//       setTeams([...teams, newTeam]);
//       setNewTeamName('');
//       setShowCreateTeamModal(false);
//     }
//   };

//   const copyTeamCode = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(''), 2000);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Team Leader Dashboard</h1>
//           <p className="text-gray-600 mt-2">Manage your teams and projects efficiently</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Teams Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">My Teams</h2>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
//                   onClick={() => setShowCreateTeamModal(true)}
//                 >
//                   <Plus size={18} className="mr-2" />
//                   Create New Team
//                 </motion.button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {teams.map((team) => (
//                   <motion.div
//                     key={team.id}
//                     className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
//                     whileHover={{ y: -5 }}
//                     onClick={() => setShowTeamDetails(team)}
//                   >
//                     <h3 className="font-semibold text-lg text-gray-800">{team.name}</h3>
//                     <div className="flex items-center text-gray-600 mt-2">
//                       <Users size={16} className="mr-1" />
//                       <span className="text-sm">{team.members} members</span>
//                     </div>
//                     <div className="mt-4">
//                       <div className="flex justify-between text-sm text-gray-600">
//                         <span>Team Code:</span>
//                         <div className="flex items-center">
//                           <span className="font-mono">{team.code}</span>
//                           {copiedCode === team.code ? (
//                             <Check size={16} className="ml-1 text-green-500" />
//                           ) : (
//                             <button 
//                               className="ml-1 text-gray-400 hover:text-gray-600"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 copyTeamCode(team.code);
//                               }}
//                             >
//                               <Copy size={16} />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-between mt-4 text-sm font-medium">
//                       <div className="flex items-center space-x-1 text-red-500">
//                         <span>{team.tasks.todo}</span>
//                         <span>To Do</span>
//                       </div>
//                       <div className="flex items-center space-x-1 text-yellow-500">
//                         <span>{team.tasks.inProgress}</span>
//                         <span>In Progress</span>
//                       </div>
//                       <div className="flex items-center space-x-1 text-green-500">
//                         <span>{team.tasks.completed}</span>
//                         <span>Completed</span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {teams.length === 0 && (
//                 <div className="text-center py-8 text-gray-500">
//                   <p>You haven't created any teams yet.</p>
//                   <p className="mt-2">Click "Create New Team" to get started.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Team Members Section */}
//           <div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800">Team Members</h2>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
//                   onClick={() => setShowInviteModal(true)}
//                 >
//                   <Plus size={16} className="mr-1" />
//                   Invite
//                 </motion.button>
//               </div>

//               <div className="space-y-3">
//                 {teamMembers.map((member) => (
//                   <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
//                     <div>
//                       <p className="font-medium text-gray-800">{member.name}</p>
//                       <p className="text-sm text-gray-500">{member.email}</p>
//                     </div>
//                     <div className="flex items-center">
//                       <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                         member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
//                       }`}></span>
//                       <span className="text-sm text-gray-600">{member.role}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Team Details Modal */}
//       {showTeamDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div 
//             className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-800">{showTeamDetails.name}</h2>
//                 <button onClick={() => setShowTeamDetails(null)} className="text-gray-400 hover:text-gray-600">
//                   <X size={24} />
//                 </button>
//               </div>
//               <div className="flex items-center mt-2 text-sm text-gray-600">
//                 <span className="font-medium mr-2">Team Code:</span>
//                 <span className="font-mono">{showTeamDetails.code}</span>
//                 {copiedCode === showTeamDetails.code ? (
//                   <Check size={16} className="ml-2 text-green-500" />
//                 ) : (
//                   <button 
//                     className="ml-2 text-gray-400 hover:text-gray-600"
//                     onClick={() => copyTeamCode(showTeamDetails.code)}
//                   >
//                     <Copy size={16} />
//                   </button>
//                 )}
//               </div>
//             </div>
            
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//                 <div className="bg-red-50 p-4 rounded-lg border border-red-100">
//                   <h3 className="font-semibold flex items-center text-red-700">
//                     <Clock size={18} className="mr-2" />
//                     To Do ({showTeamDetails.tasks.todo})
//                   </h3>
//                   <div className="mt-3 space-y-2">
//                     {showTeamDetails.tasks.todo > 0 ? (
//                       Array(showTeamDetails.tasks.todo).fill(0).map((_, i) => (
//                         <div key={i} className="bg-white p-3 rounded shadow-sm">
//                           <p className="font-medium">Task {i+1}</p>
//                           <p className="text-sm text-gray-500">Description for task {i+1}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500">No tasks to do</p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
//                   <h3 className="font-semibold flex items-center text-yellow-700">
//                     <Clock size={18} className="mr-2" />
//                     In Progress ({showTeamDetails.tasks.inProgress})
//                   </h3>
//                   <div className="mt-3 space-y-2">
//                     {showTeamDetails.tasks.inProgress > 0 ? (
//                       Array(showTeamDetails.tasks.inProgress).fill(0).map((_, i) => (
//                         <div key={i} className="bg-white p-3 rounded shadow-sm">
//                           <p className="font-medium">Task {i+1}</p>
//                           <p className="text-sm text-gray-500">Description for task {i+1}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500">No tasks in progress</p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="bg-green-50 p-4 rounded-lg border border-green-100">
//                   <h3 className="font-semibold flex items-center text-green-700">
//                     <CheckCircle size={18} className="mr-2" />
//                     Completed ({showTeamDetails.tasks.completed})
//                   </h3>
//                   <div className="mt-3 space-y-2">
//                     {showTeamDetails.tasks.completed > 0 ? (
//                       Array(showTeamDetails.tasks.completed).fill(0).map((_, i) => (
//                         <div key={i} className="bg-white p-3 rounded shadow-sm">
//                           <p className="font-medium">Task {i+1}</p>
//                           <p className="text-sm text-gray-500">Description for task {i+1}</p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500">No completed tasks</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="font-semibold text-lg mb-3">Team Members ({showTeamDetails.members})</h3>
//                 <div className="space-y-2">
//                   {teamMembers.slice(0, showTeamDetails.members).map((member) => (
//                     <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
//                       <div>
//                         <p className="font-medium">{member.name}</p>
//                         <p className="text-sm text-gray-500">{member.email}</p>
//                       </div>
//                       <span className="text-sm text-gray-600">{member.role}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
//                 onClick={() => setShowTeamDetails(null)}
//               >
//                 Close
//               </button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
//                 Add Task
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Create Team Modal */}
//       {showCreateTeamModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div 
//             className="bg-white rounded-lg shadow-lg w-full max-w-md"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-4">Create New Team</h2>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team-name">
//                   Team Name
//                 </label>
//                 <input
//                   id="team-name"
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   placeholder="Enter team name"
//                   value={newTeamName}
//                   onChange={(e) => setNewTeamName(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
//                 onClick={() => setShowCreateTeamModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                 onClick={handleCreateTeam}
//               >
//                 Create Team
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Invite Team Member Modal */}
//       {showInviteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div 
//             className="bg-white rounded-lg shadow-lg w-full max-w-md"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-4">Invite Team Member</h2>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   placeholder="Enter email address"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team-select">
//                   Select Team
//                 </label>
//                 <select
//                   id="team-select"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 >
//                   {teams.map(team => (
//                     <option key={team.id} value={team.id}>{team.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
//                   Role
//                 </label>
//                 <input
//                   id="role"
//                   type="text"
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   placeholder="Enter role (e.g. Developer, Designer)"
//                 />
//               </div>
//             </div>
//             <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
//               <button 
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
//                 onClick={() => setShowInviteModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                 onClick={() => setShowInviteModal(false)}
//               >
//                 Send Invitation
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamLeaderHome;