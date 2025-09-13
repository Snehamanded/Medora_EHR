"use strict";
module.exports = (sequelize, Sequelize) => {
    const FAQ = sequelize.define(
        "FAQ",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            question: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            answer: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            category: {
                type: Sequelize.ENUM(
                    "General",
                    "Patient",
                    "Doctor",
                    "Admin",
                    "Billing",
                    "Appointments",
                    "Privacy",
                    "Technical"
                ),
                allowNull: false,
                defaultValue: "General",
            },

            tags: {
                type: Sequelize.JSON, // for searching FAQs
                allowNull: true,
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

    return FAQ;
};
