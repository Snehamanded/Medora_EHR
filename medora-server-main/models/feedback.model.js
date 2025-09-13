"use strict";
module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define(
        "Feedback",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to the user (patient/doctor/admin) giving feedback",
            },

            userType: {
                type: Sequelize.ENUM("Patient", "Doctor", "Admin"),
                allowNull: false,
                defaultValue: "Patient",
            },

            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
                comment: "Star rating (1–5)",
            },

            comments: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            category: {
                type: Sequelize.ENUM(
                    "App Experience",
                    "Doctor Consultation",
                    "Billing",
                    "Appointments",
                    "Support",
                    "Other"
                ),
                allowNull: false,
                defaultValue: "Other",
            },

            isAnonymous: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

            isResolved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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

    return Feedback;
};
