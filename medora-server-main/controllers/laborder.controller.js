const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Lab Order
var add = async (req, res) => {
    try {
        const { patientId, doctorId, testName, testDate, status, notes } = req.body;
        if (!patientId || !doctorId || !testName) 
            return ReE(res, "patientId, doctorId, and testName are required", 400);

        const labOrder = await model.LabOrder.create({
            patientId,
            doctorId,
            testName,
            testDate: testDate || null,
            status: status || "Pending",
            notes: notes || null
        });

        return ReS(res, labOrder, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Lab Orders
var fetchAll = async (req, res) => {
    try {
        const labOrders = await model.LabOrder.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: labOrders }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Lab Order by ID
var fetchSingle = async (req, res) => {
    try {
        const labOrder = await model.LabOrder.findByPk(req.params.id);
        if (!labOrder || labOrder.isDeleted) return ReE(res, "Lab Order not found", 404);

        return ReS(res, labOrder, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Lab Order
var updateLabOrder = async (req, res) => {
    try {
        const labOrder = await model.LabOrder.findByPk(req.params.id);
        if (!labOrder || labOrder.isDeleted) return ReE(res, "Lab Order not found", 404);

        await labOrder.update({
            testName: req.body.testName || labOrder.testName,
            testDate: req.body.testDate || labOrder.testDate,
            status: req.body.status || labOrder.status,
            notes: req.body.notes || labOrder.notes
        });

        return ReS(res, labOrder, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateLabOrder = updateLabOrder;

// ✅ Soft Delete a Lab Order
var deleteLabOrder = async (req, res) => {
    try {
        const labOrder = await model.LabOrder.findByPk(req.params.id);
        if (!labOrder || labOrder.isDeleted) return ReE(res, "Lab Order not found", 404);

        await labOrder.update({ isDeleted: true });
        return ReS(res, "Lab Order deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteLabOrder = deleteLabOrder;
