const express = require("express");
const router = express.Router();
const engagementLogController = require("../controllers/engagementlog.controller");

router.post("/add", engagementLogController.add);
router.get("/list", engagementLogController.fetchAll);
router.get("/list/:id", engagementLogController.fetchSingle);
router.put("/update/:id", engagementLogController.updateEngagementLog);
router.delete("/delete/:id", engagementLogController.deleteEngagementLog);

module.exports = router;
