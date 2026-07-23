CREATE DATABASE IF NOT EXISTS clinic_booking;

USE clinic_booking;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('patient','staff') NOT NULL
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    info TEXT
);

CREATE TABLE slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (doctor_id)
    REFERENCES doctors(id)
    ON DELETE CASCADE
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    slot_id INT NOT NULL,
    status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',

    FOREIGN KEY(patient_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY(doctor_id)
    REFERENCES doctors(id)
    ON DELETE CASCADE,

    FOREIGN KEY(slot_id)
    REFERENCES slots(id)
    ON DELETE CASCADE
);