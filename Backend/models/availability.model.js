"use strict";
module.exports = (sequelize, Sequelize) => {
    const Availability = sequelize.define(
        "Availability",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false, // e.g. Doctor / Staff ID
            },

            dayOfWeek: {
                type: Sequelize.ENUM(
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ),
                allowNull: false,
            },

            startTime: {
                type: Sequelize.TIME,
                allowNull: false,
            },

            endTime: {
                type: Sequelize.TIME,
                allowNull: false,
            },

            isRecurring: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true, // weekly recurring slot
            },

            isAvailable: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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

    return Availability;
};
