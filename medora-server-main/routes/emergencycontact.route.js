const express = require("express");
const router = express.Router();
const emergencyContactController = require("../controllers/emergencycontact.controller");

router.post("/add", emergencyContactController.add);
router.get("/list", emergencyContactController.fetchAll);
router.get("/list/:id", emergencyContactController.fetchSingle);
router.put("/update/:id", emergencyContactController.updateEmergencyContact);
router.delete("/delete/:id", emergencyContactController.deleteEmergencyContact);

module.exports = router;
