const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Create a new Chat Thread
var add = async (req, res) => {
    try {
        const { title, participants } = req.body;
        if (!title || !participants || !Array.isArray(participants) || participants.length === 0) {
            return ReE(res, "Title and at least one participant are required", 400);
        }

        const thread = await model.ChatThread.create({ title });

        // Add participants
        for (const uid of participants) {
            await model.ChatThreadParticipant.create({
                chatThreadId: thread.id,
                uid
            });
        }

        return ReS(res, thread, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Chat Threads for a user
var fetchAll = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) return ReE(res, "userId is required", 400);

        const threads = await model.ChatThread.findAll({
            include: [
                {
                    model: model.ChatThreadParticipant,
                    as: "participants",
                    where: { uid: userId }
                },
                {
                    model: model.Message,
                    as: "messages",
                    order: [["createdAt", "ASC"]]
                }
            ],
            where: { isDeleted: false },
            order: [["updatedAt", "DESC"]]
        });

        return ReS(res, { success: true, data: threads }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Chat Thread
var fetchSingle = async (req, res) => {
    try {
        const thread = await model.ChatThread.findByPk(req.params.id, {
            include: [
                { model: model.ChatThreadParticipant, as: "participants" },
                { model: model.Message, as: "messages", order: [["createdAt", "ASC"]] }
            ]
        });

        if (!thread || thread.isDeleted) return ReE(res, "Chat Thread not found", 404);

        return ReS(res, thread, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Chat Thread
var updateChatThread = async (req, res) => {
    try {
        const thread = await model.ChatThread.findByPk(req.params.id);
        if (!thread || thread.isDeleted) return ReE(res, "Chat Thread not found", 404);

        await thread.update({
            title: req.body.title || thread.title
        });

        return ReS(res, thread, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateChatThread = updateChatThread;

// ✅ Soft Delete a Chat Thread
var deleteChatThread = async (req, res) => {
    try {
        const thread = await model.ChatThread.findByPk(req.params.id);
        if (!thread || thread.isDeleted) return ReE(res, "Chat Thread not found", 404);

        await thread.update({ isDeleted: true });
        return ReS(res, "Chat Thread deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteChatThread = deleteChatThread;

// ✅ Add a Message to a Chat Thread
var addMessage = async (req, res) => {
    try {
        const { chatThreadId, senderId, content } = req.body;
        if (!chatThreadId || !senderId || !content) return ReE(res, "All fields are required", 400);

        const message = await model.Message.create({ chatThreadId, senderId, content });
        return ReS(res, message, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.addMessage = addMessage;

// ✅ Fetch Messages for a Chat Thread
var fetchMessages = async (req, res) => {
    try {
        const chatThreadId = req.params.id;
        const messages = await model.Message.findAll({
            where: { chatThreadId, isDeleted: false },
            order: [["createdAt", "ASC"]]
        });

        return ReS(res, { success: true, data: messages }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchMessages = fetchMessages;
