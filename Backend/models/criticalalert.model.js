"use strict";
module.exports = (sequelize, Sequelize) => {
    const CriticalAlert = sequelize.define(
        "CriticalAlert",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            alertType: {
                type: Sequelize.STRING,
                allowNull: false,
                // e.g. "medical", "system", "security", "billing"
            },

            message: {
                type: Sequelize.TEXT,
                allowNull: false,
                // description of the alert
            },

            severity: {
                type: Sequelize.ENUM("low", "medium", "high", "critical"),
                allowNull: false,
                defaultValue: "medium",
            },

            relatedEntityId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                // e.g. link to patientId, appointmentId, deviceId
            },

            relatedEntityType: {
                type: Sequelize.STRING,
                allowNull: true,
                // e.g. "Patient", "Appointment", "Device"
            },

            acknowledged: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            acknowledgedBy: {
                type: Sequelize.BIGINT,
                allowNull: true, // userId of the person who acknowledged
            },

            acknowledgedAt: {
                type: Sequelize.DATE,
                allowNull: true, // when it was acknowledged
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

    return CriticalAlert;
};
