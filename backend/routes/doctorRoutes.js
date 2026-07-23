const router = require("express").Router();
const doctor = require("../controllers/doctorController");

const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router.get("/", doctor.getDoctors);
router.get("/:id", doctor.getDoctorById);
router.post("/", verifyToken, checkRole("staff"), doctor.addDoctor);
router.put("/:id", verifyToken, checkRole("staff"), doctor.updateDoctor);
router.delete("/:id", verifyToken, checkRole("staff"), doctor.deleteDoctor);

module.exports = router;