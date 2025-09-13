const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Announcement
var add = async (req, res) => {
    try {
        const { title, message, createdBy } = req.body;

        if (!title || !message) {
            return ReE(res, "Title and message are required", 400);
        }

        const announcement = await model.Announcement.create({
            title,
            message,
            createdBy, // FK → Admin/User who created
            isDeleted: false
        });

        return ReS(res, announcement, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Announcements
var fetchAll = async (req, res) => {
    try {
        const announcements = await model.Announcement.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]],
            include: [
                { model: model.Admin, as: "creator", attributes: ["id", "name", "email"] }
            ]
        });
        return ReS(res, { success: true, data: announcements }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Announcement by ID
var fetchSingle = async (req, res) => {
    try {
        const announcement = await model.Announcement.findByPk(req.params.id, {
            include: [
                { model: model.Admin, as: "creator", attributes: ["id", "name", "email"] }
            ]
        });

        if (!announcement || announcement.isDeleted) {
            return ReE(res, "Announcement not found", 404);
        }

        return ReS(res, announcement, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Announcement
var updateAnnouncement = async (req, res) => {
    try {
        const announcement = await model.Announcement.findByPk(req.params.id);
        if (!announcement || announcement.isDeleted) {
            return ReE(res, "Announcement not found", 404);
        }

        await announcement.update({
            title: req.body.title || announcement.title,
            message: req.body.message || announcement.message
        });

        return ReS(res, announcement, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAnnouncement = updateAnnouncement;

// ✅ Soft Delete an Announcement
var deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await model.Announcement.findByPk(req.params.id);
        if (!announcement || announcement.isDeleted) {
            return ReE(res, "Announcement not found", 404);
        }

        await announcement.update({ isDeleted: true });
        return ReS(res, "Announcement deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAnnouncement = deleteAnnouncement;
