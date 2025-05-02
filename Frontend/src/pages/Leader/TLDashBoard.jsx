import { CalendarIcon, ChevronRightIcon, FolderIcon, UsersIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, CopyIcon, Cross2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const TLDashBoard = () => {
  const [projects, setProjects] = React.useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState({ title: null, code: null });
  const [copiedTitle, setCopiedTitle] = useState(null);
  const [newProject, setNewProject] = useState({
    projectName: "",
    description: "",
    projectCode: "",
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/teamLeader/projects",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setProjects(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setNewProject({ projectName: "", description: "", projectCode: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/teamLeader/projects",
        newProject,
        {
          withCredentials: true,
        }
      );
      setProjects([...projects, response.data]);
      handleCloseModal();
      showNotification("Project created successfully!", "success");
    } catch (err) {
      console.log(err);
      showNotification("Failed to create project", "error");
    }
  };
  
  const handleDeleteProject = async (title, code) => {
    setProjectToDelete({ title, code });
    setIsDeleting(true);
  };
  
  const confirmDeleteProject = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/teamLeader/projects/${projectToDelete.title}`,
        {
          data: { title: projectToDelete.title, code: projectToDelete.code },
          withCredentials: true,
        }
      );
      setProjects(projects.filter(project => 
        project.title !== projectToDelete.title && project.projectCode !== projectToDelete.code
      ));
      setIsDeleting(false);
      showNotification("Project deleted successfully!", "success");
    } catch (err) {
      console.log(err);
      showNotification("Failed to delete project", "error");
    }
  };
  
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const copyToClipboard = (title, code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedTitle(title);
      setTimeout(() => {
        setCopiedTitle(null);
      }, 2000);
      showNotification("Team code copied to clipboard!", "success");
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center relative">
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto my-5 flex items-center justify-between">
        <nav>
          <h1 className="text-3xl font-bold">Team Leader Dashboard</h1>
          <p className="text-gray-500">Manage your teams and projects here</p>
        </nav>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          Logout
        </motion.button>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-5">
        {/* Projects Section (spans 3 columns on large screens) */}
        <div className="col-span-1 lg:col-span-3 bg-white p-5 rounded shadow overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
              <Dialog.Trigger asChild>
                <motion.button 
                  onClick={handleOpenModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusIcon />
                  Create Project
                </motion.button>
              </Dialog.Trigger>
              
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                  <Dialog.Title className="text-xl font-bold mb-4">
                    Create New Project
                  </Dialog.Title>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={newProject.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter project name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter project description"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Team Code
                      </label>
                      <input
                        type="text"
                        name="projectCode"
                        value={newProject.projectCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Enter team code"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <Dialog.Close asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </motion.button>
                    </Dialog.Close>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmitProject}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                    >
                      <PlusIcon />
                      Create Project
                    </motion.button>
                  </div>
                  
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="Close"
                    >
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <AnimatePresence>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div 
                    key={project.title} 
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
                            <p className="text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                          onClick={() => handleDeleteProject(project.projectName, project.projectCode)}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                      
                      {/* Team Code Section */}
                      <div className="mt-3 flex items-center rounded p-2">
                        <span className="text-sm font-medium text-gray-700 mr-2">Team Code:</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">{project.projectCode || "CODE123"}</code>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-2 p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                          onClick={() => copyToClipboard(project.projectName, project.projectCode || "CODE123")}
                          aria-label="Copy team code"
                        >
                          {copiedTitle === project.projectName ? (
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
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-center py-10"
              >
                No projects available
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Delete Confirmation Dialog */}
          <Dialog.Root open={isDeleting} onOpenChange={setIsDeleting}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <Dialog.Title className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </div>
                  Delete Project
                </Dialog.Title>
                
                <p className="mb-4">Are you sure you want to delete this project? This action cannot be undone.</p>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Dialog.Close asChild>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDeleteProject}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
                  >
                    <TrashIcon />
                    Delete
                  </motion.button>
                </div>
                
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full w-6 h-6 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Team Members Section (1 column) */}
        <motion.div 
          className="bg-white p-5 rounded shadow h-fit sticky top-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-3">Team Members</h2>
          <ul className="space-y-2">
            {/* Team members will be listed here */}
            <motion.li 
              className="p-2 hover:bg-gray-50 rounded flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span>Team member placeholder</span>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TLDashBoard;