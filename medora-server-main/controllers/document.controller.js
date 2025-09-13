const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Document
var add = async (req, res) => {
    try {
        const { name, description, documentTypeId, uploadedBy } = req.body;
        if (!name || !documentTypeId || !uploadedBy) 
            return ReE(res, "Name, documentTypeId, and uploadedBy are required", 400);

        const document = await model.Document.create({
            name,
            description: description || null,
            documentTypeId,
            uploadedBy
        });

        return ReS(res, document, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Documents
var fetchAll = async (req, res) => {
    try {
        const documents = await model.Document.findAll({
            where: { isDeleted: false },
            include: [{ model: model.DocumentType, as: "documentType" }],
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: documents }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Document by ID
var fetchSingle = async (req, res) => {
    try {
        const document = await model.Document.findByPk(req.params.id, {
            include: [{ model: model.DocumentType, as: "documentType" }]
        });

        if (!document || document.isDeleted) return ReE(res, "Document not found", 404);
        return ReS(res, document, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Document
var updateDocument = async (req, res) => {
    try {
        const document = await model.Document.findByPk(req.params.id);
        if (!document || document.isDeleted) return ReE(res, "Document not found", 404);

        await document.update({
            name: req.body.name || document.name,
            description: req.body.description || document.description,
            documentTypeId: req.body.documentTypeId || document.documentTypeId
        });

        return ReS(res, document, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateDocument = updateDocument;

// ✅ Soft Delete a Document
var deleteDocument = async (req, res) => {
    try {
        const document = await model.Document.findByPk(req.params.id);
        if (!document || document.isDeleted) return ReE(res, "Document not found", 404);

        await document.update({ isDeleted: true });
        return ReS(res, "Document deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteDocument = deleteDocument;
