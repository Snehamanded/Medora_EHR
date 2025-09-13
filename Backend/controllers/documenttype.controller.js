const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Document Type
var add = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return ReE(res, "Name is required", 400);

        const documentType = await model.DocumentType.create({
            name,
            description: description || null
        });

        return ReS(res, documentType, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Document Types
var fetchAll = async (req, res) => {
    try {
        const types = await model.DocumentType.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: types }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Document Type by ID
var fetchSingle = async (req, res) => {
    try {
        const type = await model.DocumentType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Document Type not found", 404);

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Document Type
var updateDocumentType = async (req, res) => {
    try {
        const type = await model.DocumentType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Document Type not found", 404);

        await type.update({
            name: req.body.name || type.name,
            description: req.body.description || type.description
        });

        return ReS(res, type, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateDocumentType = updateDocumentType;

// ✅ Soft Delete a Document Type
var deleteDocumentType = async (req, res) => {
    try {
        const type = await model.DocumentType.findByPk(req.params.id);
        if (!type || type.isDeleted) return ReE(res, "Document Type not found", 404);

        await type.update({ isDeleted: true });
        return ReS(res, "Document Type deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteDocumentType = deleteDocumentType;
