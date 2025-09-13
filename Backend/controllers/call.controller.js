const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");
const { generateVideoCallUrl } = require("../middleware/webrtc.middleware.js"); // ✅ Import middleware

// ✅ Create a Call Record
var add = async (req, res) => {
    try {
        const { callerId, receiverId, appointmentId, callType, status } = req.body;

        if (!callerId || !receiverId) {
            return ReE(res, "callerId and receiverId are required", 400);
        }

        // ✅ Use middleware to generate video call url
        const videoCallUrl = generateVideoCallUrl(callerId, receiverId);

        const call = await model.Call.create({
            callerId,
            receiverId,
            appointmentId: appointmentId || null,
            callType: callType || "video", // audio | video
            status: status || "initiated", // initiated | ongoing | completed | missed | failed
            videoCallUrl
        });

        return ReS(res, call, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch All Calls
var fetchAll = async (req, res) => {
    try {
        const calls = await model.Call.findAll({
            where: { isDeleted: false },
            include: [
                { model: model.User, as: "caller", attributes: ["id", "name", "email"] },
                { model: model.User, as: "receiver", attributes: ["id", "name", "email"] },
                { model: model.Appointment, as: "appointment", attributes: ["id", "appointmentDate", "status"] }
            ],
            order: [["createdAt", "DESC"]]
        });

        return ReS(res, { success: true, data: calls }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch Single Call
var fetchSingle = async (req, res) => {
    try {
        const call = await model.Call.findByPk(req.params.id, {
            include: [
                { model: model.User, as: "caller", attributes: ["id", "name", "email"] },
                { model: model.User, as: "receiver", attributes: ["id", "name", "email"] },
                { model: model.Appointment, as: "appointment", attributes: ["id", "appointmentDate", "status"] }
            ]
        });

        if (!call || call.isDeleted) {
            return ReE(res, "Call not found", 404);
        }

        return ReS(res, call, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update Call Record
var updateCall = async (req, res) => {
    try {
        const call = await model.Call.findByPk(req.params.id);
        if (!call || call.isDeleted) {
            return ReE(res, "Call not found", 404);
        }

        await call.update({
            appointmentId: req.body.appointmentId || call.appointmentId,
            callType: req.body.callType || call.callType,
            status: req.body.status || call.status,
            videoCallUrl: req.body.videoCallUrl || call.videoCallUrl
        });

        return ReS(res, call, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateCall = updateCall;

// ✅ Soft Delete Call Record
var deleteCall = async (req, res) => {
    try {
        const call = await model.Call.findByPk(req.params.id);
        if (!call || call.isDeleted) {
            return ReE(res, "Call not found", 404);
        }

        await call.update({ isDeleted: true });
        return ReS(res, "Call deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteCall = deleteCall;
