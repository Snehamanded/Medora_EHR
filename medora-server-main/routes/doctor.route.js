const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");

router.post("/add", doctorController.add);
router.get("/list", doctorController.fetchAll);
router.get("/list/:id", doctorController.fetchSingle);
router.put("/update/:id", doctorController.updateDoctor);
router.delete("/delete/:id", doctorController.deleteDoctor);

module.exports = router;
