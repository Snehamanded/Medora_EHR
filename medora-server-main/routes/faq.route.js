const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");

router.post("/add", faqController.add);
router.get("/list", faqController.fetchAll);
router.get("/list/:id", faqController.fetchSingle);
router.put("/update/:id", faqController.updateFaq);
router.delete("/delete/:id", faqController.deleteFaq);

module.exports = router;
