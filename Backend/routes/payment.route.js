const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/add", paymentController.add);
router.get("/list", paymentController.fetchAll);
router.get("/list/:id", paymentController.fetchSingle);
router.put("/update/:id", paymentController.updatePayment);
router.delete("/delete/:id", paymentController.deletePayment);

module.exports = router;
