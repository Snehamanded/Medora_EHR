const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Insurance Record
var add = async (req, res) => {
    try {
        const { uid, providerName, policyNumber, coverageAmount, startDate, endDate } = req.body;
        if (!uid || !providerName || !policyNumber) 
            return ReE(res, "uid, providerName and policyNumber are required", 400);

        const insuranceRecord = await model.InsuranceRecord.create({
            uid,
            providerName,
            policyNumber,
            coverageAmount: coverageAmount || null,
            startDate: startDate || null,
            endDate: endDate || null
        });

        return ReS(res, insuranceRecord, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Insurance Records
var fetchAll = async (req, res) => {
    try {
        const records = await model.InsuranceRecord.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: records }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Insurance Record by ID
var fetchSingle = async (req, res) => {
    try {
        const record = await model.InsuranceRecord.findByPk(req.params.id);
        if (!record || record.isDeleted) return ReE(res, "Insurance Record not found", 404);

        return ReS(res, record, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Insurance Record
var updateInsuranceRecord = async (req, res) => {
    try {
        const record = await model.InsuranceRecord.findByPk(req.params.id);
        if (!record || record.isDeleted) return ReE(res, "Insurance Record not found", 404);

        await record.update({
            providerName: req.body.providerName || record.providerName,
            policyNumber: req.body.policyNumber || record.policyNumber,
            coverageAmount: req.body.coverageAmount || record.coverageAmount,
            startDate: req.body.startDate || record.startDate,
            endDate: req.body.endDate || record.endDate
        });

        return ReS(res, record, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateInsuranceRecord = updateInsuranceRecord;

// ✅ Soft Delete an Insurance Record
var deleteInsuranceRecord = async (req, res) => {
    try {
        const record = await model.InsuranceRecord.findByPk(req.params.id);
        if (!record || record.isDeleted) return ReE(res, "Insurance Record not found", 404);

        await record.update({ isDeleted: true });
        return ReS(res, "Insurance Record deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteInsuranceRecord = deleteInsuranceRecord;
