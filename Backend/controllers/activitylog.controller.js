const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Activity Log
var add = async (req, res) => {
    try {
        const { userId, action, description } = req.body;
        if (!userId || !action) return ReE(res, "userId and action are required", 400);

        const activityLog = await model.ActivityLog.create({
            userId,
            action,
            description
        });
        return ReS(res, activityLog, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Activity Logs
var fetchAll = async (req, res) => {
    try {
        const logs = await model.ActivityLog.findAll({
            where: { isDeleted: false }
        });
        return ReS(res, { success: true, data: logs }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Activity Log by ID
var fetchSingle = async (req, res) => {
    try {
        const log = await model.ActivityLog.findByPk(req.params.id);
        if (!log) return ReE(res, "Activity Log not found", 404);
        return ReS(res, log, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Activity Log
var updateActivityLog = async (req, res) => {
    try {
        const log = await model.ActivityLog.findByPk(req.params.id);
        if (!log) return ReE(res, "Activity Log not found", 404);

        await log.update({
            action: req.body.action || log.action,
            description: req.body.description || log.description
        });
        return ReS(res, log, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateActivityLog = updateActivityLog;

// ✅ Soft Delete an Activity Log
var deleteActivityLog = async (req, res) => {
    try {
        const log = await model.ActivityLog.findByPk(req.params.id);
        if (!log) return ReE(res, "Activity Log not found", 404);

        await log.update({ isDeleted: true });
        return ReS(res, "Activity Log deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteActivityLog = deleteActivityLog;
