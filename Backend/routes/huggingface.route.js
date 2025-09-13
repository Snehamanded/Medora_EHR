const express = require("express");
const router = express.Router();
const huggingfaceController = require("../controllers/huggingface.controller");

// ✅ Analyze text using Hugging Face BioBERT
router.post("/analyze", huggingfaceController.analyzeText);

module.exports = router;
