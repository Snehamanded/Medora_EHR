const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalrecord.controller");

router.post("/add", medicalRecordController.add);
router.get("/list", medicalRecordController.fetchAll);
router.get("/list/:id", medicalRecordController.fetchSingle);
router.put("/update/:id", medicalRecordController.updateMedicalRecord);
router.delete("/delete/:id", medicalRecordController.deleteMedicalRecord);

module.exports = router;
