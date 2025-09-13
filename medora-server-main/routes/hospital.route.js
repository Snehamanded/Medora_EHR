const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospital.controller");

router.post("/add", hospitalController.add);
router.get("/list", hospitalController.fetchAll);
router.get("/list/:id", hospitalController.fetchSingle);
router.put("/update/:id", hospitalController.updateHospital);
router.delete("/delete/:id", hospitalController.deleteHospital);

module.exports = router;
