const express = require("express");
const router = express.Router();
const patientTypeController = require("../controllers/patienttype.controller");

router.post("/add", patientTypeController.add);
router.get("/list", patientTypeController.fetchAll);
router.get("/list/:id", patientTypeController.fetchSingle);
router.put("/update/:id", patientTypeController.updatePatientType);
router.delete("/delete/:id", patientTypeController.deletePatientType);

module.exports = router;
