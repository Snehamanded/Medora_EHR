const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Audit Log
var add = async (req, res) => {
    try {
        const { userId, action, entityType, entityId, details } = req.body;

        if (!userId || !action) {
            return ReE(res, "userId and action are required", 400);
        }

        const log = await model.AuditLog.create({
            userId,
            action,
            entityType,
            entityId,
            details,
            isDeleted: false
        });

        return ReS(res, log, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Audit Logs
var fetchAll = async (req, res) => {
    try {
        const logs = await model.AuditLog.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]],
            include: [
                { model: model.User, as: "user", attributes: ["id", "name", "email"] }
            ]
        });

        return ReS(res, { success: true, data: logs }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Audit Log by ID
var fetchSingle = async (req, res) => {
    try {
        const log = await model.AuditLog.findByPk(req.params.id, {
            include: [
                { model: model.User, as: "user", attributes: ["id", "name", "email"] }
            ]
        });

        if (!log || log.isDeleted) {
            return ReE(res, "Audit log not found", 404);
        }

        return ReS(res, log, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Soft Delete an Audit Log
var updateAuditLog = async (req, res) => {
    try {
        const log = await model.AuditLog.findByPk(req.params.id);
        if (!log || log.isDeleted) {
            return ReE(res, "Audit log not found", 404);
        }

        await log.update({ isDeleted: true });
        return ReS(res, "Audit log deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAuditLog = updateAuditLog;

// ✅ Soft Delete an Announcement
var deleteAuditLog = async (req, res) => {
    try {
        const AuditLog = await model.AuditLog.findByPk(req.params.id);
        if (!AuditLog || AuditLog.isDeleted) {
            return ReE(res, "AuditLog not found", 404);
        }

        await AuditLog.update({ isDeleted: true });
        return ReS(res, "AuditLog deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAuditLog = deleteAuditLog;
