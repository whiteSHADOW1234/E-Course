# **E-Course Enrollment System**

<p align="center">
  <img src="https://img.shields.io/badge/REACT->=18.3.1-lightgreen?style=for-the-badge" alt="React Badge" />
  <img src="https://img.shields.io/badge/NODEJS->=20.18.0-green?style=for-the-badge" alt="Node.js Badge" />
  <img src="https://img.shields.io/badge/EXPRESSJS->=4.21.1-orange?style=for-the-badge" alt="Express.js Badge" />
  <img src="https://img.shields.io/badge/MONGODB->=6.0-darkgreen?style=for-the-badge" alt="MongoDB Badge" />
  <img src="https://img.shields.io/badge/DOCKER->=27.3.1-blue?style=for-the-badge" alt="Docker Badge" />
</p>

A user-friendly course enrollment web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform supports both user and admin functionalities, with features like course management, enrollment tracking, and a visualized weekly schedule.

<p align="center">
  <a href="https://e-course-wuge.onrender.com/" target="_blank"><strong>Live Demo</strong></a>
</p>

> [!NOTE]
> *The demo uses Render's free hosting plan and external database services, which may cause occasional downtime. **If the site is unavailable, please wait a moment and refresh.***


## **📜 Project Description**

The E-Course Enrollment System allows users to:
- Register and log in to their accounts.
- Enroll in available courses based on a weekly schedule divided into 30-minute time slots.
- Administer course availability and view real-time course status.

## **✨ Features**

- **User Authentication:** Secure login and registration.
- **Dynamic Course Management:** Enroll or unenroll from courses with real-time status updates.
- **Admin Tools:** Manage course availability and slots.
- **Visual Schedule:** Interactive weekly schedule view.
- **Backend in TypeScript:** Ensures type safety and maintainability.
- **Docker Support:** Simplifies deployment and setup.

## **🖼️ Screenshots**

### 1. **Landing Page** (Login/Register)
  ![Landing Page Screenshot](https://github.com/user-attachments/assets/eecc0d61-6d10-4c7d-a5c3-e03c7a07ffe3)

### 2. **Admin Course Availability View**
- **Gray Slots:** Not available.  
- **White Slots:** Available for enrollment.

### 3. **Course Enrollment & User Interaction**
- **Black Background with Username:** Indicates the user is enrolled in the slot.
  ![Course Interaction Screenshot](https://github.com/user-attachments/assets/585ed096-8af9-46d6-858b-658c8414d948)


## **🚀 Installation and Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/whiteSHADOW1234/E-Course.git
```

### **2. Install Dependencies**
Run the following commands in both the `client` and `server` directories:
```bash
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### **3. Configure Environment Variables**
1. Rename `.env.example` to `.env` in both `client` and `server` directories.
2. Replace placeholders in the `.env` files with your actual configuration.

### **4. Start Development Servers**
```bash
cd server && npm start
```

## **🐳 Running with Docker Compose (Recommended)**

### **1. Prerequisites**
- Ensure Docker and Docker Compose are installed on your machine.

### **2. Configure Environment Variables**
- Set up your `.env` file in the `server` directory (refer to `.env.example`).

### **3. Start the Application**
From the project root directory, run:
```bash
docker-compose up -d --build
```

The application will be accessible at `http://localhost:5000`.

## **🤝 Contributing**

We welcome contributions! If you'd like to improve the project, please:
1. Open an issue to discuss potential changes.
2. Submit a pull request with detailed explanations.
