// routes/index.ts
import { Router } from 'express';
import { connectDB } from '../config/db';
import gameRoutes from './gameRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Connect to MongoDB
connectDB();

router.use('/games', gameRoutes);
router.use('/auth', authRoutes);

export default router;
