const express = require("express");
const router = express.Router();
const callController = require("../controllers/call.controller");
const authMiddleware = require("../middleware/auth.middleware");
const webrtcMiddleware = require("../middleware/webrtc.middleware");

// ✅ Create a new call (DB record + signed URL)
router.post("/add", authMiddleware.verifyToken, callController.add);

// ✅ Generate a secure call URL
router.post(
  "/generate-url",
  authMiddleware.verifyToken,
  (req, res) => {
    try {
      const { callerId, calleeId, callType } = req.body;

      if (!callerId || !calleeId || !callType) {
        return res.status(400).json({ message: "callerId, calleeId, and callType are required" });
      }

      const callUrl = webrtcMiddleware.generateCallUrl({ callerId, calleeId, callType });
      return res.status(200).json({ callUrl });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// ✅ Verify a call token
router.get("/verify/:token", (req, res) => {
  try {
    const decoded = webrtcMiddleware.verifyCallToken(req.params.token);
    return res.status(200).json({ valid: true, decoded });
  } catch (error) {
    return res.status(401).json({ valid: false, message: error.message });
  }
});

// ✅ Fetch all calls
router.get("/list", authMiddleware.verifyToken, callController.fetchAll);

// ✅ Fetch single call
router.get("/list/:id", authMiddleware.verifyToken, callController.fetchSingle);

// ✅ Update call record
router.put("/update/:id", authMiddleware.verifyToken, callController.updateCall);

// ✅ Soft delete call
router.delete("/delete/:id", authMiddleware.verifyToken, callController.deleteCall);

module.exports = router;
