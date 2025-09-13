const express = require("express");
const router = express.Router();
const billingRecordController = require("../controllers/billingrecord.controller");

router.post("/add", billingRecordController.add);
router.get("/list", billingRecordController.fetchAll);
router.get("/list/:id", billingRecordController.fetchSingle);
router.put("/update/:id", billingRecordController.updateBillingRecord);
router.delete("/delete/:id", billingRecordController.deleteBillingRecord);

module.exports = router;
