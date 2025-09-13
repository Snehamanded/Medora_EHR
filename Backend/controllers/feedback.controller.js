const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Feedback
var add = async (req, res) => {
    try {
        const { uid, message, rating } = req.body;
        if (!uid || !message) 
            return ReE(res, "uid and message are required", 400);

        const feedback = await model.Feedback.create({
            uid,
            message,
            rating: rating || null
        });

        return ReS(res, feedback, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Feedbacks
var fetchAll = async (req, res) => {
    try {
        const feedbacks = await model.Feedback.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: feedbacks }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Feedback by ID
var fetchSingle = async (req, res) => {
    try {
        const feedback = await model.Feedback.findByPk(req.params.id);
        if (!feedback || feedback.isDeleted) return ReE(res, "Feedback not found", 404);

        return ReS(res, feedback, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Feedback
var updateFeedback = async (req, res) => {
    try {
        const feedback = await model.Feedback.findByPk(req.params.id);
        if (!feedback || feedback.isDeleted) return ReE(res, "Feedback not found", 404);

        await feedback.update({
            message: req.body.message || feedback.message,
            rating: req.body.rating || feedback.rating
        });

        return ReS(res, feedback, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateFeedback = updateFeedback;

// ✅ Soft Delete a Feedback
var deleteFeedback = async (req, res) => {
    try {
        const feedback = await model.Feedback.findByPk(req.params.id);
        if (!feedback || feedback.isDeleted) return ReE(res, "Feedback not found", 404);

        await feedback.update({ isDeleted: true });
        return ReS(res, "Feedback deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteFeedback = deleteFeedback;
