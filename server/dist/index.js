"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const course_1 = __importDefault(require("./routes/course"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require('path');
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Enable JSON body parsing
app.use(express_1.default.static(path.join(__dirname, '..', '..', 'client', 'build')));
// Database connection
const MONGO_URI = process.env.MONGODB_URI;
mongoose_1.default
    .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));
// Routes
app.use(process.env.REACT_APP_AUTH_URL, auth_1.default); // Authentication routes
app.use(process.env.REACT_APP_COURSE_URL, course_1.default); // Course routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
