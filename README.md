# Backend for Nextdek Assignment

## Overview
This is the backend service for the Nextdek Assignment project. It provides RESTful APIs to manage users and notes, including authentication and CRUD operations. The backend is built using Node.js and Express.js, with MongoDB as the database.

## Features
- User authentication (login and registration)
- CRUD operations for notes
- Middleware for authentication
- Modular structure for scalability

## Project Structure
```
Backend/
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── src/                  # Source code
│   ├── app.js            # Main application entry point
│   ├── constants.js      # Application constants
│   ├── index.js          # Server setup
│   ├── controllers/      # Controllers for handling requests
│   │   ├── notes.controllers.js
│   │   └── user.controllers.js
│   ├── db/               # Database connection
│   │   └── index.js
│   ├── middlewares/      # Middleware functions
│   │   └── auth.middlewares.js
│   ├── models/           # Mongoose models
│   │   ├── notes.models.js
│   │   └── user.models.js
│   └── routes/           # API routes
│       ├── notes.routes.js
│       └── user.routes.js
```

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Create a `.env` file in the `Backend` directory.
2. Add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

## Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. The server will run at `http://localhost:5000` by default.

## API Endpoints
### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

### Notes Routes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Scripts
- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload

## License
This project is licensed under the Learner's License.