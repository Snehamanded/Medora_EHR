const express = require("express");
const router = express.Router();
const adminStatController = require("../controllers/adminstat.controller");

router.post("/add", adminStatController.add);
router.get("/list", adminStatController.fetchAll);
router.get("/list/:id", adminStatController.fetchSingle);
router.put("/update/:id", adminStatController.updateAdminStat);
router.delete("/delete/:id", adminStatController.deleteAdminStat);

module.exports = router;
