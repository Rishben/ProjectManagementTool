// Main Component: TLDashBoard.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Components
import CreateProjectModal from "../../components/CreateProjectModal";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import ProjectsSection from "../../components/ProjectsSection";
import TeamMembersSection from "../../components/TeamMembersSection";

const TLDashBoard = () => {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState({
    title: null,
    code: null,
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [newProject, setNewProject] = useState({
    projectName: "",
    description: "",
    projectCode: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, membersResponse] = await Promise.all([
          axios.get("http://localhost:3000/teamLeader/projects", { withCredentials: true }),
          axios.get("http://localhost:3000/teamLeader/teamMembers", { withCredentials: true })
        ]);
        
        setProjects(projectsResponse.data);
        setTeamMembers(membersResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    // Initial fetch
    fetchData();
  
    // Set up interval
    const intervalId = setInterval(fetchData, 5000);
  
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/teamLeader/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      showNotification("Logout failed", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitProject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/teamLeader/projects",
        newProject,
        { withCredentials: true }
      );
      setProjects([...projects, response.data]);
      setIsOpen(false);
      resetNewProject();
      showNotification("Project created successfully!", "success");
    } catch (err) {
      console.log(err);
      showNotification("Failed to create project", "error");
    }
  };

  const resetNewProject = () => {
    setNewProject({ projectName: "", description: "", projectCode: "" });
  };

  const handleDeleteProject = (title, code) => {
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
      setProjects(
        projects.filter(
          (project) =>
            project.title !== projectToDelete.title &&
            project.projectCode !== projectToDelete.code
        )
      );
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

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center relative">
      {/* Notification Component */}
      <Notification 
        notification={notification}
      />

      {/* Header Component */}
      <Header 
        handleLogout={handleLogout}
      />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 p-5">
        {/* Projects Section Component */}
        <ProjectsSection 
          projects={projects}
          handleDeleteProject={handleDeleteProject}
          handleOpenModal={() => setIsOpen(true)}
          showNotification={showNotification}
        />

        {/* Team Members Section Component */}
        <TeamMembersSection 
          teamMembers={teamMembers}
          projects={projects}
          showNotification={showNotification}
        />
      </div>

      {/* Create Project Modal Component */}
      <CreateProjectModal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newProject={newProject}
        handleInputChange={handleInputChange}
        handleSubmitProject={handleSubmitProject}
      />

      {/* Delete Confirmation Dialog Component */}
      <DeleteConfirmationDialog 
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        confirmDeleteProject={confirmDeleteProject}
      />
    </div>
  );
};

export default TLDashBoard;