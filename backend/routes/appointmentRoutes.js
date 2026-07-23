const router = require("express").Router();

const appointment = require("../controllers/appointmentController");

const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router.post(
    "/",
    verifyToken,
    checkRole("patient"),
    appointment.bookAppointment
);


router.get(
    "/my",
    verifyToken,
    checkRole("patient"),
    appointment.getMyAppointments
);

router.get(
    "/",
    verifyToken,
    checkRole("staff"),
    appointment.getAppointments
);

router.delete(
    "/:id",
    verifyToken,
    checkRole("patient"),
    appointment.cancelAppointment
);

router.patch(
    "/:id/confirm",
    verifyToken,
    checkRole("staff"),
    appointment.confirmAppointment
);

router.patch(
    "/:id/cancel",
    verifyToken,
    checkRole("staff"),
    appointment.staffCancelAppointment
);

module.exports = router;