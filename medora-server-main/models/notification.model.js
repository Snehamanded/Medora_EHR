"use strict";
module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define(
        "Notification",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "User who will receive the notification",
            },

            notificationTypeId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to NotificationType",
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Notification heading",
            },

            message: {
                type: Sequelize.TEXT,
                allowNull: false,
                comment: "Detailed message body",
            },

            isRead: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "Flag to check if user has read the notification",
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

    Notification.associate = (models) => {
        Notification.belongsTo(models.NotificationType, {
            foreignKey: "notificationTypeId",
            as: "type",
        });

        // if you have User model
        if (models.User) {
            Notification.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
            });
        }
    };

    return Notification;
};
