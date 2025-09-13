const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/auditlog.controller");

router.post("/add", auditLogController.add);
router.get("/list", auditLogController.fetchAll);
router.get("/list/:id", auditLogController.fetchSingle);
router.put("/update/:id", auditLogController.updateAuditLog);
router.delete("/delete/:id", auditLogController.deleteAuditLog);

module.exports = router;
