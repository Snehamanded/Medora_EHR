const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Notification
var add = async (req, res) => {
    try {
        const { userId, title, message, typeId, read } = req.body;
        if (!userId || !title || !message) 
            return ReE(res, "userId, title, and message are required", 400);

        const notification = await model.Notification.create({
            userId,
            title,
            message,
            typeId: typeId || null,
            read: read || false
        });

        return ReS(res, notification, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Notifications
var fetchAll = async (req, res) => {
    try {
        const notifications = await model.Notification.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: notifications }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Notification by ID
var fetchSingle = async (req, res) => {
    try {
        const notification = await model.Notification.findByPk(req.params.id);
        if (!notification || notification.isDeleted) return ReE(res, "Notification not found", 404);

        return ReS(res, notification, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Notification
var updateNotification = async (req, res) => {
    try {
        const notification = await model.Notification.findByPk(req.params.id);
        if (!notification || notification.isDeleted) return ReE(res, "Notification not found", 404);

        await notification.update({
            title: req.body.title || notification.title,
            message: req.body.message || notification.message,
            typeId: req.body.typeId || notification.typeId,
            read: req.body.read !== undefined ? req.body.read : notification.read
        });

        return ReS(res, notification, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateNotification = updateNotification;

// ✅ Soft Delete a Notification
var deleteNotification = async (req, res) => {
    try {
        const notification = await model.Notification.findByPk(req.params.id);
        if (!notification || notification.isDeleted) return ReE(res, "Notification not found", 404);

        await notification.update({ isDeleted: true });
        return ReS(res, "Notification deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteNotification = deleteNotification;
