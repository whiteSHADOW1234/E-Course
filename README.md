# E-Course Enrollment System

A simple course enrollment web application built with the MERN stack (MongoDB, Express, React, Node.js).

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

## Technologies Used

* **Frontend:** React, TypeScript, HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js, TypeScript, MongoDB
* **Database:** MongoDB Atlas (or local MongoDB)
* **Containerization:** Docker, Docker Compose
* **Testing:** Jest
* **CI/CD:** GitHub Actions

## Installation and Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/mern-course-enrollment.git
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
    cd client && npm start && cd ..
    cd server && npm run dev && cd ..
    ```


**Running with Docker Compose (Recommended):**

1.  Ensure you have Docker and Docker Compose installed.
2.  Set up your `.env` file in the server directory (see `.env.example`).
3.  From the project root directory, run:

    ```bash
    docker-compose up -d --build
    ```

The application will be accessible at `http://localhost:3000`.

## Testing

*   **Frontend:** `cd client && npm test`
*   **Backend:** `cd server && npm test`



## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.