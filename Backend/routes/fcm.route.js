const express = require("express");
const router = express.Router();
const fcmMiddleware = require("../middleware/fcm.middleware");
const authMiddleware = require("../middleware/auth.middleware");

// Save token from frontend
router.post("/save-token", authMiddleware.verifyToken, fcmMiddleware.saveTokenMiddleware);

// Send single notification
router.post("/send-single", authMiddleware.verifyToken, fcmMiddleware.sendNotificationMiddleware);

// Send bulk notification
router.post("/send-bulk", authMiddleware.verifyToken, fcmMiddleware.sendBulkNotificationMiddleware);

module.exports = router;
