"use strict";
module.exports = (sequelize, Sequelize) => {
    const Hospital = sequelize.define(
        "Hospital",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Hospital name",
            },

            registrationNumber: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
                comment: "Govt. or medical council registration/licence number",
            },

            type: {
                type: Sequelize.ENUM("General", "Specialty", "Clinic", "Teaching", "Other"),
                allowNull: false,
                defaultValue: "General",
            },

            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            country: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "India",
            },

            pincode: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            contactNumber: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: { isEmail: true },
            },

            website: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: { isUrl: true },
            },

            emergencyAvailable: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            bedCapacity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            establishedYear: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            accreditation: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "e.g., NABH, JCI, ISO",
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

    return Hospital;
};
