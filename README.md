# clinic-booking-sehrish

----
# Tech Stack

### Frontend

- React
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- CORS

---

# Project Structure

```
clinic-booking-system
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── .env
│   └── server.js
```

---
# Architecture

The application follows a **three-tier architecture**, separating the presentation, application, and data layers.

### Presentation Layer (Client)

Built with **React**, this layer provides the user interface, handles user interactions, and communicates with the backend through REST APIs using Axios.

### Application Layer (Server)

Built with **Node.js** and **Express**, this layer contains the business logic. Routes receive requests, controllers process them, middleware handles authentication and authorization, and responses are returned as JSON.

### Data Layer (Database)

**MySQL** stores users, doctors, slots, and appointments. Foreign key relationships are used to maintain data integrity.

### Flow
Frontend--->axios---->express.js---->route matching---->middleware---->controller---->database---->controller----->express.js---->axios---->frontend



### Design Decisions

- React is used for the frontend UI.
- Express provides REST APIs.
- MySQL stores relational data (users, doctors, slots, appointments).
- JWT is used for stateless authentication.
- bcrypt hashes passwords before storing them.
- Routes, controllers, and middleware are separated for better maintainability.

---

# Setup and Run Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/sehrishsiddique853/clinic-booking-sehrish.git
cd clinic-booking-sehrish
```

---

## 2. Backend Setup

Navigate to the server folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using the values from `.env.example`.

Start the backend server:

```bash
npm start
```

The backend will run on:

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal and navigate to the client folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```
# Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_db

JWT_SECRET=your_secret_key
```

---

# .env.example

```env
PORT=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
```

---
# Database Schema

## Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | Unique user ID |
| name | VARCHAR(100) | User full name |
| email | VARCHAR(150) | Unique email address |
| password | VARCHAR(255) | Hashed password |
| role | ENUM('patient','staff') | User role |

---

## Doctors Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | Unique doctor ID |
| name | VARCHAR(100) | Doctor name |
| specialization | VARCHAR(100) | Doctor specialization |
| info | TEXT | Additional doctor information |

---

## Slots Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | Unique slot ID |
| doctor_id | INT (FK) | References `doctors.id` |
| date | DATE | Appointment date |
| time | TIME | Appointment time |
| is_booked | BOOLEAN | Slot booking status |

---

## Appointments Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | Unique appointment ID |
| patient_id | INT (FK) | References `users.id` |
| doctor_id | INT (FK) | References `doctors.id` |
| slot_id | INT (FK) | References `slots.id` |
| status | ENUM('pending','confirmed','cancelled') | Appointment status |

---

# Table Relationships

- **Doctor → Slots** : One-to-Many (1:N)
- **Doctor → Appointments** : One-to-Many (1:N)
- **User (Patient) → Appointments** : One-to-Many (1:N)
- **Slot → Appointment** : One-to-One (1:1) *(a slot can be booked by at most one appointment)*
---

## Database Design Notes

- A **user** can be either a **patient** or **staff**, determined by the `role` field.
- A **doctor** can have multiple available slots.
- Each **slot** belongs to one doctor.
- A **patient** can book multiple appointments.
- Each **appointment** links one patient, one doctor, and one slot.
- Foreign keys with **ON DELETE CASCADE** automatically remove related slots and appointments when a doctor or user is deleted, maintaining referential integrity.
---

# API Overview

## Authentication

```
- POST /api/auth/register
- POST /api/auth/login
```

## Doctors

```
- GET /api/doctors
- GET /api/doctors/:id
- POST /api/doctors
- PUT /api/doctors/:id
- DELETE /api/doctors/:id
```

## Slots

```
GET /api/slots
GET /api/slots/:id
POST /api/slots
PUT /api/slots/:id
DELETE /api/slots/:id
```

## Appointments

```
POST /api/appointments
GET /api/appointments/my
GET /api/appointments
DELETE /api/appointments/:id
PATCH /api/appointments/:id/confirm
PATCH /api/appointments/:id/cancel
```

---

# Authentication

JWT tokens are returned after successful login.

Protected endpoints require:

```
Authorization: Bearer <token>
```

Staff-only operations are protected using role-based middleware.

---

# Key Technology Choices

### React

Used for building reusable UI components and client-side routing.

### Express

Used to expose REST APIs for frontend communication.

### MySQL

Chosen because the application manages relational data such as doctors, appointments, and slots.

### Axios

Used for making HTTP requests from React to Express.

### JWT

Provides stateless authentication without storing server-side sessions.

### bcrypt

Hashes passwords before storing them in the database.

---

# Current Limitations

This project is intentionally minimal and has a few limitations:

- Logout implementation
- AI recommendation implementation on frontend
- geting doctor by searching

---

