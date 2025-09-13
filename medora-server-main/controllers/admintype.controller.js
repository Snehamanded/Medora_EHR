const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new AdminType
var add = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) return ReE(res, "AdminType name is required", 400);

        const existing = await model.AdminType.findOne({ where: { name, isDeleted: false } });
        if (existing) return ReE(res, "AdminType already exists", 409);

        const adminType = await model.AdminType.create({
            name,
            description,
            isDeleted: false
        });

        return ReS(res, adminType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all AdminTypes
var fetchAll = async (req, res) => {
    try {
        const types = await model.AdminType.findAll({
            where: { isDeleted: false }
        });
        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single AdminType by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.AdminType.findByPk(req.params.id);
        if (!type || type.isDeleted) {
            return ReE(res, "AdminType not found", 404);
        }
        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an AdminType
var updateAdminType = async (req, res) => {
    try {
        const type = await model.AdminType.findByPk(req.params.id);
        if (!type || type.isDeleted) {
            return ReE(res, "AdminType not found", 404);
        }

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAdminType = updateAdminType;

// ✅ Soft Delete an AdminType
var deleteAdminType = async (req, res) => {
    try {
        const type = await model.AdminType.findByPk(req.params.id);
        if (!type || type.isDeleted) {
            return ReE(res, "AdminType not found", 404);
        }

        await type.update({ isDeleted: true });
        return ReS(res, "AdminType deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAdminType = deleteAdminType;
