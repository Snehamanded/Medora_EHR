const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add Billing Record
var add = async (req, res) => {
    try {
        const { patientId, amount, paymentTypeId, status, description } = req.body;

        if (!patientId || !amount || !paymentTypeId) {
            return ReE(res, "patientId, amount, and paymentTypeId are required", 400);
        }

        const billingRecord = await model.BillingRecord.create({
            patientId,
            amount,
            paymentTypeId,
            status: status || "pending",
            description: description || null
        });

        return ReS(res, billingRecord, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch All Billing Records
var fetchAll = async (req, res) => {
    try {
        const billingRecords = await model.BillingRecord.findAll({
            where: { isDeleted: false },
            include: [
                { model: model.Patient, as: "patient", attributes: ["id", "name", "email"] },
                { model: model.PaymentType, as: "paymentType", attributes: ["id", "name"] }
            ],
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: billingRecords }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch Single Billing Record
var fetchSingle = async (req, res) => {
    try {
        const billingRecord = await model.BillingRecord.findByPk(req.params.id, {
            include: [
                { model: model.Patient, as: "patient", attributes: ["id", "name", "email"] },
                { model: model.PaymentType, as: "paymentType", attributes: ["id", "name"] }
            ]
        });

        if (!billingRecord || billingRecord.isDeleted) {
            return ReE(res, "Billing record not found", 404);
        }

        return ReS(res, billingRecord, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update Billing Record
var updateBillingRecord = async (req, res) => {
    try {
        const billingRecord = await model.BillingRecord.findByPk(req.params.id);
        if (!billingRecord || billingRecord.isDeleted) {
            return ReE(res, "Billing record not found", 404);
        }

        await billingRecord.update({
            patientId: req.body.patientId || billingRecord.patientId,
            amount: req.body.amount || billingRecord.amount,
            paymentTypeId: req.body.paymentTypeId || billingRecord.paymentTypeId,
            status: req.body.status || billingRecord.status,
            description: req.body.description || billingRecord.description
        });

        return ReS(res, billingRecord, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateBillingRecord = updateBillingRecord;

// ✅ Soft Delete Billing Record
var deleteBillingRecord = async (req, res) => {
    try {
        const billingRecord = await model.BillingRecord.findByPk(req.params.id);
        if (!billingRecord || billingRecord.isDeleted) {
            return ReE(res, "Billing record not found", 404);
        }

        await billingRecord.update({ isDeleted: true });
        return ReS(res, "Billing record deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteBillingRecord = deleteBillingRecord;
