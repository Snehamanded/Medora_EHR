"use strict";
module.exports = (sequelize, Sequelize) => {
    const MedicalRecord = sequelize.define(
        "MedicalRecord",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            patientId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to the patient this record belongs to",
            },

            doctorId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Doctor responsible for creating/updating this record",
            },

            hospitalId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Hospital or clinic where this record was created",
            },

            recordType: {
                type: Sequelize.ENUM(
                    "Diagnosis",
                    "Prescription",
                    "Lab Report",
                    "Imaging",
                    "Surgery",
                    "Consultation",
                    "Other"
                ),
                allowNull: false,
                defaultValue: "Consultation",
                comment: "Type of medical record",
            },

            diagnosis: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Diagnosis summary if applicable",
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Detailed description of the medical event/visit",
            },

            prescriptions: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Prescribed medicines (JSON: name, dosage, frequency, duration)",
            },

            documents: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Attached documents (e.g., scanned reports, prescriptions)",
            },

            visitDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                comment: "Date of patient encounter",
            },

            followUpDate: {
                type: Sequelize.DATEONLY,
                allowNull: true,
                comment: "Scheduled follow-up if any",
            },

            status: {
                type: Sequelize.ENUM("Active", "Archived"),
                allowNull: false,
                defaultValue: "Active",
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Additional remarks or comments by doctor",
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

    return MedicalRecord;
};
