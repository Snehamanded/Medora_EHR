"use strict";
module.exports = (sequelize, Sequelize) => {
    const SymptomCategory = sequelize.define(
        "SymptomCategory",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                comment: "Name of the symptom category (e.g., Respiratory, Neurological)",
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Description of what this category covers",
            },

            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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

    SymptomCategory.associate = (models) => {
        if (models.Symptom) {
            SymptomCategory.hasMany(models.Symptom, {
                foreignKey: "categoryId",
                as: "symptoms",
            });
        }
    };

    return SymptomCategory;
};
