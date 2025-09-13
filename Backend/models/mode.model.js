"use strict";
module.exports = (sequelize, Sequelize) => {
    const Mode = sequelize.define(
        "Mode",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                comment: "Name of the mode (e.g., Online, Offline, Hybrid, Telemedicine)",
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Detailed description of what this mode represents",
            },

            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "Whether this mode is currently available",
            },

            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Soft delete flag",
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

    return Mode;
};
