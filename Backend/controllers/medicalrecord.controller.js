const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Medical Record
var add = async (req, res) => {
    try {
        const { patientId, doctorId, recordType, description, dateRecorded } = req.body;
        if (!patientId || !doctorId || !recordType) 
            return ReE(res, "patientId, doctorId, and recordType are required", 400);

        const medicalRecord = await model.MedicalRecord.create({
            patientId,
            doctorId,
            recordType,
            description: description || null,
            dateRecorded: dateRecorded || new Date()
        });

        return ReS(res, medicalRecord, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Medical Records
var fetchAll = async (req, res) => {
    try {
        const records = await model.MedicalRecord.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: records }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Medical Record by ID
var fetchSingle = async (req, res) => {
    try {
        const record = await model.MedicalRecord.findByPk(req.params.id);
        if (!record || record.isDeleted) return ReE(res, "Medical Record not found", 404);

        return ReS(res, record, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Medical Record
var updateMedicalRecord = async (req, res) => {
    try {
        const record = await model.MedicalRecord.findByPk(req.params.id);
        if (!record || record.isDeleted) return ReE(res, "Medical Record not found", 404);

        await record.update({
            recordType: req.body.recordType || record.recordType,
            description: req.body.description || record.description,
            dateRecorded: req.body.dateRecorded || record.dateRecorded
        });

        return ReS(res, record, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateMedicalRecord = updateMedicalRecord;

// ✅ Soft Delete a Medical Record
var deleteMedicalRecord = async (req, res) => {
    try {
        const record = await model.MedicalRecord.findByPk(req.params.id);
        if (!record || record.isDeleted) return ReE(res, "Medical Record not found", 404);

        await record.update({ isDeleted: true });
        return ReS(res, "Medical Record deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteMedicalRecord = deleteMedicalRecord;
