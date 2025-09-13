const express = require("express");
const router = express.Router();
const adminTypeController = require("../controllers/admintype.controller");

router.post("/add", adminTypeController.add);
router.get("/list", adminTypeController.fetchAll);
router.get("/list/:id", adminTypeController.fetchSingle);
router.put("/update/:id", adminTypeController.updateAdminType);
router.delete("/delete/:id", adminTypeController.deleteAdminType);

module.exports = router;
