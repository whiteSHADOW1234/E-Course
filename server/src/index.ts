// server/index.ts
import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import courseRoutes from './routes/course';
import dotenv from 'dotenv';
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const app: Application = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

app.use(express.static(path.join(__dirname,  '..','..', 'client','build')));

// Database connection
const MONGO_URI = process.env.MONGODB_URI as string;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use( process.env.REACT_APP_AUTH_URL as string, authRoutes); // Authentication routes
app.use( process.env.REACT_APP_COURSE_URL as string, courseRoutes); // Course routes

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','..', 'client', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };