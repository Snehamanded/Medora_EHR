const express = require("express");
const router = express.Router();
const notificationTypeController = require("../controllers/notificationtype.controller");

router.post("/add", notificationTypeController.add);
router.get("/list", notificationTypeController.fetchAll);
router.get("/list/:id", notificationTypeController.fetchSingle);
router.put("/update/:id", notificationTypeController.updateNotificationType);
router.delete("/delete/:id", notificationTypeController.deleteNotificationType);

module.exports = router;
