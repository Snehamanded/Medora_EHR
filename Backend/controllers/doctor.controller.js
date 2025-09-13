const model = require("../models/index");
const { ReE, ReS } = require("../services/util.service.js");

// ✅ Add a new Doctor
var add = async (req, res) => {
    try {
        const { name, specialty, email, phone } = req.body;
        if (!name || !specialty) return ReE(res, "Name and specialty are required", 400);

        const doctor = await model.Doctor.create({
            name,
            specialty,
            email: email || null,
            phone: phone || null
        });

        return ReS(res, doctor, 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.add = add;

// ✅ Fetch all Doctors
var fetchAll = async (req, res) => {
    try {
        const doctors = await model.Doctor.findAll({
            where: { isDeleted: false },
            order: [["createdAt", "DESC"]]
        });
        return ReS(res, { success: true, data: doctors }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchAll = fetchAll;

// ✅ Fetch a single Doctor by ID
var fetchSingle = async (req, res) => {
    try {
        const doctor = await model.Doctor.findByPk(req.params.id, {
            include: [{ model: model.Patient, as: "patientsTreated" }]
        });

        if (!doctor || doctor.isDeleted) return ReE(res, "Doctor not found", 404);
        return ReS(res, doctor, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchSingle = fetchSingle;

// ✅ Update a Doctor
var updateDoctor = async (req, res) => {
    try {
        const doctor = await model.Doctor.findByPk(req.params.id);
        if (!doctor || doctor.isDeleted) return ReE(res, "Doctor not found", 404);

        await doctor.update({
            name: req.body.name || doctor.name,
            specialty: req.body.specialty || doctor.specialty,
            email: req.body.email || doctor.email,
            phone: req.body.phone || doctor.phone
        });

        return ReS(res, doctor, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.updateDoctor = updateDoctor;

// ✅ Soft Delete a Doctor
var deleteDoctor = async (req, res) => {
    try {
        const doctor = await model.Doctor.findByPk(req.params.id);
        if (!doctor || doctor.isDeleted) return ReE(res, "Doctor not found", 404);

        await doctor.update({ isDeleted: true });
        return ReS(res, "Doctor deleted successfully", 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.deleteDoctor = deleteDoctor;

// ✅ Add a Patient to Doctor's Treated List
var addPatient = async (req, res) => {
    try {
        const { doctorId, patientId } = req.body;
        if (!doctorId || !patientId) return ReE(res, "doctorId and patientId are required", 400);

        const doctor = await model.Doctor.findByPk(doctorId);
        if (!doctor || doctor.isDeleted) return ReE(res, "Doctor not found", 404);

        const patient = await model.Patient.findByPk(patientId);
        if (!patient || patient.isDeleted) return ReE(res, "Patient not found", 404);

        await model.PatientTreated.create({
            doctorId,
            patientId
        });

        return ReS(res, "Patient added to doctor's treated list", 201);
    } catch (error) {
        return ReE(res, error.message, 422);
    }
};
module.exports.addPatient = addPatient;

// ✅ Fetch Patients treated by a Doctor
var fetchPatients = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await model.Doctor.findByPk(doctorId, {
            include: [{ model: model.Patient, as: "patientsTreated" }]
        });

        if (!doctor || doctor.isDeleted) return ReE(res, "Doctor not found", 404);
        return ReS(res, { success: true, data: doctor.patientsTreated }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};
module.exports.fetchPatients = fetchPatients;
