const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Symptom Category
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "Name is required", 400);

        const category = await model.SymptomCategory.create({
            name,
            description: description || null
        });

        return ReS(res, category, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Symptom Categories
var fetchAll = async (req, res) => {
    try {
        const categories = await model.SymptomCategory.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: categories }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Symptom Category by ID
var fetchSingle = async (req, res) => {
    try {
        const category = await model.SymptomCategory.findByPk(req.params.id);
        if (!category || category.isDeleted) return ReE(res, "Symptom Category not found", 404);

        return ReS(res, category, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Symptom Category
var updateSymptomCategory = async (req, res) => {
    try {
        const category = await model.SymptomCategory.findByPk(req.params.id);
        if (!category || category.isDeleted) return ReE(res, "Symptom Category not found", 404);

        await category.update({
            name: req.body.name || category.name,
            description: req.body.description || category.description
        });

        return ReS(res, category, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateSymptomCategory = updateSymptomCategory;

// ✅ Soft Delete a Symptom Category
var deleteSymptomCategory = async (req, res) => {
    try {
        const category = await model.SymptomCategory.findByPk(req.params.id);
        if (!category || category.isDeleted) return ReE(res, "Symptom Category not found", 404);

        await category.update({ isDeleted: true });
        return ReS(res, "Symptom Category deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteSymptomCategory = deleteSymptomCategory;
