const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicine.controller");

router.post("/add", medicineController.add);
router.get("/list", medicineController.fetchAll);
router.get("/list/:id", medicineController.fetchSingle);
router.put("/update/:id", medicineController.updateMedicine);
router.delete("/delete/:id", medicineController.deleteMedicine);

module.exports = router;
