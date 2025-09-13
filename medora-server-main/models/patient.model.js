"use strict";
module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define(
        "Patient",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            patientTypeId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to PatientType",
            },

            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            dateOfBirth: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },

            gender: {
                type: Sequelize.ENUM("Male", "Female", "Other"),
                allowNull: false,
            },

            contactNumber: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },

            address: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            emergencyContactId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Reference to emergency contact (if exists)",
            },

            insuranceRecordId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Reference to insurance record",
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

    Patient.associate = (models) => {
        Patient.belongsTo(models.PatientType, {
            foreignKey: "patientTypeId",
            as: "type",
        });

        if (models.EmergencyContact) {
            Patient.belongsTo(models.EmergencyContact, {
                foreignKey: "emergencyContactId",
                as: "emergencyContact",
            });
        }

        if (models.InsuranceRecord) {
            Patient.belongsTo(models.InsuranceRecord, {
                foreignKey: "insuranceRecordId",
                as: "insuranceRecord",
            });
        }

        // one patient can have many appointments
        if (models.Appointment) {
            Patient.hasMany(models.Appointment, {
                foreignKey: "patientId",
                as: "appointments",
            });
        }

        // one patient can have many medical records
        if (models.MedicalRecord) {
            Patient.hasMany(models.MedicalRecord, {
                foreignKey: "patientId",
                as: "medicalRecords",
            });
        }
    };

    return Patient;
};
