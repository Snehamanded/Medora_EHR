const express = require("express");
const router = express.Router();
const documentTypeController = require("../controllers/documenttype.controller");

router.post("/add", documentTypeController.add);
router.get("/list", documentTypeController.fetchAll);
router.get("/list/:id", documentTypeController.fetchSingle);
router.put("/update/:id", documentTypeController.updateDocumentType);
router.delete("/delete/:id", documentTypeController.deleteDocumentType);

module.exports = router;
