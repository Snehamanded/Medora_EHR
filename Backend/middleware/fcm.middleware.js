"use strict";

const admin = require("firebase-admin");
const model = require("../models/index"); // Sequelize models
const { ReE, ReS } = require("../services/util.service.js");

// Initialize Firebase Admin SDK
// Make sure you have your serviceAccountKey.json downloaded from Firebase Console
const serviceAccount = require("../config/firebase-service-account.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// ✅ Save or update FCM token for a user
const saveFcmToken = async (userId, fcmToken) => {
    try {
        if (!userId || !fcmToken) throw new Error("userId and fcmToken are required");

        // Save in DB for persistence
        const tokenRecord = await model.User.findByPk(userId);
        if (!tokenRecord) throw new Error("User not found");

        await model.User.update(
            { fcmToken },
            { where: { id: userId } }
        );

        return true;
    } catch (error) {
        console.error("FCM Token Save Error:", error);
        throw error;
    }
};

// ✅ Send a single FCM notification to one device
const sendSingleNotification = async ({ fcmToken, title, body, data = {} }) => {
    try {
        if (!fcmToken) throw new Error("fcmToken is required");

        const message = {
            token: fcmToken,
            notification: {
                title,
                body,
            },
            data,
        };

        const response = await admin.messaging().send(message);
        return response;
    } catch (error) {
        console.error("FCM Single Notification Error:", error);
        throw error;
    }
};

// ✅ Send bulk notification to multiple tokens
const sendBulkNotification = async ({ fcmTokens, title, body, data = {} }) => {
    try {
        if (!Array.isArray(fcmTokens) || fcmTokens.length === 0)
            throw new Error("fcmTokens array is required");

        const message = {
            tokens: fcmTokens,
            notification: {
                title,
                body,
            },
            data,
        };

        const response = await admin.messaging().sendMulticast(message);
        return response;
    } catch (error) {
        console.error("FCM Bulk Notification Error:", error);
        throw error;
    }
};

// ✅ Express middleware for saving token from frontend
const saveTokenMiddleware = async (req, res, next) => {
    try {
        const { userId, fcmToken } = req.body;
        await saveFcmToken(userId, fcmToken);
        return ReS(res, { success: true, message: "FCM token saved successfully" }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

// ✅ Express middleware for sending single notification from frontend
const sendNotificationMiddleware = async (req, res, next) => {
    try {
        const { fcmToken, title, body, data } = req.body;
        const result = await sendSingleNotification({ fcmToken, title, body, data });
        return ReS(res, { success: true, result }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

// ✅ Express middleware for sending bulk notifications
const sendBulkNotificationMiddleware = async (req, res, next) => {
    try {
        const { fcmTokens, title, body, data } = req.body;
        const result = await sendBulkNotification({ fcmTokens, title, body, data });
        return ReS(res, { success: true, result }, 200);
    } catch (error) {
        return ReE(res, error.message, 500);
    }
};

module.exports = {
    saveFcmToken,
    sendSingleNotification,
    sendBulkNotification,
    saveTokenMiddleware,
    sendNotificationMiddleware,
    sendBulkNotificationMiddleware,
};
