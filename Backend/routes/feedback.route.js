const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.controller");

router.post("/add", feedbackController.add);
router.get("/list", feedbackController.fetchAll);
router.get("/list/:id", feedbackController.fetchSingle);
router.put("/update/:id", feedbackController.updateFeedback);
router.delete("/delete/:id", feedbackController.deleteFeedback);

module.exports = router;
