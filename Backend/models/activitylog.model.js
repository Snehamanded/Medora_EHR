"use strict";
module.exports = (sequelize, Sequelize) => {
    const ActivityLog = sequelize.define(
        "ActivityLog",
        {
            id: { autoIncrement: true, primaryKey: true, type: Sequelize.BIGINT },
            logId: { type: Sequelize.STRING, allowNull: false }, // Firestore logId equivalent
            userId: { type: Sequelize.STRING, allowNull: false }, // who triggered the activity
            action: { type: Sequelize.STRING, allowNull: false }, // what action was performed
            entity: { type: Sequelize.STRING, allowNull: true },  // which entity/resource affected
            details: { type: Sequelize.JSON, allowNull: true },   // extra metadata
            ipAddress: { type: Sequelize.STRING, allowNull: true }, // optional, for security logs
            userAgent: { type: Sequelize.STRING, allowNull: true }, // browser/device info
            timestamp: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
        },
        { timestamps: true }
    );

    return ActivityLog;
};
