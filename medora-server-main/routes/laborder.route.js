const express = require("express");
const router = express.Router();
const labOrderController = require("../controllers/laborder.controller");

router.post("/add", labOrderController.add);
router.get("/list", labOrderController.fetchAll);
router.get("/list/:id", labOrderController.fetchSingle);
router.put("/update/:id", labOrderController.updateLabOrder);
router.delete("/delete/:id", labOrderController.deleteLabOrder);

module.exports = router;
