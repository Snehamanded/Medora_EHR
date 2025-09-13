const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Mode
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "Name is required", 400);

        const mode = await model.Mode.create({
            name,
            description: description || null
        });

        return ReS(res, mode, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Modes
var fetchAll = async (req, res) => {
    try {
        const types = await model.Mode.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Mode by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.Mode.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Mode not found", 404);

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Mode
var updateMode = async (req, res) => {
    try {
        const type = await model.Mode.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Mode not found", 404);

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateMode = updateMode;

// ✅ Soft Delete a Mode
var deleteMode = async (req, res) => {
    try {
        const type = await model.Mode.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Mode not found", 404);

        await type.update({ isDeleted: true });
        return ReS(res, "Mode deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteMode = deleteMode;
