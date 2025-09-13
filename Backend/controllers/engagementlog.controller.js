const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Engagement Log
var add = async (req, res) => {
    try {
        const { doctorId, patientId, action, description } = req.body;
        if (!doctorId || !patientId || !action) 
            return ReE(res, "doctorId, patientId, and action are required", 400);

        const engagementLog = await model.EngagementLog.create({
            doctorId,
            patientId,
            action,
            description: description || null
        });

        return ReS(res, engagementLog, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Engagement Logs
var fetchAll = async (req, res) => {
    try {
        const logs = await model.EngagementLog.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: logs }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Engagement Log by ID
var fetchSingle = async (req, res) => {
    try {
        const log = await model.EngagementLog.findByPk(req.params.id);
        if (!log || log.isDeleted) return ReE(res, "Engagement Log not found", 404);

        return ReS(res, log, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Engagement Log
var updateEngagementLog = async (req, res) => {
    try {
        const log = await model.EngagementLog.findByPk(req.params.id);
        if (!log || log.isDeleted) return ReE(res, "Engagement Log not found", 404);

        await log.update({
            action: req.body.action || log.action,
            description: req.body.description || log.description
        });

        return ReS(res, log, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateEngagementLog = updateEngagementLog;

// ✅ Soft Delete an Engagement Log
var deleteEngagementLog = async (req, res) => {
    try {
        const log = await model.EngagementLog.findByPk(req.params.id);
        if (!log || log.isDeleted) return ReE(res, "Engagement Log not found", 404);

        await log.update({ isDeleted: true });
        return ReS(res, "Engagement Log deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteEngagementLog = deleteEngagementLog;
