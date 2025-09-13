const express = require("express");
const router = express.Router();
const symptomCategoryController = require("../controllers/symptomcategory.controller");

router.post("/add", symptomCategoryController.add);
router.get("/list", symptomCategoryController.fetchAll);
router.get("/list/:id", symptomCategoryController.fetchSingle);
router.put("/update/:id", symptomCategoryController.updateSymptomCategory);
router.delete("/delete/:id", symptomCategoryController.deleteSymptomCategory);

module.exports = router;
