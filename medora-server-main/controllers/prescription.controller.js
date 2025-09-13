const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Prescription
var add = async (req, res) => {
    try {
        const { patientId, doctorId, medicines, notes } = req.body;
        if (!patientId || !doctorId || !medicines) 
            return ReE(res, "patientId, doctorId, and medicines are required", 400);

        const prescription = await model.Prescription.create({
            patientId,
            doctorId,
            medicines: JSON.stringify(medicines), // store as JSON string
            notes: notes || null
        });

        return ReS(res, prescription, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Prescriptions
var fetchAll = async (req, res) => {
    try {
        const prescriptions = await model.Prescription.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: prescriptions }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Prescription by ID
var fetchSingle = async (req, res) => {
    try {
        const prescription = await model.Prescription.findByPk(req.params.id);
        if (!prescription || prescription.isDeleted) return ReE(res, "Prescription not found", 404);

        return ReS(res, prescription, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Prescription
var updatePrescription = async (req, res) => {
    try {
        const prescription = await model.Prescription.findByPk(req.params.id);
        if (!prescription || prescription.isDeleted) return ReE(res, "Prescription not found", 404);

        await prescription.update({
            patientId: req.body.patientId || prescription.patientId,
            doctorId: req.body.doctorId || prescription.doctorId,
            medicines: req.body.medicines ? JSON.stringify(req.body.medicines) : prescription.medicines,
            notes: req.body.notes || prescription.notes
        });

        return ReS(res, prescription, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updatePrescription = updatePrescription;

// ✅ Soft Delete a Prescription
var deletePrescription = async (req, res) => {
    try {
        const prescription = await model.Prescription.findByPk(req.params.id);
        if (!prescription || prescription.isDeleted) return ReE(res, "Prescription not found", 404);

        await prescription.update({ isDeleted: true });
        return ReS(res, "Prescription deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deletePrescription = deletePrescription;
