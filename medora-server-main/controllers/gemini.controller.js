const axios = require("axios");
const { ReE, ReS } = require("../services/util.service.js");

const GEMINI_API_URL = process.env.GEMINI_API_URL; // Gemini inference endpoint
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ✅ Call Gemini NLP model
var analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return ReE(res, "Text is required", 400);

        const response = await axios.post(
            GEMINI_API_URL,
            { input: text },
            { headers: { "Authorization": `Bearer ${GEMINI_API_KEY}` } }
        );

        return ReS(res, { success: true, result: response.data }, 200);
    } catch (error) {
        return ReE(res, error.response?.data || error.message, 500);
    }
};

module.exports.analyzeText = analyzeText;
