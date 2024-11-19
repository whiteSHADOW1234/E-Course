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
// server/routes/auth.ts
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User")); // Ensure this model is correctly typed in its definition
// Placeholder route for user registration
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password } = req.body;
        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        // Hash the password before saving
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10); // 10 is the salt rounds
        const newUser = new User_1.default({
            username,
            password: hashedPassword, // Store the hashed password
        });
        yield newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        if (error.code === 11000 && ((_a = error.keyPattern) === null || _a === void 0 ? void 0 : _a.username) === 1) {
            // Duplicate username error
            return res.status(409).json({ message: 'Username already exists' });
        }
        return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
}));
// Placeholder route for login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            console.log('User not found:', username); // Important logging
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Incorrect Password for user:', user.password);
            //   return res.status(401).json({ message: 'Authentication failed' });
        }
        // Authentication successful
        res.json({
            message: 'Login successful',
            user: { username: user.username, isAdmin: user.isAdmin }
        });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
}));
exports.default = router;
