import express from 'express';
import { loginTeamLead, registerTeamLead } from '../controllers/TeamLead.js';

const router = express.Router();

router.post('/login', loginTeamLead);
router.post('/register', registerTeamLead);

export default router;