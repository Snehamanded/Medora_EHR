const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

router.post("/add", appointmentController.add);
router.get("/list", appointmentController.fetchAll);
router.get("/list/:id", appointmentController.fetchSingle);
router.put("/update/:id", appointmentController.updateAppointment);
router.delete("/delete/:id", appointmentController.deleteAppointment);

module.exports = router;
