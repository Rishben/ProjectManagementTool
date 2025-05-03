import express from 'express';
import {registerTeamMember, loginTeamMember, logOutTeamMember} from '../controllers/TeamMember.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerTeamMember);

router.post('/login', loginTeamMember);

router.post('/logout',verifyToken, logOutTeamMember);

export default router;