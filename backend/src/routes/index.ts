// routes/index.ts
import { Router } from 'express';
import { connectDB } from '../config/db';
import gameRoutes from './gameRoutes';
// import chatRoutes from './chatRoutes';
// import authRoutes from './authRoutes';

const router = Router();

// Connect to MongoDB
connectDB();

router.use('/games', gameRoutes);
// router.use('/chats', chatRoutes);
// router.use('/auth', authRoutes);

export default router;
