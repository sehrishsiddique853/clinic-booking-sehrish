USE clinic_booking;


INSERT INTO users(name,email,password,role)
VALUES
(
'Admin',
'admin@gmail.com',
'$2b$10$4d.qlyEIVO6gf5Kg6kWlyOpeQGknHo5E1MPH8a6MJELmyGQuIbYQO',
'staff'
);

INSERT INTO doctors(name,specialization,info)
VALUES

('Dr Ahmed','General Medicine','Experienced physician'),
('Dr Sara','Cardiology','Heart specialist'),
('Dr Ali','Dermatology','Skin specialist'),
('Dr Fatima','Neurology','Brain and nerve specialist'),
('Dr Hassan','Orthopedics','Bone specialist');



INSERT INTO slots(doctor_id,date,time,is_booked)
VALUES

(1,'2026-07-25','09:00:00',FALSE),
(1,'2026-07-25','10:00:00',FALSE),
(1,'2026-07-25','11:00:00',FALSE),
(1,'2026-07-26','09:00:00',FALSE),

(2,'2026-07-25','09:30:00',FALSE),
(2,'2026-07-25','10:30:00',FALSE),
(2,'2026-07-26','11:00:00',FALSE),
(2,'2026-07-26','12:00:00',FALSE),

(3,'2026-07-25','01:00:00',FALSE),
(3,'2026-07-25','02:00:00',FALSE),
(3,'2026-07-26','03:00:00',FALSE),
(3,'2026-07-26','04:00:00',FALSE),

(4,'2026-07-25','09:00:00',FALSE),
(4,'2026-07-26','10:00:00',FALSE),
(4,'2026-07-27','11:00:00',FALSE),

(5,'2026-07-25','02:00:00',FALSE),
(5,'2026-07-26','03:00:00',FALSE),
(5,'2026-07-27','04:00:00',FALSE),
(5,'2026-07-28','05:00:00',FALSE),
(5,'2026-07-29','06:00:00',FALSE);