import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsSection = ({ projects, handleDeleteProject, handleOpenModal, showNotification }) => {
  
  const minContentHeight = projects.length > 0 
    ? Math.min(projects.length * 120 + 120, 600)
    : 200;

  return (
    <div 
      className="col-span-1 lg:col-span-3 bg-white p-5 rounded shadow flex flex-col"
      style={{ 
        height: 'fit-content',
        minHeight: `${minContentHeight}px`,
        transition: 'min-height 0.3s ease'
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <motion.button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusIcon />
          Create Project
        </motion.button>
      </div>

      <div className="flex-grow">
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard 
                key={project.title || project._id}
                project={project}
                handleDeleteProject={handleDeleteProject}
                showNotification={showNotification}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-10">
            No projects available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;