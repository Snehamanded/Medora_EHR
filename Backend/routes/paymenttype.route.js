const express = require("express");
const router = express.Router();
const paymentTypeController = require("../controllers/paymenttype.controller");

router.post("/add", paymentTypeController.add);
router.get("/list", paymentTypeController.fetchAll);
router.get("/list/:id", paymentTypeController.fetchSingle);
router.put("/update/:id", paymentTypeController.updatePaymentType);
router.delete("/delete/:id", paymentTypeController.deletePaymentType);

module.exports = router;
