const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availability.controller");

router.post("/add", availabilityController.add);
router.get("/list", availabilityController.fetchAll);
router.get("/list/:id", availabilityController.fetchSingle);
router.put("/update/:id", availabilityController.updateAvailability);
router.delete("/delete/:id", availabilityController.deleteAvailability);

module.exports = router;
