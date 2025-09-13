const express = require("express");
const router = express.Router();
const geminiController = require("../controllers/gemini.controller");

// ✅ Analyze text using Gemini
router.post("/analyze", geminiController.analyzeText);

module.exports = router;
