const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// ✅ Import all route files
const activityLogRouter = require("./activitylog.route");
const adminRouter = require("./admin.route");
const adminStatRouter = require("./adminstat.route");
const adminTypeRouter = require("./admintype.route");
const announcementRouter = require("./announcement.route");
const appointmentRouter = require("./appointment.route");
const auditLogRouter = require("./auditlog.route");
const availabilityRouter = require("./availability.route");
const billingRecordRouter = require("./billingrecord.route");
const callRouter = require("./call.route");
const categoryRouter = require("./category.route");
const chatThreadRouter = require("./chatthread.route");
const criticalAlertRouter = require("./criticalalert.route");
const doctorRouter = require("./doctor.route");
const documentRouter = require("./document.route");
const documentTypeRouter = require("./documenttype.route");
const emergencyContactRouter = require("./emergencycontact.route");
const engagementLogRouter = require("./engagementlog.route");
const faqRouter = require("./faq.route");
const feedbackRouter = require("./feedback.route");
const geminiRouter = require("./gemini.route");
const hospitalRouter = require("./hospital.route");
const huggingfaceRouter = require("./huggingface.route");
const insuranceRecordRouter = require("./insurancerecord.route");
const labOrderRouter = require("./laborder.route");
const medicalRecordRouter = require("./medicalrecord.route");
const medicineRouter = require("./medicine.route");
const modeRouter = require("./mode.route");
const notificationRouter = require("./notification.route");
const notificationTypeRouter = require("./notificationtype.route");
const patientRouter = require("./patient.route");
const patientTypeRouter = require("./patienttype.route");
const paymentRouter = require("./payment.route");
const paymentTypeRouter = require("./paymenttype.route");
const prescriptionRouter = require("./prescription.route");
const subscriptionRouter = require("./subscription.route");
const subscriptionTypeRouter = require("./subscriptiontype.route");
const supportTicketRouter = require("./supportticket.route");
const symptomCategoryRouter = require("./symptomcategory.route");
const userRouter = require("./user.route");
const userTypeRouter = require("./usertype.route");

// ✅ Server Health Check
router.get("/health", (req, res) => {
    res.status(200).send("Healthy Server!");
});

// ---------------------
// ⚠️ Public Routes
// ---------------------
router.use("/user", userRouter); // signup, signin, forgot/reset password

// ✅ Register routes
// ---------------------
// 🔒 Protected Routes
// ---------------------
router.use(authMiddleware.verifyToken); // Apply JWT verification middleware globally for the following routes

router.use("/activitylog", activityLogRouter);
router.use("/admin", adminRouter);
router.use("/adminstat", adminStatRouter);
router.use("/admintype", adminTypeRouter);
router.use("/announcement", announcementRouter);
router.use("/appointment", appointmentRouter);
router.use("/auditlog", auditLogRouter);
router.use("/availability", availabilityRouter);
router.use("/billingrecord", billingRecordRouter);
router.use("/call", callRouter);
router.use("/category", categoryRouter);
router.use("/chatthread", chatThreadRouter);
router.use("/criticalalert", criticalAlertRouter);
router.use("/doctor", doctorRouter);
router.use("/document", documentRouter);
router.use("/documenttype", documentTypeRouter);
router.use("/emergencycontact", emergencyContactRouter);
router.use("/engagementlog", engagementLogRouter);
router.use("/faq", faqRouter);
router.use("/feedback", feedbackRouter);
router.use("/gemini", geminiRouter);
router.use("/hospital", hospitalRouter);
router.use("/huggingface", huggingfaceRouter);
router.use("/insurancerecord", insuranceRecordRouter);
router.use("/laborder", labOrderRouter);
router.use("/medicalrecord", medicalRecordRouter);
router.use("/medicine", medicineRouter);
router.use("/mode", modeRouter);
router.use("/notification", notificationRouter);
router.use("/notificationtype", notificationTypeRouter);
router.use("/patient", patientRouter);
router.use("/patienttype", patientTypeRouter);
router.use("/payment", paymentRouter);
router.use("/paymenttype", paymentTypeRouter);
router.use("/prescription", prescriptionRouter);
router.use("/subscription", subscriptionRouter);
router.use("/subscriptiontype", subscriptionTypeRouter);
router.use("/supportticket", supportTicketRouter);
router.use("/symptomcategory", symptomCategoryRouter);
router.use("/usertype", userTypeRouter);

module.exports = router;
