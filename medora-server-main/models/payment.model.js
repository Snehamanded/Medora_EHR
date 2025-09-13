"use strict";
module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define(
        "Payment",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            paymentTypeId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to PaymentType",
            },

            patientId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to Patient who made the payment",
            },

            appointmentId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "If linked to a specific appointment",
            },

            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                comment: "Payment amount",
            },

            currency: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "INR",
                comment: "Currency code (INR, USD, EUR, etc.)",
            },

            transactionReference: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
                comment: "External transaction ID or receipt number",
            },

            status: {
                type: Sequelize.ENUM("Pending", "Completed", "Failed", "Refunded"),
                allowNull: false,
                defaultValue: "Pending",
            },

            paymentDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
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

    Payment.associate = (models) => {
        Payment.belongsTo(models.PaymentType, {
            foreignKey: "paymentTypeId",
            as: "type",
        });

        if (models.Patient) {
            Payment.belongsTo(models.Patient, {
                foreignKey: "patientId",
                as: "patient",
            });
        }

        if (models.Appointment) {
            Payment.belongsTo(models.Appointment, {
                foreignKey: "appointmentId",
                as: "appointment",
            });
        }

        // link payments to billing records if module exists
        if (models.BillingRecord) {
            Payment.hasMany(models.BillingRecord, {
                foreignKey: "paymentId",
                as: "billingRecords",
            });
        }
    };

    return Payment;
};
