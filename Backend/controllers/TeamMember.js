import bcrypt from "bcrypt";
import TeamMember from "../models/TeamMember.js";

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

        res.status(200).json({
            message: "Login successful",
            // token: jwt.sign({ id: teamMember._id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
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

export { loginTeamMember, registerTeamMember };
