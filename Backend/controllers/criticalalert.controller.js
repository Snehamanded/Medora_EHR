const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Critical Alert
var add = async (req, res) => {
    try {
        const { title, description, createdBy } = req.body;
        if (!title || !description || !createdBy) 
            return ReE(res, "Title, description, and createdBy are required", 400);

        const alert = await model.CriticalAlert.create({
            title,
            description,
            createdBy
        });

        return ReS(res, alert, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Critical Alerts
var fetchAll = async (req, res) => {
    try {
        const alerts = await model.CriticalAlert.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });
        return ReS(res, { success: true, data: alerts }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Critical Alert by ID
var fetchSingle = async (req, res) => {
    try {
        const alert = await model.CriticalAlert.findByPk(req.params.id);
        if (!alert || alert.isDeleted) return ReE(res, "Critical Alert not found", 404);

        return ReS(res, alert, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Critical Alert
var updateCriticalAlert = async (req, res) => {
    try {
        const alert = await model.CriticalAlert.findByPk(req.params.id);
        if (!alert || alert.isDeleted) return ReE(res, "Critical Alert not found", 404);

        await alert.update({
            title: req.body.title || alert.title,
            description: req.body.description || alert.description
        });

        return ReS(res, alert, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateCriticalAlert = updateCriticalAlert;

// ✅ Soft Delete a Critical Alert
var deleteCriticalAlert = async (req, res) => {
    try {
        const alert = await model.CriticalAlert.findByPk(req.params.id);
        if (!alert || alert.isDeleted) return ReE(res, "Critical Alert not found", 404);

        await alert.update({ isDeleted: true });
        return ReS(res, "Critical Alert deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteCriticalAlert = deleteCriticalAlert;
