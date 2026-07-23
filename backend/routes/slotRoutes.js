const router = require("express").Router();
const slot = require("../controllers/slotController");

const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router.get("/", slot.getSlots);
router.get("/:id", slot.getSlotsByDoctor);
router.post("/", verifyToken, checkRole("staff"), slot.addSlot);
router.delete("/:id", verifyToken, checkRole("staff"), slot.deleteSlot);
router.put("/:id", verifyToken, checkRole("staff"), slot.updateSlot);

module.exports = router;