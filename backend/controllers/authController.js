const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register
const register = (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, rows) => {

            if (err)
                return res.status(500).json({ message: err.message });

            if (rows.length > 0)
                return res.status(400).json({ message: "Email already exists" });

            bcrypt.hash(password, 10, (err, hashedPassword) => {

                if (err)
                    return res.status(500).json({ message: err.message });

                db.query(
                    "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
                    [name, email, hashedPassword, "patient"],
                    (err) => {

                        if (err)
                            return res.status(500).json({ message: err.message });

                        res.status(201).json({
                            message: "Registration Successful"
                        });

                    }
                );

            });

        }
    );

};

// Login
const login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and Password are required" });

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, rows) => {

            if (err)
                return res.status(500).json({ message: err.message });

            if (rows.length === 0)
                return res.status(404).json({ message: "User not found" });

            const user = rows[0];

            bcrypt.compare(password, user.password, (err, match) => {

                if (err)
                    return res.status(500).json({ message: err.message });

                if (!match)
                    return res.status(401).json({ message: "Invalid Password" });

                const token = jwt.sign(
                    {
                        id: user.id,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );

                res.json({
                    message: "Login Successful",
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    }
                });

            });

        }
    );

};

module.exports = {
    register,
    login
};