const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.post("/add", adminController.add);
router.get("/list", adminController.fetchAll);
router.get("/list/:id", adminController.fetchSingle);
router.put("/update/:id", adminController.updateAdmin);
router.delete("/delete/:id", adminController.deleteAdmin);

module.exports = router;
