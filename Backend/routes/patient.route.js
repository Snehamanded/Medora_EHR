const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");

router.post("/add", patientController.add);
router.get("/list", patientController.fetchAll);
router.get("/list/:id", patientController.fetchSingle);
router.put("/update/:id", patientController.updatePatient);
router.delete("/delete/:id", patientController.deletePatient);

module.exports = router;
