const db = require("../config/db");

// Get all available slots
const getSlots = (req, res) => {

    db.query(
        "SELECT * FROM slots WHERE is_booked = FALSE",
        (err, rows) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json(rows);

        }
    );

};

// Get all slots for a specific doctor
const getSlotsByDoctor = (req, res) => {
    db.query(
        "SELECT * FROM slots WHERE doctor_id=? AND is_booked = FALSE",
        [req.params.id],
        (err, rows) => {
            if (err)
                return res.status(500).json({ message: err.message });

            res.json(rows);
        }
    );
};

// Add slot
const addSlot = (req, res) => {

    const { doctor_id, date, time } = req.body;

    db.query(
        "INSERT INTO slots(doctor_id,date,time) VALUES(?,?,?)",
        [doctor_id, date, time],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({ message: "Slot Added" });

        }
    );

};

//update slots
const updateSlot = (req, res) => {

    const { doctor_id, date, time } = req.body;

    db.query(
        "UPDATE slots SET doctor_id=?, date=?, time=? WHERE id=?",
        [doctor_id, date, time, req.params.id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({ message: "Slot Updated" });

        }
    );

};

// Delete slot
const deleteSlot = (req, res) => {

    db.query(
        "DELETE FROM slots WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({ message: "Slot Deleted" });

        }
    );

};

module.exports = {
    getSlots,
    addSlot,
    deleteSlot,
    updateSlot,
    getSlotsByDoctor
};