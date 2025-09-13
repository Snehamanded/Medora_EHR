"use strict";
module.exports = (sequelize, Sequelize) => {
    const LabOrder = sequelize.define(
        "LabOrder",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            orderNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                comment: "Unique lab order identifier",
            },

            patientId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                comment: "Reference to the patient for whom the lab order is created",
            },

            doctorId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Reference to the doctor who ordered the test",
            },

            labTestType: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "Name/type of the lab test (e.g., CBC, Lipid Profile)",
            },

            labId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                comment: "Reference to the lab/hospital processing the test",
            },

            priority: {
                type: Sequelize.ENUM("Normal", "Urgent", "Stat"),
                allowNull: false,
                defaultValue: "Normal",
            },

            orderDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            scheduledDate: {
                type: Sequelize.DATEONLY,
                allowNull: true,
                comment: "Scheduled date for sample collection or test",
            },

            status: {
                type: Sequelize.ENUM("Pending", "In Progress", "Completed", "Cancelled"),
                allowNull: false,
                defaultValue: "Pending",
            },

            results: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: "Lab results data in structured format",
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: "Additional instructions or remarks",
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

    return LabOrder;
};
