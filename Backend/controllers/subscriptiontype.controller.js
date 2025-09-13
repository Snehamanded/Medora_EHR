const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Subscription Type
var add = async (req, res) => {
    try {
        const { name, description, durationDays, price } = req.body;
        if (!name || !durationDays || !price)
            return ReE(res, "name, durationDays, and price are required", 400);

        const subscriptionType = await model.SubscriptionType.create({
            name,
            description: description || null,
            durationDays,
            price
        });

        return ReS(res, subscriptionType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Subscription Types
var fetchAll = async (req, res) => {
    try {
        const types = await model.SubscriptionType.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Subscription Type by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.SubscriptionType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Subscription Type not found", 404);

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Subscription Type
var updateSubscriptionType = async (req, res) => {
    try {
        const type = await model.SubscriptionType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Subscription Type not found", 404);

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description,
            durationDays: req.body.durationDays || type.durationDays,
            price: req.body.price || type.price
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateSubscriptionType = updateSubscriptionType;

// ✅ Soft Delete a Subscription Type
var deleteSubscriptionType = async (req, res) => {
    try {
        const type = await model.SubscriptionType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Subscription Type not found", 404);

        await type.update({ isDeleted: true });
        return ReS(res, "Subscription Type deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteSubscriptionType = deleteSubscriptionType;
