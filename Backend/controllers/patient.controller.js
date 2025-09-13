const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Patient
var add = async (req, res) => {
    try {
        const { name, email, mobile, patientTypeId, dob, gender } = req.body;
        if (!name || !email || !mobile) 
            return ReE(res, "name, email, and mobile are required", 400);

        const patient = await model.Patient.create({
            name,
            email,
            mobile,
            patientTypeId: patientTypeId || null,
            dob: dob || null,
            gender: gender || null
        });

        return ReS(res, patient, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Patients
var fetchAll = async (req, res) => {
    try {
        const patients = await model.Patient.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: patients }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Patient by ID
var fetchSingle = async (req, res) => {
    try {
        const patient = await model.Patient.findByPk(req.params.id);
        if (!patient || patient.isDeleted) return ReE(res, "Patient not found", 404);

        return ReS(res, patient, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Patient
var updatePatient = async (req, res) => {
    try {
        const patient = await model.Patient.findByPk(req.params.id);
        if (!patient || patient.isDeleted) return ReE(res, "Patient not found", 404);

        await patient.update({
            name: req.body.name || patient.name,
            email: req.body.email || patient.email,
            mobile: req.body.mobile || patient.mobile,
            patientTypeId: req.body.patientTypeId || patient.patientTypeId,
            dob: req.body.dob || patient.dob,
            gender: req.body.gender || patient.gender
        });

        return ReS(res, patient, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updatePatient = updatePatient;

// ✅ Soft Delete a Patient
var deletePatient = async (req, res) => {
    try {
        const patient = await model.Patient.findByPk(req.params.id);
        if (!patient || patient.isDeleted) return ReE(res, "Patient not found", 404);

        await patient.update({ isDeleted: true });
        return ReS(res, "Patient deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deletePatient = deletePatient;
