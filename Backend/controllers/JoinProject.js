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

    if (project.teamMembers.includes(teamMemberId)) {
      return res.status(400).json({ message: "Team member already in the project" });
    }

    project.teamMembers.push(teamMemberId);
    await project.save();

    res.status(200).json({ message: "Team member joined the project successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default JoinProject;