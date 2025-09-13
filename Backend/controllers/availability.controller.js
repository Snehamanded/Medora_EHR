const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add Availability
var add = async (req, res) => {
    try {
        const { userId, dayOfWeek, startTime, endTime, isAvailable } = req.body;

        if (!userId || !dayOfWeek || !startTime || !endTime) {
            return ReE(res, "userId, dayOfWeek, startTime and endTime are required", 400);
        }

        const availability = await model.Availability.create({
            userId,
            dayOfWeek,
            startTime,
            endTime,
            isAvailable: isAvailable !== undefined ? isAvailable : true
        });

        return ReS(res, availability, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch All Availabilities
var fetchAll = async (req, res) => {
    try {
        const availabilities = await model.Availability.findAll({
            where: { isDeleted: false },
            include: [
                { model: model.User, as: "user", attributes: ["id", "name", "email"] }
            ],
            order: [["dayOfWeek", "ASC"], ["startTime", "ASC"]]
        });

        return ReS(res, { success: true, data: availabilities }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch Availability by ID
var fetchSingle = async (req, res) => {
    try {
        const availability = await model.Availability.findByPk(req.params.id, {
            include: [
                { model: model.User, as: "user", attributes: ["id", "name", "email"] }
            ]
        });

        if (!availability || availability.isDeleted) {
            return ReE(res, "Availability not found", 404);
        }

        return ReS(res, availability, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update Availability
var updateAvailability = async (req, res) => {
    try {
        const availability = await model.Availability.findByPk(req.params.id);
        if (!availability || availability.isDeleted) {
            return ReE(res, "Availability not found", 404);
        }

        await availability.update({
            dayOfWeek: req.body.dayOfWeek || availability.dayOfWeek,
            startTime: req.body.startTime || availability.startTime,
            endTime: req.body.endTime || availability.endTime,
            isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : availability.isAvailable
        });

        return ReS(res, availability, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAvailability = updateAvailability;

// ✅ Soft Delete Availability
var deleteAvailability = async (req, res) => {
    try {
        const availability = await model.Availability.findByPk(req.params.id);
        if (!availability || availability.isDeleted) {
            return ReE(res, "Availability not found", 404);
        }

        await availability.update({ isDeleted: true });
        return ReS(res, "Availability deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAvailability = deleteAvailability;
