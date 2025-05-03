import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // This was missing in your original code
import TeamMember from "../models/teamMember.js";

import dotenv from "dotenv";
dotenv.config();

const loginTeamMember = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the team member exists
        const teamMember = await TeamMember.findOne({ email });

        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, teamMember.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Fixed: changed member.save() to teamMember.save()
        teamMember.isOnline = true;
        await teamMember.save();

        const token = jwt.sign(
              { id: teamMember._id, email: teamMember.email },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );
        
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const registerTeamMember = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the team member already exists
        const existingTeamMember = await TeamMember.findOne({ email });
        if (existingTeamMember) {
            return res.status(400).json({ message: "Team member already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the team member
        const teamMember = new TeamMember({ name, email, password: hashedPassword });
        await teamMember.save();

        res.status(201).json({ message: "Team member registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logOutTeamMember = async (req, res) => {
    try {
      const teamMember = await TeamMember.findById(req.user.id);
      
      if (teamMember) {
        teamMember.isOnline = false;
        await teamMember.save();
      }
      
      res.clearCookie('token');
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

export { loginTeamMember, logOutTeamMember, registerTeamMember };
