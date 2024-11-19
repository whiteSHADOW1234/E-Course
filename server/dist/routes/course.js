"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/routes/courses.ts
const express_1 = __importDefault(require("express"));
const Course_1 = __importDefault(require("../models/Course")); // Ensure the Course model is properly typed
const router = express_1.default.Router();
// Get all courses
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find();
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Update course availability
router.put('/availability', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Received availability update request:', req.body);
        const { day, time, available } = req.body;
        if (day === undefined || time === undefined || available === undefined) {
            console.error('Invalid request data:', req.body);
            return res.status(400).json({ message: "'day', 'time', and 'available' are required." });
        }
        const updatedCourse = yield Course_1.default.findOneAndUpdate({ day, time }, { available }, { new: true });
        if (!updatedCourse) {
            console.error('Course not found for update:', day, time);
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log('Course availability updated successfully:', updatedCourse);
        res.json(updatedCourse);
    }
    catch (error) {
        console.error('Error updating availability:', error);
        res.status(500).json({ message: 'Failed to update availability', error: error.message });
    }
}));
// Enroll in a course
router.put('/enroll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Enroll request received:', req.body);
        const { day, time, username } = req.body;
        if (typeof day !== 'number' || typeof time !== 'string' || typeof username !== 'string') {
            console.error('Invalid data types in enroll request:', req.body);
            return res.status(400).json({ message: "'day' must be a number, 'time' and 'username' must be strings." });
        }
        let course = yield Course_1.default.findOne({ day, time });
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
        const updatedCourse = yield course.save();
        console.log('Course enrolled successfully:', updatedCourse);
        res.json(updatedCourse);
    }
    catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Failed to enroll in course', error: error.message });
    }
}));
// Unenroll from a course
router.put('/unenroll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Unenroll request received:', req.body);
        const { day, time } = req.body;
        if (day === undefined || time === undefined) {
            console.error('Invalid request data:', req.body);
            return res.status(400).json({ message: "'day' and 'time' are required." });
        }
        let course = yield Course_1.default.findOne({ day, time });
        if (!course) {
            console.error('Course not found for unenrollment:', day, time);
            return res.status(404).json({ message: 'Course not found' });
        }
        if (!course.enrolledUser) {
            return res.status(400).json({ message: 'No user enrolled in this course' });
        }
        course.enrolledUser = null;
        course.available = true;
        yield course.save();
        console.log('Course unenrolled successfully');
        res.json({ message: 'Successfully unenrolled', course });
    }
    catch (error) {
        console.error('Error unenrolling from course:', error);
        res.status(500).json({ message: 'Failed to unenroll from course', error: error.message });
    }
}));
exports.default = router;
