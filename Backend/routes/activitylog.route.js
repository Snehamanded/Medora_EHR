const express = require("express");
const router = express.Router();
const activityLogController = require("../controllers/activitylog.controller");

router.post("/add", activityLogController.add);
router.get("/list", activityLogController.fetchAll);
router.get("/list/:id", activityLogController.fetchSingle);
router.put("/update/:id", activityLogController.updateActivityLog);
router.delete("/delete/:id", activityLogController.deleteActivityLog);

module.exports = router;
