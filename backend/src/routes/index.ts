// routes/index.ts
import { Router } from 'express';
import gameRoutes from './gameRoutes';
// import chatRoutes from './chatRoutes';
// import authRoutes from './authRoutes';

const router = Router();

router.use('/games', gameRoutes);
// router.use('/chats', chatRoutes);
// router.use('/auth', authRoutes);

export default router;
