import bcrypt from "bcrypt";
import TeamLead from "../models/TeamLead.js";

import jwt from 'jsonwebtoken';

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

    const token = jwt.sign(
      { id: teamLead._id, email: teamLead.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful" });
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

export { loginTeamLead, registerTeamLead };

