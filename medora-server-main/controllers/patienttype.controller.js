const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Patient Type
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "name is required", 400);

        const patientType = await model.PatientType.create({
            name,
            description: description || null
        });

        return ReS(res, patientType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Patient Types
var fetchAll = async (req, res) => {
    try {
        const types = await model.PatientType.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Patient Type by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.PatientType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Patient Type not found", 404);

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Patient Type
var updatePatientType = async (req, res) => {
    try {
        const type = await model.PatientType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Patient Type not found", 404);

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updatePatientType = updatePatientType;

// ✅ Soft Delete a Patient Type
var deletePatientType = async (req, res) => {
    try {
        const type = await model.PatientType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Patient Type not found", 404);

        await type.update({ isDeleted: true });
        return ReS(res, "Patient Type deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deletePatientType = deletePatientType;
