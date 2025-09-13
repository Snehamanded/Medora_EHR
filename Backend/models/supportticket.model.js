"use strict";
module.exports = (sequelize, Sequelize) => {
    const SupportTicket = sequelize.define(
        "SupportTicket",
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            userId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "User who raised the ticket (patient/doctor/admin)",
            },

            assignedTo: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Support staff/admin assigned to resolve",
            },

            subject: {
                type: Sequelize.STRING(255),
                allowNull: false,
                comment: "Short title/subject of the issue",
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: false,
                comment: "Detailed description of the problem",
            },

            category: {
                type: Sequelize.ENUM("Technical", "Billing", "Account", "Medical", "Other"),
                allowNull: false,
                defaultValue: "Other",
            },

            priority: {
                type: Sequelize.ENUM("Low", "Medium", "High", "Critical"),
                allowNull: false,
                defaultValue: "Medium",
            },

            status: {
                type: Sequelize.ENUM("Open", "In Progress", "Resolved", "Closed", "Cancelled"),
                allowNull: false,
                defaultValue: "Open",
            },

            resolution: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Resolution notes provided by support staff",
            },

            resolvedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                comment: "When the issue was resolved/closed",
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

    SupportTicket.associate = (models) => {
        if (models.User) {
            SupportTicket.belongsTo(models.User, {
                foreignKey: "userId",
                as: "raisedBy",
            });
        }
        if (models.Admin) {
            SupportTicket.belongsTo(models.Admin, {
                foreignKey: "assignedTo",
                as: "assignedAdmin",
            });
        }
    };

    return SupportTicket;
};
