const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Medicine
var add = async (req, res) => {
    try {
        const { name, category, manufacturer, dosageForm, description } = req.body;
        if (!name || !category) 
            return ReE(res, "name and category are required", 400);

        const medicine = await model.Medicine.create({
            name,
            category,
            manufacturer: manufacturer || null,
            dosageForm: dosageForm || null,
            description: description || null
        });

        return ReS(res, medicine, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Medicines
var fetchAll = async (req, res) => {
    try {
        const medicines = await model.Medicine.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: medicines }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Medicine by ID
var fetchSingle = async (req, res) => {
    try {
        const medicine = await model.Medicine.findByPk(req.params.id);
        if (!medicine || medicine.isDeleted) return ReE(res, "Medicine not found", 404);

        return ReS(res, medicine, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Medicine
var updateMedicine = async (req, res) => {
    try {
        const medicine = await model.Medicine.findByPk(req.params.id);
        if (!medicine || medicine.isDeleted) return ReE(res, "Medicine not found", 404);

        await medicine.update({
            name: req.body.name || medicine.name,
            category: req.body.category || medicine.category,
            manufacturer: req.body.manufacturer || medicine.manufacturer,
            dosageForm: req.body.dosageForm || medicine.dosageForm,
            description: req.body.description || medicine.description
        });

        return ReS(res, medicine, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateMedicine = updateMedicine;

// ✅ Soft Delete a Medicine
var deleteMedicine = async (req, res) => {
    try {
        const medicine = await model.Medicine.findByPk(req.params.id);
        if (!medicine || medicine.isDeleted) return ReE(res, "Medicine not found", 404);

        await medicine.update({ isDeleted: true });
        return ReS(res, "Medicine deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteMedicine = deleteMedicine;
