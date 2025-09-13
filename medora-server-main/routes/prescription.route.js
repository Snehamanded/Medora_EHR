const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescription.controller");

router.post("/add", prescriptionController.add);
router.get("/list", prescriptionController.fetchAll);
router.get("/list/:id", prescriptionController.fetchSingle);
router.put("/update/:id", prescriptionController.updatePrescription);
router.delete("/delete/:id", prescriptionController.deletePrescription);

module.exports = router;
