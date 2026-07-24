require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));  
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/ai", require("./routes/aiRoute"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});