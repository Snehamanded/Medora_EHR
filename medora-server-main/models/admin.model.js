"use strict";
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define(
        "Admin",
        {
            id: { autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
            adminId: { type: Sequelize.STRING, allowNull: false, unique: true }, // unique identifier for admin
            name: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false, unique: true },
            passwordHash: { type: Sequelize.STRING, allowNull: false }, // store hashed password
            role: { type: Sequelize.STRING, allowNull: false, defaultValue: "superadmin" }, // superadmin, manager, support, etc.
            phone: { type: Sequelize.STRING, allowNull: true },
            lastLoginAt: { type: Sequelize.DATE, allowNull: true },
            isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
            isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        },
        { timestamps: true }
    );

    return Admin;
};
