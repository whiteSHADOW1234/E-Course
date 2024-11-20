// server/routes/auth.ts
import express, { Request, Response } from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Ensure this model is correctly typed in its definition


// Define TypeScript interfaces for request bodies
interface RegisterRequestBody {
  username: string;
  password: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

// Placeholder route for user registration
router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error('Error during registration:', error);
    if (error.code === 11000 && error.keyPattern?.username === 1) {
      // Duplicate username error
      return res.status(409).json({ message: 'Username already exists' });
    }

    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Placeholder route for login
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username); // Important logging
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   console.log('Incorrect Password for user:', user.password);
    // //   return res.status(401).json({ message: 'Authentication failed' });
    // }

    // Authentication successful
    res.json({ 
      message: 'Login successful', 
      user: { username: user.username, isAdmin: user.isAdmin } 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;
