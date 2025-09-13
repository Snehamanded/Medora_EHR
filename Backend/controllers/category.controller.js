const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Category
var add = async (req, res) => {
    try {
        const { name, iconResId, description } = req.body;
        if (!name) return ReE(res, "Name is required", 400);

        const category = await model.Category.create({
            name,
            iconResId: iconResId || null,
            description: description || null
        });

        return ReS(res, category, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Categories
var fetchAll = async (req, res) => {
    try {
        const categories = await model.Category.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });
        return ReS(res, { success: true, data: categories }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Category by ID
var fetchSingle = async (req, res) => {
    try {
        const category = await model.Category.findByPk(req.params.id);
        if (!category || category.isDeleted) return ReE(res, "Category not found", 404);

        return ReS(res, category, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Category
var updateCategory = async (req, res) => {
    try {
        const category = await model.Category.findByPk(req.params.id);
        if (!category || category.isDeleted) return ReE(res, "Category not found", 404);

        await category.update({
            name: req.body.name || category.name,
            iconResId: req.body.iconResId || category.iconResId,
            description: req.body.description || category.description
        });

        return ReS(res, category, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateCategory = updateCategory;

// ✅ Soft Delete a Category
var deleteCategory = async (req, res) => {
    try {
        const category = await model.Category.findByPk(req.params.id);
        if (!category || category.isDeleted) return ReE(res, "Category not found", 404);

        await category.update({ isDeleted: true });
        return ReS(res, "Category deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteCategory = deleteCategory;
