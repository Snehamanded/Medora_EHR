"use strict";
module.exports = (sequelize, Sequelize) => {
    const BillingRecord = sequelize.define(
        "BillingRecord",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            patientId: {
                type: Sequelize.BIGINT,
                allowNull: false, // foreign key to Patients
            },

            appointmentId: {
                type: Sequelize.BIGINT,
                allowNull: true, // optional link to appointment
            },

            invoiceNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true, // e.g. "Consultation fee", "Lab Test"
            },

            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },

            currency: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "INR", // USD, EUR, etc.
            },

            status: {
                type: Sequelize.ENUM("unpaid", "paid", "pending", "cancelled"),
                allowNull: false,
                defaultValue: "unpaid",
            },

            paymentMethod: {
                type: Sequelize.ENUM("cash", "card", "upi", "insurance", "other"),
                allowNull: true,
            },

            paidAt: {
                type: Sequelize.DATE,
                allowNull: true, // null until payment is completed
            },

            dueDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
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

    return BillingRecord;
};
