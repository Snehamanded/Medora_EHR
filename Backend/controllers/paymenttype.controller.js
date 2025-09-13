const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Payment Type
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "name is required", 400);

        const paymentType = await model.PaymentType.create({
            name,
            description: description || null
        });

        return ReS(res, paymentType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Payment Types
var fetchAll = async (req, res) => {
    try {
        const types = await model.PaymentType.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Payment Type by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.PaymentType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Payment Type not found", 404);

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Payment Type
var updatePaymentType = async (req, res) => {
    try {
        const type = await model.PaymentType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Payment Type not found", 404);

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updatePaymentType = updatePaymentType;

// ✅ Soft Delete a Payment Type
var deletePaymentType = async (req, res) => {
    try {
        const type = await model.PaymentType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Payment Type not found", 404);

        await type.update({ isDeleted: true });
        return ReS(res, "Payment Type deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deletePaymentType = deletePaymentType;
