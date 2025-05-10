import express from 'express';
import { fetchID } from '../controllers/FetchID.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, fetchID);

export default router;