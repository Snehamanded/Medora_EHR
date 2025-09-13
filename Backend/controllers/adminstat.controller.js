const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new AdminStat
var add = async (req, res) => {
    try {
        const { adminId, metric, value, description } = req.body;

        if (!adminId || !metric || value === undefined) {
            return ReE(res, "adminId, metric, and value are required", 400);
        }

        const admin = await model.Admin.findByPk(adminId);
        if (!admin || admin.isDeleted) {
            return ReE(res, "Admin not found", 404);
        }

        const adminStat = await model.AdminStat.create({
            adminId,
            metric,
            value,
            description,
            isDeleted: false
        });

        return ReS(res, adminStat, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all AdminStats
var fetchAll = async (req, res) => {
    try {
        const stats = await model.AdminStat.findAll({
            where: { isDeleted: false },
            include: [{ model: model.Admin, attributes: ["id", "name", "email"] }]
        });
        return ReS(res, { success: true, data: stats }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single AdminStat by ID
var fetchSingle = async (req, res) => {
    try {
        const stat = await model.AdminStat.findByPk(req.params.id, {
            include: [{ model: model.Admin, attributes: ["id", "name", "email"] }]
        });
        if (!stat || stat.isDeleted) {
            return ReE(res, "AdminStat not found", 404);
        }
        return ReS(res, stat, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an AdminStat
var updateAdminStat = async (req, res) => {
    try {
        const stat = await model.AdminStat.findByPk(req.params.id);
        if (!stat || stat.isDeleted) {
            return ReE(res, "AdminStat not found", 404);
        }

        await stat.update({
            metric: req.body.metric || stat.metric,
            value: req.body.value !== undefined ? req.body.value : stat.value,
            description: req.body.description || stat.description
        });

        return ReS(res, stat, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAdminStat = updateAdminStat;

// ✅ Soft Delete an AdminStat
var deleteAdminStat = async (req, res) => {
    try {
        const stat = await model.AdminStat.findByPk(req.params.id);
        if (!stat || stat.isDeleted) {
            return ReE(res, "AdminStat not found", 404);
        }

        await stat.update({ isDeleted: true });
        return ReS(res, "AdminStat deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAdminStat = deleteAdminStat;
