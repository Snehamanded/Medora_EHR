const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Admin
var add = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return ReE(res, "Name, Email and Password are required", 400);
        }

        const existingAdmin = await model.Admin.findOne({ where: { email } });
        if (existingAdmin) {
            return ReE(res, "Email already in use", 409);
        }

        const admin = await model.Admin.create({
            name,
            email,
            password, // ⚠️ Hash before saving in production
            role: role || "admin",
            isDeleted: false,
            isActive: true
        });

        return ReS(res, admin, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Admins
var fetchAll = async (req, res) => {
    try {
        const admins = await model.Admin.findAll({
            where: { isDeleted: false }
        });
        return ReS(res, { success: true, data: admins }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Admin by ID
var fetchSingle = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id);
        if (!admin || admin.isDeleted) {
            return ReE(res, "Admin not found", 404);
        }
        return ReS(res, admin, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Admin
var updateAdmin = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id);
        if (!admin || admin.isDeleted) {
            return ReE(res, "Admin not found", 404);
        }

        await admin.update({
            name: req.body.name || admin.name,
            email: req.body.email || admin.email,
            password: req.body.password || admin.password, // ⚠️ Hash if updated
            role: req.body.role || admin.role,
            isActive: req.body.isActive !== undefined ? req.body.isActive : admin.isActive
        });

        return ReS(res, admin, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAdmin = updateAdmin;

// ✅ Soft Delete an Admin
var deleteAdmin = async (req, res) => {
    try {
        const admin = await model.Admin.findByPk(req.params.id);
        if (!admin || admin.isDeleted) {
            return ReE(res, "Admin not found", 404);
        }

        await admin.update({ isDeleted: true });
        return ReS(res, "Admin deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAdmin = deleteAdmin;
