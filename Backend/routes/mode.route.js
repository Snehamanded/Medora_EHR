const express = require("express");
const router = express.Router();
const modeController = require("../controllers/mode.controller");

router.post("/add", modeController.add);
router.get("/list", modeController.fetchAll);
router.get("/list/:id", modeController.fetchSingle);
router.put("/update/:id", modeController.updateMode);
router.delete("/delete/:id", modeController.deleteMode);

module.exports = router;
