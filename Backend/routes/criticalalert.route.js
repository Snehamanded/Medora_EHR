const express = require("express");
const router = express.Router();
const criticalAlertController = require("../controllers/criticalalert.controller");

router.post("/add", criticalAlertController.add);
router.get("/list", criticalAlertController.fetchAll);
router.get("/list/:id", criticalAlertController.fetchSingle);
router.put("/update/:id", criticalAlertController.updateCriticalAlert);
router.delete("/delete/:id", criticalAlertController.deleteCriticalAlert);

module.exports = router;
