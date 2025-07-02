# Project Management Backend

This is the backend for the Project Management Application, built with NestJS, Socket.IO, and MongoDB.

## Features

- User Authentication (Login/Registration) with JWT
- Role-Based Access Control (Admin/Viewer)
- CRUD Operations for Projects
- Real-time Notifications for Project Changes using Socket.IO

## Technologies Used

- NestJS (Node.js Framework)
- MongoDB (via Mongoose)
- Socket.IO
- bcrypt (for password hashing)
- Passport.js (for authentication)
- JWT (JSON Web Tokens)

## Setup Instructions

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repo-url>
    cd project-management-backend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **MongoDB Setup**:
    - Ensure you have MongoDB installed and running on your machine.
    - The application expects MongoDB to be running on `mongodb://localhost:27017` with a database named `project_management_db`.
    - If your MongoDB instance is different, update the `MONGO_URI` in the `.env` file accordingly.

4.  **Environment Variables**:
    - Create a `.env` file in the root of the `project-management-backend` directory.
    - Add the following variables:
      ```
      MONGO_URI=mongodb://localhost:27017/project_management_db
      JWT_SECRET=supersecretkey
      ```
      (You can change `supersecretkey` to a more secure secret in a production environment.)

5.  **Run the Application**:
    ```bash
    npm run start:dev
    ```
    The backend server will start on `http://localhost:3000`.

## API Endpoints

The API endpoints are available at `http://localhost:3000`.

### Authentication

-   **`POST /auth/register`**
    -   Registers a new user.
    -   **Body**: `{"username": "string", "password": "string", "role": "Admin" | "Viewer"}`
    -   **Example**: `{"username": "admin", "password": "password123", "role": "Admin"}`

-   **`POST /auth/login`**
    -   Logs in a user and returns a JWT access token.
    -   **Body**: `{"username": "string", "password": "string"}`
    -   **Example**: `{"username": "admin", "password": "password123"}`
    -   **Response**: `{"access_token": "your_jwt_token"}`

### Projects (Requires JWT in `Authorization: Bearer <token>` header)

-   **`POST /projects`**
    -   **Role**: Admin
    -   Creates a new project.
    -   **Body**: `{"name": "string", "description": "string"}`

-   **`GET /projects`**
    -   **Role**: Admin, Viewer
    -   Retrieves all projects.

-   **`GET /projects/:id`**
    -   **Role**: Admin, Viewer
    -   Retrieves a single project by ID.

-   **`PUT /projects/:id`**
    -   **Role**: Admin
    -   Updates an existing project by ID.
    -   **Body**: `{"name": "string", "description": "string"}` (partial updates allowed)

-   **`DELETE /projects/:id`**
    -   **Role**: Admin
    -   Deletes a project by ID.

## Real-time Notifications (Socket.IO)

The backend uses Socket.IO to send real-time notifications to connected clients when project data changes (create, update, delete).

-   **Socket.IO Endpoint**: `ws://localhost:3000`
-   **Event to Listen For**: `projectUpdate`
-   **Message Format**: A string indicating the change (e.g., "Project 'X' was created.", "Project 'Y' was updated.", "Project 'Z' was deleted.")

### Example Client-side (JavaScript)

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('projectUpdate', (message) => {
  console.log('Project Update Notification:', message);
  // Display this message in your frontend (e.g., as a toast notification)
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});
```