const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Payment
var add = async (req, res) => {
    try {
        const { patientId, amount, paymentTypeId, transactionId, status } = req.body;
        if (!patientId || !amount || !paymentTypeId) 
            return ReE(res, "patientId, amount, and paymentTypeId are required", 400);

        const payment = await model.Payment.create({
            patientId,
            amount,
            paymentTypeId,
            transactionId: transactionId || null,
            status: status || "pending"
        });

        return ReS(res, payment, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Payments
var fetchAll = async (req, res) => {
    try {
        const payments = await model.Payment.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: payments }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Payment by ID
var fetchSingle = async (req, res) => {
    try {
        const payment = await model.Payment.findByPk(req.params.id);
        if (!payment || payment.isDeleted) return ReE(res, "Payment not found", 404);

        return ReS(res, payment, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Payment
var updatePayment = async (req, res) => {
    try {
        const payment = await model.Payment.findByPk(req.params.id);
        if (!payment || payment.isDeleted) return ReE(res, "Payment not found", 404);

        await payment.update({
            amount: req.body.amount || payment.amount,
            paymentTypeId: req.body.paymentTypeId || payment.paymentTypeId,
            transactionId: req.body.transactionId || payment.transactionId,
            status: req.body.status || payment.status
        });

        return ReS(res, payment, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updatePayment = updatePayment;

// ✅ Soft Delete a Payment
var deletePayment = async (req, res) => {
    try {
        const payment = await model.Payment.findByPk(req.params.id);
        if (!payment || payment.isDeleted) return ReE(res, "Payment not found", 404);

        await payment.update({ isDeleted: true });
        return ReS(res, "Payment deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deletePayment = deletePayment;
