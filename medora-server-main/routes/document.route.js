const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");

router.post("/add", documentController.add);
router.get("/list", documentController.fetchAll);
router.get("/list/:id", documentController.fetchSingle);
router.put("/update/:id", documentController.updateDocument);
router.delete("/delete/:id", documentController.deleteDocument);

module.exports = router;
