const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");

router.post("/add", announcementController.add);
router.get("/list", announcementController.fetchAll);
router.get("/list/:id", announcementController.fetchSingle);
router.put("/update/:id", announcementController.updateAnnouncement);
router.delete("/delete/:id", announcementController.deleteAnnouncement);

module.exports = router;
