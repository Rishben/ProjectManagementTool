import Project from "../models/project.js";
import TeamMember from "../models/teamMember.js";

const JoinProject = async (req, res) => {
  const { projectCode, teamMemberId } = req.body;

  try {
    const project = await Project.findOne({ projectCode });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const teamMember = await TeamMember.findById(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    // Check if team member is already in the project
    const memberExists = project.teamMembers.some(member => 
      member._id && member._id.toString() === teamMemberId
    );
    
    if (memberExists) {
      return res.status(400).json({ message: "Team member already in the project" });
    }

    // Create a simplified team member object with only the needed fields
    const simplifiedMember = {
      _id: teamMember._id,
      name: teamMember.name,
      email: teamMember.email,
      isOnline: teamMember.isOnline
      // Password, teamLeader, and teamCode are excluded
    };

    // Add the team member object to the project's teamMembers array
    project.teamMembers.push(simplifiedMember);
    await project.save();

    res.status(200).json({ 
      message: "Team member joined the project successfully",
      project: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default JoinProject;