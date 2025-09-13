"use strict";
module.exports = (sequelize, Sequelize) => {
    const Announcement = sequelize.define(
        "Announcement",
        {
            id: { 
                autoIncrement: true, 
                primaryKey: true, 
                type: Sequelize.BIGINT 
            },

            title: { 
                type: Sequelize.STRING, 
                allowNull: false 
            }, 

            message: { 
                type: Sequelize.TEXT, 
                allowNull: false 
            }, 

            type: { 
                type: Sequelize.ENUM("info", "warning", "update", "event"), 
                allowNull: false, 
                defaultValue: "info" 
            }, 

            audience: { 
                type: Sequelize.ENUM("all", "admins", "users", "specific"), 
                allowNull: false, 
                defaultValue: "all" 
            }, 

            startDate: { 
                type: Sequelize.DATE, 
                allowNull: true 
            }, 

            endDate: { 
                type: Sequelize.DATE, 
                allowNull: true 
            }, 

            createdBy: { 
                type: Sequelize.BIGINT, 
                allowNull: false 
            }, 

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
        { 
            timestamps: true,
        }
    );

    return Announcement;
};
