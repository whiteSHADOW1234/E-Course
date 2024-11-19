import React, { useState, useEffect } from 'react';
import courseService from '../service/courseService';

// Define types
interface Course {
    enrolledUser: string | null;
    day: number;
    time: string;
    available: boolean;
}

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

const Calendar: React.FC<CalendarProps> = ({ user }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const fetchedCourses: Course[] = await courseService.getAllCourses();
                console.log('Fetched courses:', fetchedCourses);

                const initialCourses = daysOfWeek
                    .map((_, dayIndex) =>
                        times.map((time24) => {
                            const time12 = formatTime12Hour(time24);
                            const fetchedCourse = fetchedCourses.find(
                                (fc) => fc.day === dayIndex && fc.time === time12
                            );

                            return (
                                fetchedCourse || {
                                    day: dayIndex,
                                    time: time12,
                                    available: false,
                                    enrolledUser: null,
                                    _id: `${dayIndex}-${time12}`,
                                }
                            );
                        })
                    )
                    .flat();

                setCourses(initialCourses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to fetch courses.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = async (dayIndex: number, time24: string) => {
        console.log('Clicked on day:', dayIndex, 'time:', time24);
        if (loading) {
            console.log('Calendar is loading. Click ignored.');
            return;
        }

        const time12 = formatTime12Hour(time24);
        const course = courses.find((c) => c.day === dayIndex && c.time === time12);

        if (!course) {
            console.error('Course not found for day/time:', dayIndex, time12);
            setError(`Course not found for ${daysOfWeek[dayIndex]} at ${time12}.`);
            return;
        }
        console.log('Course:', course);
        try {
            if (user.isAdmin) {
                const updatedCourse = await courseService.updateCourseAvailability(
                    dayIndex,
                    time12,
                    !course.available
                );

                if (updatedCourse) {
                    setCourses((prevCourses) =>
                        prevCourses.map((c) =>
                            c.day === dayIndex && c.time === time12
                                ? { ...c, available: !c.available }
                                : c
                        )
                    );
                } else {
                    setError('Failed to update availability. Please try again later.');
                }
            } else if (!course.enrolledUser && course.available) {
                const updatedCourse = await courseService.enrollCourse(dayIndex, time12, user.username) as Course;
                setCourses((prevCourses) =>
                    prevCourses.map((c) =>
                        c.day === dayIndex && c.time === time12 ? updatedCourse : c
                    )
                );
            } else if (course.enrolledUser === user.username) {
                await courseService.unenrollCourse(dayIndex, time12);
                setCourses((prevCourses) =>
                    prevCourses.map((c) =>
                        c.day === dayIndex && c.time === time12
                            ? { ...c, available: true, enrolledUser: null }
                            : c
                    )
                );
            }
        } catch (error) {
            console.error('Error updating/enrolling:', error);
            setError('Failed to update or enroll.');
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <p>Loading course data...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        {daysOfWeek.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time24) => (
                        <tr key={time24}>
                            <td>{formatTime12Hour(time24)}</td>
                            {daysOfWeek.map((_, dayIndex) => {
                                const time12 = formatTime12Hour(time24);
                                const course = courses.find(
                                    (c) => c.day === dayIndex && c.time === time12
                                );

                                let className = "course-slot";

                                if (course) { // Check if the course is found
                                    if (course.enrolledUser) {
                                        className += " enrolled";
                                    } else if (course.available) {
                                        className += " available";
                                    }
                                }

                                console.log('Course:', course, 'Class name:', className, 'ClassNames:', course?.enrolledUser, course?.available);

                                return (
                                    <td
                                        key={`${dayIndex}-${time12}`}
                                        onClick={() => handleCourseClick(dayIndex, time24)}
                                        className={className}
                                    >
                                        {course && course?.enrolledUser ? course?.enrolledUser : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
