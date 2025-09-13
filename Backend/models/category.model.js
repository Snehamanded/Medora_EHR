"use strict";
module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define(
        "Category",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            parentId: {
                type: Sequelize.BIGINT,
                allowNull: true, // for subcategories
            },

            iconUrl: {
                type: Sequelize.STRING,
                allowNull: true, // optional category icon
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

    return Category;
};
