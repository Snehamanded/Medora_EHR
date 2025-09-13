"use strict";
module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define(
        "Subscription",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            subscriptionTypeId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to SubscriptionType",
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to user (patient/doctor/hospital admin)",
            },

            userType: {
                type: Sequelize.ENUM("Patient", "Doctor", "Hospital"),
                allowNull: false,
                comment: "Type of subscriber",
            },

            startDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            endDate: {
                type: Sequelize.DATE,
                allowNull: false,
                comment: "Calculated based on subscription type duration",
            },

            status: {
                type: Sequelize.ENUM("Active", "Expired", "Cancelled"),
                allowNull: false,
                defaultValue: "Active",
            },

            autoRenew: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            paymentId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Reference to Payment if linked",
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
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

    Subscription.associate = (models) => {
        Subscription.belongsTo(models.SubscriptionType, {
            foreignKey: "subscriptionTypeId",
            as: "type",
        });

        if (models.Payment) {
            Subscription.belongsTo(models.Payment, {
                foreignKey: "paymentId",
                as: "payment",
            });
        }

        // optional associations (if user tables exist)
        if (models.Patient) {
            Subscription.belongsTo(models.Patient, {
                foreignKey: "userId",
                constraints: false,
                as: "patient",
            });
        }
        if (models.Doctor) {
            Subscription.belongsTo(models.Doctor, {
                foreignKey: "userId",
                constraints: false,
                as: "doctor",
            });
        }
        if (models.Hospital) {
            Subscription.belongsTo(models.Hospital, {
                foreignKey: "userId",
                constraints: false,
                as: "hospital",
            });
        }
    };

    return Subscription;
};
