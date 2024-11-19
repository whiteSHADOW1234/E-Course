// server/routes/courses.ts
import express, { Request, Response } from 'express';
import Course from '../models/Course'; // Ensure the Course model is properly typed
const router = express.Router();

// Define TypeScript interfaces for request bodies
interface AvailabilityRequestBody {
  day: number;
  time: string;
  available: boolean;
}

interface EnrollRequestBody {
  day: number;
  time: string;
  username: string;
}

interface UnenrollRequestBody {
  day: number;
  time: string;
}

// Get all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update course availability
router.put('/availability', async (req: Request<{}, {}, AvailabilityRequestBody>, res: Response) => {
  try {
    console.log('Received availability update request:', req.body);
    const { day, time, available } = req.body;

    if (day === undefined || time === undefined || available === undefined) {
      console.error('Invalid request data:', req.body);
      return res.status(400).json({ message: "'day', 'time', and 'available' are required." });
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { day, time },
      { available },
      { new: true }
    );

    if (!updatedCourse) {
      console.error('Course not found for update:', day, time);
      return res.status(404).json({ message: 'Course not found' });
    }

    console.log('Course availability updated successfully:', updatedCourse);
    res.json(updatedCourse);
  } catch (error: any) {
    console.error('Error updating availability:', error);
    res.status(500).json({ message: 'Failed to update availability', error: error.message });
  }
});

// Enroll in a course
router.put('/enroll', async (req: Request<{}, {}, EnrollRequestBody>, res: Response) => {
  try {
    console.log('Enroll request received:', req.body);
    const { day, time, username } = req.body;

    if (typeof day !== 'number' || typeof time !== 'string' || typeof username !== 'string') {
      console.error('Invalid data types in enroll request:', req.body);
      return res.status(400).json({ message: "'day' must be a number, 'time' and 'username' must be strings." });
    }

    let course = await Course.findOne({ day, time });

    if (!course) {
      console.error('Course not found for enrollment:', day, time);
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.available) {
      return res.status(400).json({ message: 'Course not available for enrollment' });
    }

    if (course.enrolledUser) {
      return res.status(400).json({ message: 'Course is already enrolled by another user' });
    }

    course.enrolledUser = username;
    const updatedCourse = await course.save();

    console.log('Course enrolled successfully:', updatedCourse);
    res.json(updatedCourse);
  } catch (error: any) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Failed to enroll in course', error: error.message });
  }
});

// Unenroll from a course
router.put('/unenroll', async (req: Request<{}, {}, UnenrollRequestBody>, res: Response) => {
  try {
    console.log('Unenroll request received:', req.body);
    const { day, time } = req.body;

    if (day === undefined || time === undefined) {
      console.error('Invalid request data:', req.body);
      return res.status(400).json({ message: "'day' and 'time' are required." });
    }

    let course = await Course.findOne({ day, time });

    if (!course) {
      console.error('Course not found for unenrollment:', day, time);
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.enrolledUser) {
      return res.status(400).json({ message: 'No user enrolled in this course' });
    }

    course.enrolledUser = null;
    course.available = true;
    await course.save();

    console.log('Course unenrolled successfully');
    res.json({ message: 'Successfully unenrolled', course });
  } catch (error: any) {
    console.error('Error unenrolling from course:', error);
    res.status(500).json({ message: 'Failed to unenroll from course', error: error.message });
  }
});

export default router;
