# Technical Decisions

This document explains the key technical decisions made during the development of the Hospital Appointment Booking System.

---

## 1. JWT Authentication instead of Server Sessions

I chose **JWT (JSON Web Tokens)** for authentication because it enables stateless authentication. The server does not need to maintain session data, making the backend simpler and easier to scale. Each request includes the token, allowing protected routes to verify the user's identity.

---

## 2. MySQL instead of PostgreSQL

I selected **MySQL** because the application uses straightforward relational data such as users, doctors, slots, and appointments. MySQL is easy to set up, widely used, and provides all the relational features required for this project without additional complexity.

---

## 3. Local Storage instead of Cookies

JWTs are stored in **localStorage** because it is simple to implement in a small single-page application. The frontend can easily retrieve the token and include it in the `Authorization` header for protected API requests.

For a production application, **HTTP-only cookies** would be preferred because they provide better protection against XSS attacks.

---

## 4. Individual Slot Records instead of Time Ranges

Doctor availability is stored as **individual slot records** rather than storing working-hour ranges.

For example:

```
2026-07-24 09:00
2026-07-24 09:30
2026-07-24 10:00
```

This simplifies appointment booking because it allows staff to schedule for doctor without making bounded decisions.


---

## 5. Role-Based Authorization

Instead of creating separate applications for staff and patients, I implemented **role-based authorization** using middleware.

- Patients can view doctors and book appointments.
- Staff can manage doctors, slots, and appointments.

This keeps the application simple while enforcing access control.

---

## 6. REST API Architecture

The backend exposes RESTful endpoints for authentication, doctors, slots, and appointments. Each resource has its own routes and controller, making the project modular and easier to maintain.

---

## 7. Separation of Routes and Controllers

I separated **routes** from **controllers** to follow the separation of concerns principle.

- Routes define API endpoints.
- Controllers contain business logic.
- Middleware handles authentication and authorization.

This structure improves readability and makes future maintenance easier.


---

## 7. Use of Gemini API

I used gemini API as it is cost effective and even being simple fullfills the task effeciently.Its official Node.js SDK also made backend integration simple.


---
