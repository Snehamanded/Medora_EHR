const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller");

router.post("/add", subscriptionController.add);
router.get("/list", subscriptionController.fetchAll);
router.get("/list/:id", subscriptionController.fetchSingle);
router.put("/update/:id", subscriptionController.updateSubscription);
router.delete("/delete/:id", subscriptionController.deleteSubscription);

module.exports = router;
