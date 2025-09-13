"use strict";
module.exports = (sequelize, Sequelize) => {
    const NotificationType = sequelize.define(
        "NotificationType",
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
                comment: "Name of the notification type (e.g., appointment, alert, system)",
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Description of this notification type",
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

    return NotificationType;
};
