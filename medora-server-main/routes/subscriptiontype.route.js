const express = require("express");
const router = express.Router();
const subscriptionTypeController = require("../controllers/subscriptiontype.controller");

router.post("/add", subscriptionTypeController.add);
router.get("/list", subscriptionTypeController.fetchAll);
router.get("/list/:id", subscriptionTypeController.fetchSingle);
router.put("/update/:id", subscriptionTypeController.updateSubscriptionType);
router.delete("/delete/:id", subscriptionTypeController.deleteSubscriptionType);

module.exports = router;
