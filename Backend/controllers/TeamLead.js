import bcrypt from "bcrypt";
import mailer from "../config/mailer.js";
import Project from "../models/project.js";
import TeamLead from "../models/teamLead.js";
import TeamMember from "../models/teamMember.js";

import jwt from "jsonwebtoken";

const loginTeamLead = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teamLead = await TeamLead.findOne({ email });

    if (!teamLead) {
      return res.status(404).json({ message: "Team lead not found" });
    }

    const isMatch = await bcrypt.compare(password, teamLead.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update online status to maintain consistency with TeamMember login
    teamLead.isOnline = true;
    await teamLead.save();

    const token = jwt.sign(
      { id: teamLead._id, email: teamLead.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutTeamLead = async (req, res) => {
  try {
    // Find the TeamLead by ID from the token data
    const teamLead = await TeamLead.findById(req.user.id);

    if (teamLead) {
      teamLead.isOnline = false;
      await teamLead.save();
    }

    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerTeamLead = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the team lead already exists
    const existingTeamLead = await TeamLead.findOne({ email });
    if (existingTeamLead) {
      return res.status(400).json({ message: "Team lead already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the team lead
    const teamLead = new TeamLead({ name, email, password: hashedPassword });
    await teamLead.save();

    res.status(201).json({ message: "Team lead registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchProjects = async (req, res) => {
  try {
    const projects = await Project.find({ teamLeader: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addProjects = async (req, res) => {
  const { projectName, description, projectCode } = req.body;

  try {
    const existingProject = await Project.findOne({
      projectName,
      teamLeader: req.user.id,
    });
    if (existingProject) {
      return res.status(400).json({ message: "Project already exists" });
    }

    const newProject = new Project({
      projectName,
      description,
      projectCode,
      teamLeader: req.user.id,
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProject = async (req, res) => {
  const { title } = req.params;

  try {
    const project = await Project.findOneAndDelete({
      projectName: title,
      teamLeader: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendInvite = async (req, res) => {
  const {
    teamMemberId,
    email,
    projectId,
    projectName,
    projectCode,
    message,
    teamLeaderID,
  } = req.body;

  // Validate required fields
  if (
    !teamMemberId ||
    !email ||
    !projectId ||
    !projectName ||
    !projectCode ||
    !message ||
    !teamLeaderID
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate email format
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const teamMember = await TeamMember.findById(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    const teamLead = await TeamLead.findById(teamLeaderID);
    if (!teamLead) {
      return res.status(404).json({ message: "Team lead not found" });
    }

    const memberName = teamMember.name || "Team Member";
    const teamLeadName = teamLead.name || "Team Lead";
    const teamLeadEmail = teamLead.email;

    // More detailed error handling for the email sending
    try {
      const mailOptions = {
        from: `"${teamLeadName}" <${process.env.EMAIL_USER}>`, // This format helps with deliverability
        to: email, // The recipient's email
        cc: teamLeadEmail, // Carbon copy to team lead
        subject: `Invitation to join project: ${projectName}`,
        text: `Hello ${memberName},\n\nYou have been invited to join the project "${projectName}" with code "${projectCode}".\n\nMessage from ${teamLeadName}: ${message}\n\nBest regards,\n${teamLeadName}`,
        html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px; text-align: center;">
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 80%; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #4CAF50; font-size: 24px; margin-bottom: 10px;">Project Invitation</h1>
    <p style="font-size: 16px; line-height: 1.5; color: #555;">Hello ${memberName},</p>
    <p style="font-size: 16px; line-height: 1.5; color: #555;">
      You have been invited to join the project <strong style="color: #4CAF50;">"${projectName}"</strong> with code 
      <strong style="color: #4CAF50;">"${projectCode}"</strong>.
    </p>
    <div style="background-color: #e6f7e6; padding: 15px; border-radius: 5px; margin: 10px 0; font-size: 16px; color: #333;">
      <strong style="color: #4CAF50;">Message from ${teamLeadName}:</strong> ${message}
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #555;">
      You can use the Project Management Tool <strong style="color: #4CAF50;">TaskFlow</strong> to join the team using the project code,
      or simply click the link below to join directly.
    </p>
    <a href="http://localhost:5173/join/${projectCode}/${teamMemberId}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
      Join Project
    </a>
    <p style="font-size: 16px; line-height: 1.5; color: #555; margin-top: 20px;">
      Best regards,<br>
      <span style="font-weight: bold; color: #333;">${teamLeadName}</span>
    </p>
  </div>
</div>
        `,
      };

      const info = await mailer.sendMail(mailOptions);

      return res.status(200).json({
        message: "Invitation sent successfully",
        details: {
          messageId: info.messageId,
          recipient: email,
        },
      });
    } catch (emailError) {
      console.error("Error in mail sending:", emailError);
      return res.status(500).json({
        message: "Failed to send email",
        details: emailError.message,
        errorCode: emailError.code,
      });
    }
  } catch (error) {
    console.error("Error sending invitation:", {
      error: error.message,
      stack: error.stack,
      teamMemberId,
      teamLeaderID,
      email,
    });
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  addProjects,
  deleteProject,
  fetchProjects, fetchTeamMembers, loginTeamLead, logoutTeamLead, registerTeamLead, sendInvite
};

