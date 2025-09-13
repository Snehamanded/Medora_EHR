"use strict";
module.exports = (sequelize, Sequelize) => {
    const AdminStat = sequelize.define(
        "AdminStat",
        {
            id: { autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
            adminId: { 
                type: Sequelize.BIGINT, 
                allowNull: false,
                references: {
                    model: "Admins", // table name (must match Admin model)
                    key: "id"
                }
            },
            totalLogins: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
            lastLoginAt: { type: Sequelize.DATE, allowNull: true },
            actionsPerformed: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }, // total CRUD actions
            lastActionAt: { type: Sequelize.DATE, allowNull: true },
            sessionsCount: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }, // how many sessions
            avgSessionDuration: { type: Sequelize.FLOAT, allowNull: true }, // in minutes
            isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        },
        { timestamps: true }
    );

    return AdminStat;
};
