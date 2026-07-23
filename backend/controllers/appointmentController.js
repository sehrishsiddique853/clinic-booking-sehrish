const db = require("../config/db");
//to book appointment by patient
const bookAppointment = (req, res) => {

    const { doctor_id, slot_id } = req.body;
    const patient_id = req.user.id;

    // Check if slot is available
    db.query(
        "SELECT * FROM slots WHERE id=? AND is_booked=FALSE",
        [slot_id],
        (err, rows) => {

            if (err)
                return res.status(500).json({ message: err.message });

            if (rows.length === 0)
                return res.status(400).json({
                    message: "Slot already booked"
                });

            // Create appointment
            db.query(
                "INSERT INTO appointments(patient_id, doctor_id, slot_id, status) VALUES(?,?,?,?)",
                [patient_id, doctor_id, slot_id, "Pending"],
                (err) => {

                    if (err)
                        return res.status(500).json({ message: err.message });

                    // Mark slot as booked
                    db.query(
                        "UPDATE slots SET is_booked=TRUE WHERE id=?",
                        [slot_id]
                    );

                    res.json({
                        message: "Appointment Booked"
                    });

                }
            );

        }
    );

};
// get all appointments for a patient
const getMyAppointments = (req, res) => {

    const patient_id = req.user.id;

    db.query(
        `SELECT appointments.id,
                doctors.name,
                slots.date,
                slots.time,
                appointments.status
         FROM appointments
         JOIN doctors ON appointments.doctor_id = doctors.id
         JOIN slots ON appointments.slot_id = slots.id
         WHERE patient_id = ?`,
        [patient_id],
        (err, rows) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json(rows);

        }
    );

};


//cancel appointment by patient
const cancelAppointment = (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE appointments SET status='Cancelled' WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            db.query(
                `UPDATE slots
                 SET is_booked = FALSE
                 WHERE id = (
                    SELECT slot_id
                    FROM appointments
                    WHERE id=?
                 )`,
                [id]
            );

            res.json({
                message: "Appointment Cancelled"
            });

        }
    );

};


//get all appointments for staff
const getAppointments = (req, res) => {

    db.query(
        `SELECT appointments.id,
                users.name AS patient,
                doctors.name AS doctor,
                slots.date,
                slots.time,
                appointments.status
         FROM appointments
         JOIN users ON appointments.patient_id = users.id
         JOIN doctors ON appointments.doctor_id = doctors.id
         JOIN slots ON appointments.slot_id = slots.id`,
        (err, rows) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json(rows);

        }
    );

};

//cancel appointment by staff
const staffCancelAppointment = (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE appointments SET status='Cancelled' WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            db.query(
                `UPDATE slots
                 SET is_booked = FALSE
                 WHERE id = (
                    SELECT slot_id
                    FROM appointments
                    WHERE id=?
                 )`,
                [id]
            );

            res.json({
                message: "Appointment Cancelled"
            });

        }
    );

};

//confirm appointment by staff
const confirmAppointment = (req, res) => {

    db.query(
        "UPDATE appointments SET status='Confirmed' WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({
                message: "Appointment Confirmed"
            });

        }
    );

};

module.exports = {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    getAppointments,
    confirmAppointment,
    staffCancelAppointment
};