"use strict";
module.exports = (sequelize, Sequelize) => {
    const Medicine = sequelize.define(
        "Medicine",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Generic or brand name of the medicine",
            },

            genericName: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Generic name if brand name is given",
            },

            manufacturer: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Manufacturer or pharma company",
            },

            type: {
                type: Sequelize.ENUM(
                    "Tablet",
                    "Capsule",
                    "Injection",
                    "Syrup",
                    "Drops",
                    "Cream",
                    "Ointment",
                    "Inhaler",
                    "Other"
                ),
                allowNull: false,
                defaultValue: "Tablet",
                comment: "Form of the medicine",
            },

            dosageForm: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "Dosage form details e.g. 500mg, 10ml, etc.",
            },

            frequency: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "How often medicine should be taken e.g. twice daily",
            },

            duration: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: "For how long the medicine is prescribed e.g. 7 days",
            },

            route: {
                type: Sequelize.ENUM(
                    "Oral",
                    "Topical",
                    "Intravenous",
                    "Intramuscular",
                    "Subcutaneous",
                    "Inhalation",
                    "Other"
                ),
                allowNull: true,
                comment: "Route of administration",
            },

            sideEffects: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Known side effects or warnings",
            },

            interactions: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Drug-drug or food interactions",
            },

            stockQuantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
                comment: "For inventory management if used in a hospital pharmacy",
            },

            expiryDate: {
                type: Sequelize.DATEONLY,
                allowNull: true,
                comment: "Expiry date if tracked",
            },

            isPrescriptionRequired: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "Whether medicine requires prescription",
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Extra remarks or instructions",
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

    return Medicine;
};
