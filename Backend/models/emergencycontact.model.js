"use strict";
module.exports = (sequelize, Sequelize) => {
    const EmergencyContact = sequelize.define(
        "EmergencyContact",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            relatedToId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                // FK: could be Patient.id / Doctor.id
            },

            relatedToType: {
                type: Sequelize.ENUM("Patient", "Doctor", "Admin"),
                allowNull: false,
                // polymorphic relation to support multiple entities
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            relation: {
                type: Sequelize.STRING,
                allowNull: false,
                // e.g. "Father", "Mother", "Spouse", "Friend"
            },

            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },

            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            isPrimary: {
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

    return EmergencyContact;
};
