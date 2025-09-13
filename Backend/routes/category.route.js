const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/add", categoryController.add);
router.get("/list", categoryController.fetchAll);
router.get("/list/:id", categoryController.fetchSingle);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
