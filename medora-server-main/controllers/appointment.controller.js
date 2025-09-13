const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Appointment
var add = async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate, appointmentType, reason } = req.body;

        if (!patientId || !doctorId || !appointmentDate) {
            return ReE(res, "patientId, doctorId and appointmentDate are required", 400);
        }

        const appointment = await model.Appointment.create({
            patientId,
            doctorId,
            appointmentDate,
            appointmentType: appointmentType || "virtual", // default type
            reason,
            status: "scheduled", // default status
            isDeleted: false
        });

        return ReS(res, appointment, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Appointments
var fetchAll = async (req, res) => {
    try {
        const appointments = await model.Appointment.findAll({
            where: { isDeleted: false },
            order: [["appointmentDate", "ASC"]],
            include: [
                { model: model.Patient, as: "patient", attributes: ["id", "name", "email"] },
                { model: model.Doctor, as: "doctor", attributes: ["id", "name", "specialization"] }
            ]
        });
        return ReS(res, { success: true, data: appointments }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Appointment by ID
var fetchSingle = async (req, res) => {
    try {
        const appointment = await model.Appointment.findByPk(req.params.id, {
            include: [
                { model: model.Patient, as: "patient", attributes: ["id", "name", "email"] },
                { model: model.Doctor, as: "doctor", attributes: ["id", "name", "specialization"] }
            ]
        });

        if (!appointment || appointment.isDeleted) {
            return ReE(res, "Appointment not found", 404);
        }

        return ReS(res, appointment, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update an Appointment
var updateAppointment = async (req, res) => {
    try {
        const appointment = await model.Appointment.findByPk(req.params.id);
        if (!appointment || appointment.isDeleted) {
            return ReE(res, "Appointment not found", 404);
        }

        await appointment.update({
            appointmentDate: req.body.appointmentDate || appointment.appointmentDate,
            appointmentType: req.body.appointmentType || appointment.appointmentType,
            reason: req.body.reason || appointment.reason,
            status: req.body.status || appointment.status
        });

        return ReS(res, appointment, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateAppointment = updateAppointment;

// ✅ Soft Delete an Appointment
var deleteAppointment = async (req, res) => {
    try {
        const appointment = await model.Appointment.findByPk(req.params.id);
        if (!appointment || appointment.isDeleted) {
            return ReE(res, "Appointment not found", 404);
        }

        await appointment.update({ isDeleted: true, status: "cancelled" });
        return ReS(res, "Appointment deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteAppointment = deleteAppointment;
