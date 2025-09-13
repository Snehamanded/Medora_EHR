"use strict";
module.exports = (sequelize, Sequelize) => {
    const EngagementLog = sequelize.define(
        "EngagementLog",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                // FK: reference to Patient / Doctor / Admin
            },

            userType: {
                type: Sequelize.ENUM("Patient", "Doctor", "Admin"),
                allowNull: false,
            },

            actionType: {
                type: Sequelize.ENUM(
                    "Login",
                    "Logout",
                    "Chat",
                    "Call",
                    "AppointmentBooked",
                    "AppointmentCompleted",
                    "PrescriptionGiven",
                    "FileUpload",
                    "Other"
                ),
                allowNull: false,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            ipAddress: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            deviceInfo: {
                type: Sequelize.STRING,
                allowNull: true,
                // e.g. Android/iOS app, Chrome browser, etc.
            },

            sessionId: {
                type: Sequelize.STRING,
                allowNull: true,
                // to group actions under a session
            },

            metadata: {
                type: Sequelize.JSON,
                allowNull: true,
                // flexible field for extra data
            },

            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },
        {
            timestamps: true,
        }
    );

    return EngagementLog;
};
