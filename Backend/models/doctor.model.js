"use strict";
module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define(
        "Doctor",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },

            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            specialization: {
                type: Sequelize.STRING,
                allowNull: false,
                // e.g. "Cardiologist", "Dermatologist", "Psychiatrist"
            },

            licenseNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            qualification: {
                type: Sequelize.STRING,
                allowNull: true,
                // e.g. "MBBS, MD"
            },

            experienceYears: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            hospitalAffiliation: {
                type: Sequelize.STRING,
                allowNull: true,
                // primary hospital/clinic they work with
            },

            availabilityStatus: {
                type: Sequelize.ENUM("Available", "Busy", "On Leave"),
                allowNull: false,
                defaultValue: "Available",
            },

            isVerified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                // true after admin verifies credentials
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

    return Doctor;
};
