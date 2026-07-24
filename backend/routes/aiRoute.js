const router = require("express").Router();
const ai = require("../controllers/aiController");

router.post("/suggest", ai.getSuggestion);

module.exports = router;