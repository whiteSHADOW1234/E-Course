// client/src/services/courseService.ts
const API_URL = process.env.REACT_APP_COURSE_URL; // Ensure this matches your server's URL

// Define interfaces for expected data
interface Course {
  enrolledUser: string | null;
  day: number;
  time: string;
  available: boolean;
  _id: string;
}

interface ApiResponse<T> {
  message?: string;
  data?: T;
}

// Fetch all courses
const getAllCourses = async (): Promise<Course[]> => {
  if (process.env.REACT_APP_COURSE_URL === undefined) {
    console.log('REACT_APP_COURSE_URL is not defined');
  } else {
    console.log('REACT_APP_COURSE_URL is defined');
  }
  try {
    if (!API_URL) {
      throw new Error('API_URL is not defined');
    }
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Course[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
};

// Update course availability
const updateCourseAvailability = async (
  day: number,
  time: string,
  available: boolean
): Promise<ApiResponse<Course>> => {
  console.log(
    'Sending availability update request: day=',
    day,
    'time=',
    time,
    'available=',
    available
  );

  try {
    const response = await fetch(`${API_URL}/availability`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day, time, available }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update course availability');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating course availability:', error);
    throw error;
  }
};

// Enroll in a course
const enrollCourse = async (
  day: number,
  time: string,
  username: string
): Promise<ApiResponse<Course>> => {
  console.log('Sending enroll request: day=', day, 'time=', time, 'username=', username);

  try {
    const response = await fetch(`${API_URL}/enroll`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day, time, username }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to enroll in course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

// Unenroll from a course
const unenrollCourse = async (
  day: number,
  time: string
): Promise<ApiResponse<Course>> => {
  console.log('Sending unenroll request: day=', day, 'time=', time);

  try {
    const response = await fetch(`${API_URL}/unenroll`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ day, time }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to unenroll from course');
    }

    return await response.json();
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    throw error;
  }
};

// Export the service
const courseService = {
  getAllCourses,
  updateCourseAvailability,
  enrollCourse,
  unenrollCourse,
};

export default courseService;
