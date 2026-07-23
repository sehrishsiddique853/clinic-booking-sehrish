const db = require("../config/db");

// Get all doctors
const getDoctors = (req, res) => {

    db.query("SELECT * FROM doctors", (err, rows) => {

        if (err)
            return res.status(500).json({ message: err.message });

        res.json(rows);

    });

};

//get doctor by id
const getDoctorById = (req, res) => {
    db.query(
        "SELECT * FROM doctors WHERE id=?",
        [req.params.id],
        (err, rows) => {
            if (err)
                return res.status(500).json({ message: err.message });

            if (rows.length === 0)
                return res.status(404).json({ message: "Doctor not found" });

            res.json(rows[0]);
        }
    );
};

// Add doctor
const addDoctor = (req, res) => {

    const { name, specialization, info } = req.body;

    db.query(
        "INSERT INTO doctors(name,specialization,info) VALUES(?,?,?)",
        [name, specialization, info],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({ message: "Doctor Added" });

        }
    );

};

// Update doctor
const updateDoctor = (req, res) => {

    const { id } = req.params;
    const { name, specialization, info } = req.body;

    db.query(
        "UPDATE doctors SET name=?, specialization=?, info=? WHERE id=?",
        [name, specialization, info, id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({ message: "Doctor Updated" });

        }
    );

};

// Delete doctor
const deleteDoctor = (req, res) => {

    db.query(
        "DELETE FROM doctors WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json({ message: err.message });

            res.json({ message: "Doctor Deleted" });

        }
    );

};

module.exports = {
    getDoctors,
    getDoctorById,
    addDoctor,
    updateDoctor,
    deleteDoctor
};