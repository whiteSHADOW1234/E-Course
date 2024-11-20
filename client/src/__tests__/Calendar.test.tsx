import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Import waitFor
import Calendar from '../components/Calendar';
import courseService from '../service/courseService';
import { act } from 'react-test-renderer';
import userEvent from '@testing-library/user-event' 

jest.mock('../service/courseService');

interface User {
    isAdmin: boolean;
    username: string;
}

interface CalendarProps {
    user: User;
}

// Constants
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const times: string[] = [];
for (let hour = 19; hour <= 23; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 23) {
        times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
}

// Helper function to format time
const formatTime12Hour = (time24: string): string => {
    const [hour, minute] = time24.split(':');
    const hour12 = (parseInt(hour) % 12) || 12;
    const ampm = parseInt(hour) >= 12 ? 'PM' : 'AM';
    return `${hour12.toString().padStart(2, '0')}:${minute} ${ampm}`;
};

const mockUser = { isAdmin: false, username: 'testuser' };
const mockAdminUser = { isAdmin: true, username: 'adminuser' };

const mockCourses: any = daysOfWeek.flatMap((_, dayIndex) =>
times.map((time24) => ({
    _id: `${dayIndex}-${time24}`,
    enrolledUser: null,
    day: dayIndex,
    time: formatTime12Hour(time24), // Format time
    available: true,
}))
);



beforeEach(() => {
    (courseService.getAllCourses as jest.Mock).mockResolvedValue(mockCourses);
    (courseService.enrollCourse as jest.Mock).mockResolvedValue({});
    (courseService.unenrollCourse as jest.Mock).mockResolvedValue({});
    (courseService.updateCourseAvailability as jest.Mock).mockResolvedValue({});

});

afterEach(() => {
    jest.clearAllMocks();
});




test('renders calendar structure', async () => {

    render(<Calendar user={mockUser} />);
    await screen.findByRole('table'); // Wait for table to be in the document
    expect(screen.getByRole('table')).toBeInTheDocument();

    daysOfWeek.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
});


test('renders calendar structure for admin', async () => {  // Add async here
    render(<Calendar user={mockAdminUser} />);
    await screen.findByRole('table');// Wait for table to render

    expect(screen.getByRole('table')).toBeInTheDocument();

    daysOfWeek.forEach((day) => {
        expect(screen.getByText(day)).toBeInTheDocument();
    });
});


// ... other tests (add tests for admin clicks, unenrolling, etc.)