const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Notification Type
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "name is required", 400);

        const notificationType = await model.NotificationType.create({
            name,
            description: description || null
        });

        return ReS(res, notificationType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Notification Types
var fetchAll = async (req, res) => {
    try {
        const types = await model.NotificationType.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Notification Type by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.NotificationType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Notification Type not found", 404);

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Notification Type
var updateNotificationType = async (req, res) => {
    try {
        const type = await model.NotificationType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Notification Type not found", 404);

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateNotificationType = updateNotificationType;

// ✅ Soft Delete a Notification
var deleteNotificationType = async (req, res) => {
    try {
        const notificationType = await model.NotificationType.findByPk(req.params.id);
        if (!notificationType || notificationType.isDeleted) return ReE(res, "Notification not found", 404);

        await notificationType.update({ isDeleted: true });
        return ReS(res, "Notification deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteNotificationType = deleteNotificationType;