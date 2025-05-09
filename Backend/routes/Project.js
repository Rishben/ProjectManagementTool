import express from 'express';
import { ProjectDetails } from '../controllers/Project.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/:code', verifyToken, ProjectDetails);

export default router;