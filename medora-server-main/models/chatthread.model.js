"use strict";
module.exports = (sequelize, Sequelize) => {
    const ChatThread = sequelize.define(
        "ChatThread",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            title: {
                type: Sequelize.STRING,
                allowNull: true, // optional, e.g. "Consultation with Dr. Smith"
            },

            participants: {
                type: Sequelize.JSON, 
                allowNull: false, 
                // store user IDs, e.g. [1, 25, 32] or [{userId: 1, role: "doctor"}]
            },

            lastMessage: {
                type: Sequelize.TEXT,
                allowNull: true, // preview of last message for quick access
            },

            lastMessageAt: {
                type: Sequelize.DATE,
                allowNull: true, // timestamp of last message
            },

            createdBy: {
                type: Sequelize.BIGINT,
                allowNull: false, // user who initiated the thread
            },

            isGroup: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false, // true if group chat
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

    return ChatThread;
};
