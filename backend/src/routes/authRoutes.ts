// backend/src/routes/authRoutes.ts

import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      // Ideally, you would also create a new session for the user and send it back here
      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      // Send the token in the response
      res.status(200).json({ message: 'User logged in successfully', token });

      res.status(200).json({ message: 'User logged in successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;