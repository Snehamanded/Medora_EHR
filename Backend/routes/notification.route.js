const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.post("/add", notificationController.add);
router.get("/list", notificationController.fetchAll);
router.get("/list/:id", notificationController.fetchSingle);
router.put("/update/:id", notificationController.updateNotification);
router.delete("/delete/:id", notificationController.deleteNotification);

module.exports = router;
