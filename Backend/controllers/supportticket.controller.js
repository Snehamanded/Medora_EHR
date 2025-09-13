const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Support Ticket
var add = async (req, res) => {
    try {
        const { userId, subject, message, status } = req.body;
        if (!userId || !subject || !message)
            return ReE(res, "userId, subject, and message are required", 400);

        const ticket = await model.SupportTicket.create({
            userId,
            subject,
            message,
            status: status || "open"
        });

        return ReS(res, ticket, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Support Tickets
var fetchAll = async (req, res) => {
    try {
        const tickets = await model.SupportTicket.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: tickets }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Support Ticket by ID
var fetchSingle = async (req, res) => {
    try {
        const ticket = await model.SupportTicket.findByPk(req.params.id);
        if (!ticket || ticket.isDeleted) return ReE(res, "Support Ticket not found", 404);

        return ReS(res, ticket, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Support Ticket
var updateSupportTicket = async (req, res) => {
    try {
        const ticket = await model.SupportTicket.findByPk(req.params.id);
        if (!ticket || ticket.isDeleted) return ReE(res, "Support Ticket not found", 404);

        await ticket.update({
            subject: req.body.subject || ticket.subject,
            message: req.body.message || ticket.message,
            status: req.body.status || ticket.status
        });

        return ReS(res, ticket, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateSupportTicket = updateSupportTicket;

// ✅ Soft Delete a Support Ticket
var deleteSupportTicket = async (req, res) => {
    try {
        const ticket = await model.SupportTicket.findByPk(req.params.id);
        if (!ticket || ticket.isDeleted) return ReE(res, "Support Ticket not found", 404);

        await ticket.update({ isDeleted: true });
        return ReS(res, "Support Ticket deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteSupportTicket = deleteSupportTicket;
