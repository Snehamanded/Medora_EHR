const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Hospital
var add = async (req, res) => {
    try {
        const { name, address, contactNumber } = req.body;
        if (!name || !address) 
            return ReE(res, "name and address are required", 400);

        const hospital = await model.Hospital.create({
            name,
            address,
            contactNumber: contactNumber || null
        });

        return ReS(res, hospital, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Hospitals
var fetchAll = async (req, res) => {
    try {
        const hospitals = await model.Hospital.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: hospitals }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Hospital by ID
var fetchSingle = async (req, res) => {
    try {
        const hospital = await model.Hospital.findByPk(req.params.id);
        if (!hospital || hospital.isDeleted) return ReE(res, "Hospital not found", 404);

        return ReS(res, hospital, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Hospital
var updateHospital = async (req, res) => {
    try {
        const hospital = await model.Hospital.findByPk(req.params.id);
        if (!hospital || hospital.isDeleted) return ReE(res, "Hospital not found", 404);

        await hospital.update({
            name: req.body.name || hospital.name,
            address: req.body.address || hospital.address,
            contactNumber: req.body.contactNumber || hospital.contactNumber
        });

        return ReS(res, hospital, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateHospital = updateHospital;

// ✅ Soft Delete a Hospital
var deleteHospital = async (req, res) => {
    try {
        const hospital = await model.Hospital.findByPk(req.params.id);
        if (!hospital || hospital.isDeleted) return ReE(res, "Hospital not found", 404);

        await hospital.update({ isDeleted: true });
        return ReS(res, "Hospital deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteHospital = deleteHospital;
