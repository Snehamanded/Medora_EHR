"use strict";
module.exports = (sequelize, Sequelize) => {
    const SubscriptionType = sequelize.define(
        "SubscriptionType",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                comment: "Name of subscription plan (Free, Premium, Gold, etc.)",
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Description of subscription benefits",
            },

            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.0,
                comment: "Subscription cost",
            },

            durationInDays: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 30,
                comment: "Duration of plan in days",
            },

            features: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Plan features stored as JSON",
            },

            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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

    SubscriptionType.associate = (models) => {
        SubscriptionType.hasMany(models.Subscription, {
            foreignKey: "subscriptionTypeId",
            as: "subscriptions",
        });
    };

    return SubscriptionType;
};
