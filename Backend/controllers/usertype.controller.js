const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new User Type
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "Name is required", 400);

        const userType = await model.UserType.create({
            name,
            description: description || null
        });

        return ReS(res, userType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all User Types
var fetchAll = async (req, res) => {
    try {
        const userTypes = await model.UserType.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: userTypes }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single User Type by ID
var fetchSingle = async (req, res) => {
    try {
        const userType = await model.UserType.findByPk(req.params.id);
        if (!userType || userType.isDeleted) return ReE(res, "User Type not found", 404);

        return ReS(res, userType, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a User Type
var updateUserType = async (req, res) => {
    try {
        const userType = await model.UserType.findByPk(req.params.id);
        if (!userType || userType.isDeleted) return ReE(res, "User Type not found", 404);

        await userType.update({
            name: req.body.name || userType.name,
            description: req.body.description || userType.description
        });

        return ReS(res, userType, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateUserType = updateUserType;

// ✅ Soft Delete a User Type
var deleteUserType = async (req, res) => {
    try {
        const userType = await model.UserType.findByPk(req.params.id);
        if (!userType || userType.isDeleted) return ReE(res, "User Type not found", 404);

        await userType.update({ isDeleted: true });
        return ReS(res, "User Type deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteUserType = deleteUserType;
