"use strict";
module.exports = (sequelize, Sequelize) => {
    const AdminType = sequelize.define(
        "AdminType",
        {
            id: { autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },

            name: { 
                type: Sequelize.STRING, 
                allowNull: false, 
                unique: true 
            }, // e.g. "Super Admin", "Manager", "Support"

            description: { 
                type: Sequelize.STRING, 
                allowNull: true 
            }, // extra details about role

            permissions: { 
                type: Sequelize.JSON, 
                allowNull: true 
            }, 
            // store role-based permissions as JSON, e.g.
            // { "canManageUsers": true, "canDelete": false }

            isActive: { 
                type: Sequelize.BOOLEAN, 
                allowNull: false, 
                defaultValue: true 
            },

            isDeleted: { 
                type: Sequelize.BOOLEAN, 
                allowNull: false, 
                defaultValue: false 
            },

            createdAt: { 
                type: Sequelize.DATE, 
                allowNull: false, 
                defaultValue: Sequelize.NOW 
            },
            updatedAt: { 
                type: Sequelize.DATE, 
                allowNull: false, 
                defaultValue: Sequelize.NOW 
            },
        },
        { timestamps: true }
    );

    return AdminType;
};
