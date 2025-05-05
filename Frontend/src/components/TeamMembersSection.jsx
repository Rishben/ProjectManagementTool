// components/TeamMembersSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusIcon, Cross2Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import axios from "axios";

const TeamMembersSection = ({ teamMembers, projects, showNotification }) => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [inviteData, setInviteData] = useState({
    projectId: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = (member) => {
    setSelectedMember(member);
    setIsInviteModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInviteData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendInvitation = async () => {
    if (!inviteData.projectId) {
      showNotification("Please select a project", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Find the selected project to include its code in the email
      const selectedProject = projects.find(p => p._id === inviteData.projectId);
      
      await axios.post(
        "http://localhost:3000/teamLeader/sendInvite",
        {
          teamMemberId: selectedMember._id,
          email: selectedMember.email,
          projectId: inviteData.projectId,
          projectName: selectedProject.projectName,
          projectCode: selectedProject.projectCode,
          teamLeaderID: selectedProject.teamLeader,
          message: inviteData.message
        },
        { withCredentials: true }
      );

      showNotification(`Invitation sent to ${selectedMember.name}`, "success");
      setIsInviteModalOpen(false);
      resetInviteForm();
    } catch (err) {
      console.error(err);
      showNotification("Failed to send invitation", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetInviteForm = () => {
    setInviteData({
      projectId: "",
      message: ""
    });
    setSelectedMember(null);
  };

  return (
    <>
      <motion.div
        className="bg-white p-5 rounded shadow h-fit sticky top-5"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-3">Team Members</h2>
        <ul className="space-y-2">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <motion.li
                key={member._id}
                className="p-2 hover:bg-gray-50 border-1 border-gray-200 rounded flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      member.isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <div>
                    <h3 className="text-md font-semibold">{member.name}</h3>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleInvite(member)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1 text-sm"
                >
                  <PlusIcon className="w-3 h-3" />
                  Invite
                </button>
              </motion.li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No team members</p>
          )}
        </ul>
      </motion.div>

      {/* Invite Modal */}
      <Dialog.Root open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <EnvelopeClosedIcon className="w-5 h-5 text-blue-600" />
              </div>
              Invite Team Member
            </Dialog.Title>

            {selectedMember && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="font-medium">Sending invitation to:</p>
                <p className="text-gray-700">{selectedMember.name} ({selectedMember.email})</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Project
                </label>
                <select
                  name="projectId"
                  value={inviteData.projectId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">-- Select a project --</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>
                      {project.projectName} (Code: {project.projectCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={inviteData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Add a personal message to the invitation email..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  onClick={resetInviteForm}
                >
                  Cancel
                </motion.button>
              </Dialog.Close>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendInvitation}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <EnvelopeClosedIcon />
                {isLoading ? "Sending..." : "Send Invitation"}
              </motion.button>
            </div>

            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
                onClick={resetInviteForm}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default TeamMembersSection;