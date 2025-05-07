import express from 'express';
import { fetchProjects, loginTeamLead, registerTeamLead,logoutTeamLead, addProjects, deleteProject, fetchTeamMembers, sendInvite, fetchTeamLeadName } from '../controllers/TeamLead.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', loginTeamLead);
router.post('/register', registerTeamLead);
router.get('/logout', verifyToken,logoutTeamLead);
router.post("/projects",verifyToken,addProjects);
router.get("/projects",verifyToken,fetchProjects);
router.delete("/projects/:title",verifyToken,deleteProject);
router.get("/teamMembers",verifyToken,fetchTeamMembers);
router.post("/sendInvite",verifyToken,sendInvite);
router.get("/getTeamLeader",verifyToken,fetchTeamLeadName);

export default router;