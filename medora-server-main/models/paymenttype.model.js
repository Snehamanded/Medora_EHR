"use strict";
module.exports = (sequelize, Sequelize) => {
    const PaymentType = sequelize.define(
        "PaymentType",
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
                comment: "Type of payment (Cash, Card, UPI, Insurance, etc.)",
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Extra info about the payment type",
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

    return PaymentType;
};
