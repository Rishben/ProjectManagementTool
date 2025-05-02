import express from 'express';
import { fetchProjects, loginTeamLead, registerTeamLead, addProjects, deleteProject } from '../controllers/TeamLead.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', loginTeamLead);
router.post('/register', registerTeamLead);
router.post("/projects",verifyToken,addProjects);
router.get("/projects",verifyToken,fetchProjects);
router.delete("/projects/:title",verifyToken,deleteProject);

export default router;