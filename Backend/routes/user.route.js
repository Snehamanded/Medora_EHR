const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/add", userController.add);
router.get("/list", userController.fetchAll);
router.get("/list/:id", userController.fetchSingle);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
