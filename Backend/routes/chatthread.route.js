const express = require("express");
const router = express.Router();
const chatThreadController = require("../controllers/chatthread.controller");

router.post("/add", chatThreadController.add);
router.get("/list", chatThreadController.fetchAll);
router.get("/list/:id", chatThreadController.fetchSingle);
router.put("/update/:id", chatThreadController.updateChatThread);
router.delete("/delete/:id", chatThreadController.deleteChatThread);

module.exports = router;
