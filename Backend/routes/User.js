import express from 'express';
import verifyToken from '../middlewares/auth.js';
import { fetchUsers } from '../controllers/User.js';

const router = express.Router();

router.get('/:code', verifyToken, fetchUsers);

export default router;