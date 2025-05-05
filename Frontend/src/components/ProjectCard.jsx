// components/ProjectCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrashIcon, 
  CopyIcon, 
  CheckIcon 
} from "@radix-ui/react-icons";
import { 
  CalendarIcon, 
  ChevronRightIcon, 
  FolderIcon, 
  UsersIcon 
} from "@heroicons/react/24/outline";

const ProjectCard = ({ project, handleDeleteProject, showNotification }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      setTimeout(() => {
        setCopiedCode(false);
      }, 2000);
      showNotification("Team code copied to clipboard!", "success");
    });
  };

  return (
    <motion.div
      className="border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FolderIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {project.projectName}
              </h3>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
            onClick={() =>
              handleDeleteProject(
                project.projectName,
                project.projectCode
              )
            }
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Team Code Section */}
        <div className="mt-3 flex items-center rounded p-2">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Team Code:
          </span>
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
            {project.projectCode || "CODE123"}
          </code>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="ml-2 p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            onClick={() =>
              copyToClipboard(project.projectCode || "CODE123")
            }
            aria-label="Copy team code"
          >
            {copiedCode ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>Created {new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <UsersIcon className="w-4 h-4 mr-1" />
            <span>5 members</span>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            className="flex items-center text-blue-600 text-sm font-medium"
          >
            View details
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;