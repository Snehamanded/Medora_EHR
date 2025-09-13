const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Emergency Contact
var add = async (req, res) => {
    try {
        const { userId, name, relation, phone, email } = req.body;
        if (!userId || !name || !phone) 
            return ReE(res, "userId, name, and phone are required", 400);

        const contact = await model.EmergencyContact.create({
            userId,
            name,
            relation: relation || null,
            phone,
            email: email || null
        });

        return ReS(res, contact, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Emergency Contacts
var fetchAll = async (req, res) => {
    try {
        const contacts = await model.EmergencyContact.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: contacts }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Emergency Contact by ID
var fetchSingle = async (req, res) => {
    try {
        const contact = await model.EmergencyContact.findByPk(req.params.id);
        if (!contact || contact.isDeleted) return ReE(res, "Emergency Contact not found", 404);

        return ReS(res, contact, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Emergency Contact
var updateEmergencyContact = async (req, res) => {
    try {
        const contact = await model.EmergencyContact.findByPk(req.params.id);
        if (!contact || contact.isDeleted) return ReE(res, "Emergency Contact not found", 404);

        await contact.update({
            name: req.body.name || contact.name,
            relation: req.body.relation || contact.relation,
            phone: req.body.phone || contact.phone,
            email: req.body.email || contact.email
        });

        return ReS(res, contact, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateEmergencyContact = updateEmergencyContact;

// ✅ Soft Delete an Emergency Contact
var deleteEmergencyContact = async (req, res) => {
    try {
        const contact = await model.EmergencyContact.findByPk(req.params.id);
        if (!contact || contact.isDeleted) return ReE(res, "Emergency Contact not found", 404);

        await contact.update({ isDeleted: true });
        return ReS(res, "Emergency Contact deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteEmergencyContact = deleteEmergencyContact;
