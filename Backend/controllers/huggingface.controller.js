const axios = require("axios");
const { ReE, ReS } = require("../services/util.service.js");

const HUGGINGFACE_API_URL = process.env.HUGGINGFACE_API_URL; // e.g., BioBERT inference URL
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

// ✅ Call Hugging Face BioBERT
var analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return ReE(res, "Text is required", 400);

        const response = await axios.post(
            HUGGINGFACE_API_URL,
            { inputs: text },
            { headers: { "Authorization": `Bearer ${HUGGINGFACE_API_KEY}` } }
        );

        return ReS(res, { success: true, result: response.data }, 200);
    } catch (error) {
        return ReE(res, error.response?.data || error.message, 500);
    }
};

module.exports.analyzeText = analyzeText;
