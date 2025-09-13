const express = require("express");
const router = express.Router();
const supportTicketController = require("../controllers/supportticket.controller");

router.post("/add", supportTicketController.add);
router.get("/list", supportTicketController.fetchAll);
router.get("/list/:id", supportTicketController.fetchSingle);
router.put("/update/:id", supportTicketController.updateSupportTicket);
router.delete("/delete/:id", supportTicketController.deleteSupportTicket);

module.exports = router;
