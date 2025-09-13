"use strict";
module.exports = (sequelize, Sequelize) => {
    const PatientType = sequelize.define(
        "PatientType",
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
                comment: "Type of patient (Inpatient, Outpatient, Emergency, Telemedicine)",
            },

            description: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Additional details about the patient type",
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

    return PatientType;
};
