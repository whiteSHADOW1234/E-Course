// server/setupTestDB.ts
import mongoose, { ConnectOptions } from 'mongoose';
import Course from './src/models/Course';
import User from './src/models/User';
import bcrypt from 'bcryptjs';


const MONGO_URI_TEST = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/test';


async function initializeTestDatabase() {
  try {
    await mongoose.connect(MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
    console.log('Connected to test database');

    // Clear existing data (important!)
    await Course.deleteMany({});
    await User.deleteMany({});

    // Insert initial course data
    const initialCourses = [
      { day: 0, time: '07:00 PM', available: true, enrolledUser: null },
      { day: 1, time: '08:00 PM', available: false, enrolledUser: 'existinguser' },
        // Add more initial courses as needed
    ];
    await Course.insertMany(initialCourses);


    // Hash the password for initial users:
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const initialUsers = [
      { username: 'testuser', password: hashedPassword, isAdmin: false },
      // Add more initial users here
    ];
    await User.insertMany(initialUsers);

  } catch (error) {
    console.error('Error initializing test database:', error);
    process.exit(1); // Exit with error code
  }
}

export default initializeTestDatabase;