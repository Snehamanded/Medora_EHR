"use strict";
module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define(
        "Appointment",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },

            patientId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },

            doctorId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },

            appointmentType: {
                type: Sequelize.ENUM("virtual", "onsite"),
                allowNull: false,
                defaultValue: "onsite"
            },

            scheduledAt: {
                type: Sequelize.DATE,
                allowNull: false
            },

            reason: {
                type: Sequelize.STRING,
                allowNull: true
            },

            status: {
                type: Sequelize.ENUM("pending", "confirmed", "completed", "cancelled", "rescheduled"),
                allowNull: false,
                defaultValue: "pending"
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            createdBy: {
                type: Sequelize.BIGINT,
                allowNull: false
            },

            updatedBy: {
                type: Sequelize.BIGINT,
                allowNull: true
            },

            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        },
        {
            timestamps: true,
        }
    );

    return Appointment;
};
