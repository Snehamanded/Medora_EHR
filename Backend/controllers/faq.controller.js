const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new FAQ
var add = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) 
            return ReE(res, "question and answer are required", 400);

        const faq = await model.FAQ.create({
            question,
            answer
        });

        return ReS(res, faq, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all FAQs
var fetchAll = async (req, res) => {
    try {
        const faqs = await model.FAQ.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: faqs }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single FAQ by ID
var fetchSingle = async (req, res) => {
    try {
        const faq = await model.FAQ.findByPk(req.params.id);
        if (!faq || faq.isDeleted) return ReE(res, "FAQ not found", 404);

        return ReS(res, faq, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a FAQ
var updateFaq = async (req, res) => {
    try {
        const faq = await model.FAQ.findByPk(req.params.id);
        if (!faq || faq.isDeleted) return ReE(res, "FAQ not found", 404);

        await faq.update({
            question: req.body.question || faq.question,
            answer: req.body.answer || faq.answer
        });

        return ReS(res, faq, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateFaq = updateFaq;

// ✅ Soft Delete a FAQ
var deleteFaq = async (req, res) => {
    try {
        const faq = await model.FAQ.findByPk(req.params.id);
        if (!faq || faq.isDeleted) return ReE(res, "FAQ not found", 404);

        await faq.update({ isDeleted: true });
        return ReS(res, "FAQ deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteFaq = deleteFaq;
