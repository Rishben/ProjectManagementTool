import express from 'express';

const router = express.Router();
import JoinProject from '../controllers/JoinProject.js';

router.post('/', JoinProject);

export default router;