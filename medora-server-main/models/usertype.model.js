"use strict";
module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define(
        "UserType",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
                comment: "Type of user (e.g., Doctor, Patient, Admin, Staff)",
            },

            description: {
                type: Sequelize.STRING(255),
                allowNull: true,
                comment: "Optional description of the role/type",
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

    UserType.associate = (models) => {
        if (models.User) {
            UserType.hasMany(models.User, {
                foreignKey: "userTypeId",
                as: "users",
            });
        }
    };

    return UserType;
};
