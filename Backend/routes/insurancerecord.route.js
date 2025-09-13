const express = require("express");
const router = express.Router();
const insuranceRecordController = require("../controllers/insurancerecord.controller");

router.post("/add", insuranceRecordController.add);
router.get("/list", insuranceRecordController.fetchAll);
router.get("/list/:id", insuranceRecordController.fetchSingle);
router.put("/update/:id", insuranceRecordController.updateInsuranceRecord);
router.delete("/delete/:id", insuranceRecordController.deleteInsuranceRecord);

module.exports = router;
