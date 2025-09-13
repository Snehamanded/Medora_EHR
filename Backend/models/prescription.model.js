"use strict";
module.exports = (sequelize, Sequelize) => {
    const Prescription = sequelize.define(
        "Prescription",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            patientId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to patient",
            },

            doctorId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to doctor who prescribed",
            },

            appointmentId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Optional reference to appointment/visit",
            },

            diagnosis: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Diagnosis or condition description",
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Additional doctor notes",
            },

            medicines: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "List of medicines with dosage, frequency, duration, etc.",
                /**
                 * Example:
                 * [
                 *   { medicineId: 101, name: "Paracetamol", dosage: "500mg", frequency: "2 times/day", duration: "5 days" },
                 *   { medicineId: 102, name: "Amoxicillin", dosage: "250mg", frequency: "3 times/day", duration: "7 days" }
                 * ]
                 */
            },

            issuedDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            validUntil: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "Prescription validity (pharmacy rule)",
            },

            refillAllowed: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            refillCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "Number of refills already used",
            },

            maxRefills: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "Maximum refills allowed",
            },

            status: {
                type: Sequelize.ENUM("Active", "Expired", "Cancelled"),
                allowNull: false,
                defaultValue: "Active",
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

    Prescription.associate = (models) => {
        if (models.Patient) {
            Prescription.belongsTo(models.Patient, {
                foreignKey: "patientId",
                as: "patient",
            });
        }
        if (models.Doctor) {
            Prescription.belongsTo(models.Doctor, {
                foreignKey: "doctorId",
                as: "doctor",
            });
        }
        if (models.Appointment) {
            Prescription.belongsTo(models.Appointment, {
                foreignKey: "appointmentId",
                as: "appointment",
            });
        }
    };

    return Prescription;
};
