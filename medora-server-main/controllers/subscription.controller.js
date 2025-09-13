const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Subscription
var add = async (req, res) => {
    try {
        const { userId, subscriptionTypeId, startDate, endDate, status } = req.body;
        if (!userId || !subscriptionTypeId || !startDate || !endDate)
            return ReE(res, "userId, subscriptionTypeId, startDate, and endDate are required", 400);

        const subscription = await model.Subscription.create({
            userId,
            subscriptionTypeId,
            startDate,
            endDate,
            status: status || "active"
        });

        return ReS(res, subscription, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Subscriptions
var fetchAll = async (req, res) => {
    try {
        const subscriptions = await model.Subscription.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: subscriptions }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Subscription by ID
var fetchSingle = async (req, res) => {
    try {
        const subscription = await model.Subscription.findByPk(req.params.id);
        if (!subscription || subscription.isDeleted) return ReE(res, "Subscription not found", 404);

        return ReS(res, subscription, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Subscription
var updateSubscription = async (req, res) => {
    try {
        const subscription = await model.Subscription.findByPk(req.params.id);
        if (!subscription || subscription.isDeleted) return ReE(res, "Subscription not found", 404);

        await subscription.update({
            userId: req.body.userId || subscription.userId,
            subscriptionTypeId: req.body.subscriptionTypeId || subscription.subscriptionTypeId,
            startDate: req.body.startDate || subscription.startDate,
            endDate: req.body.endDate || subscription.endDate,
            status: req.body.status || subscription.status
        });

        return ReS(res, subscription, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateSubscription = updateSubscription;

// ✅ Soft Delete a Subscription
var deleteSubscription = async (req, res) => {
    try {
        const subscription = await model.Subscription.findByPk(req.params.id);
        if (!subscription || subscription.isDeleted) return ReE(res, "Subscription not found", 404);

        await subscription.update({ isDeleted: true });
        return ReS(res, "Subscription deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteSubscription = deleteSubscription;
