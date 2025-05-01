import express from 'express';
import {registerTeamMember, loginTeamMember} from '../controllers/TeamMember.js';

const router = express.Router();

router.post('/register', registerTeamMember);

router.post('/login', loginTeamMember);

export default router;