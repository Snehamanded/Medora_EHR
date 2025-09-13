"use strict";
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            userTypeId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "UserTypes",
                    key: "id",
                },
                comment: "Reference to user type (Doctor, Patient, Admin, etc.)",
            },

            firstName: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            lastName: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },

            email: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true,
            },

            passwordHash: {
                type: Sequelize.STRING(255),
                allowNull: false,
                comment: "Hashed password for authentication",
            },

            phone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },

            dateOfBirth: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },

            gender: {
                type: Sequelize.ENUM("Male", "Female", "Other"),
                allowNull: true,
            },

            profileImageUrl: {
                type: Sequelize.STRING(500),
                allowNull: true,
                comment: "URL to profile picture",
            },

            lastLogin: {
                type: Sequelize.DATE,
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

    User.associate = (models) => {
        if (models.UserType) {
            User.belongsTo(models.UserType, {
                foreignKey: "userTypeId",
                as: "userType",
            });
        }
    };

    return User;
};
