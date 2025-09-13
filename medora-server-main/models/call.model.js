"use strict";
module.exports = (sequelize, Sequelize) => {
    const Call = sequelize.define(
        "Call",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            callerId: {
                type: Sequelize.BIGINT,
                allowNull: false, // FK to user/patient/doctor
            },

            receiverId: {
                type: Sequelize.BIGINT,
                allowNull: false, // FK to user/patient/doctor
            },

            appointmentId: {
                type: Sequelize.BIGINT,
                allowNull: true, // optional link to appointment
            },

            callType: {
                type: Sequelize.ENUM("audio", "video"),
                allowNull: false,
                defaultValue: "video",
            },

            status: {
                type: Sequelize.ENUM("initiated", "ringing", "accepted", "missed", "ended", "failed"),
                allowNull: false,
                defaultValue: "initiated",
            },

            startTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            endTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            durationSeconds: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            signalingData: {
                type: Sequelize.JSON,
                allowNull: true, // WebRTC offer/answer/ICE candidates
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true, // e.g. "Technical issue" / "Patient not available"
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

            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
        }
    );

    return Call;
};
