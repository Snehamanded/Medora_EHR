"use strict";
module.exports = (sequelize, Sequelize) => {
    const InsuranceRecord = sequelize.define(
        "InsuranceRecord",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            policyNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                comment: "Unique insurance policy number",
            },

            insuranceProvider: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Insurance company/provider name",
            },

            insuranceType: {
                type: Sequelize.ENUM("Health", "Life", "Accident", "Vehicle", "Other"),
                allowNull: false,
                defaultValue: "Health",
            },

            coverageAmount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
                comment: "Total coverage amount",
            },

            premiumAmount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
                comment: "Premium per cycle",
            },

            premiumCycle: {
                type: Sequelize.ENUM("Monthly", "Quarterly", "Half-Yearly", "Yearly", "One-Time"),
                allowNull: false,
                defaultValue: "Yearly",
            },

            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },

            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },

            insuredPersonId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to patient/user covered under this policy",
            },

            hospitalNetwork: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "List of empaneled hospitals",
            },

            status: {
                type: Sequelize.ENUM("Active", "Expired", "Cancelled", "Pending"),
                allowNull: false,
                defaultValue: "Active",
            },

            claimHistory: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Array of past claims",
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

    return InsuranceRecord;
};
