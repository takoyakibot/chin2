// backend/src/routes/authRoutes.ts

import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    const user = new User({ username, password });
    await user.save();

    // Ideally, you would also create a new session for the user and send it back here

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;