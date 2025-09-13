"use strict";
module.exports = (sequelize, Sequelize) => {
    const AuditLog = sequelize.define(
        "AuditLog",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false
            },

            action: {
                type: Sequelize.STRING,
                allowNull: false
            },

            entity: {
                type: Sequelize.STRING,
                allowNull: false
            },

            entityId: {
                type: Sequelize.BIGINT,
                allowNull: true
            },

            oldValue: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            newValue: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            ipAddress: {
                type: Sequelize.STRING,
                allowNull: true
            },

            userAgent: {
                type: Sequelize.STRING,
                allowNull: true
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

            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            timestamps: true,
        }
    );

    return AuditLog;
};
