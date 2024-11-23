# E-Course Enrollment System
<p align="center">
  <img src="https://img.shields.io/badge/REACT->=18.3.1-lightgreen?style=for-the-badge" alt="React Badge" />
  <img src="https://img.shields.io/badge/NODEJS->=20.18.0-green?style=for-the-badge" alt="NODEJS Badge" />
  <img src="https://img.shields.io/badge/EXPRESSJS->=4.21.1-orange?style=for-the-badge" alt="Express Badge" />
  <img src="https://img.shields.io/badge/Mongodb->=6.0-darkgreen?style=for-the-badge" alt="React Badge" />
  <img src="https://img.shields.io/badge/DOCKER->=27.3.1-blue?style=for-the-badge" alt="Docker Badge" />
</p>
A simple course enrollment web application built with the MERN stack (MongoDB, Express, React, Node.js).

<p align="center">
  <a href="https://e-course-wuge.onrender.com/">Demo Link</a>
</p>

> *Note: The demo link uses Render's free plan and relies on other free online database hosting services, which may cause the website to go offline occasionally. If it's down, please wait a moment and refresh.*
## Project Description

This MERN stack application allows users to enroll in courses within a weekly schedule, with administrative controls for managing course availability.

## Features

*   User authentication (registration and login).
*   Course enrollment and unenrollment.
*   Admin control over course availability.
*   Weekly schedule view with 30-minute time slots.
*   Visual representation of course availability and enrollment status.
*   Backend built with TypeScript for improved type safety.
*   Dockerized for easy deployment.


## Installation and Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/whiteSHADOW1234/E-Course.git
    ```

2.  Install dependencies (in both client and server directories):

    ```bash
    cd client && npm install && cd ..
    cd server && npm install && cd ..
    ```
3. Rename `.env.example` file to `.env` and put the sensitive data inside this file.

4.  Set up environment variables (see `.env.example` files in `client` and `server` for guidance). Create `.env` files in the root directory of both the `client` and `server` folders. Add the environment variables as shown in the example files, replacing the placeholder values with your actual values.


5.  Start the development servers:

    ```bash
    cd server && npm start
    ```


**Running with Docker Compose (Recommended):**

1.  Ensure you have Docker and Docker Compose installed.
2.  Set up your `.env` file in the server directory (see `.env.example`).
3.  From the project root directory, run:

    ```bash
    docker-compose up -d --build
    ```

The application will be accessible at `http://localhost:5000`.

## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.