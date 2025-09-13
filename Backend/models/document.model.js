"use strict";
module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define(
        "Document",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false,
                // descriptive title, e.g. "Blood Test Report - Aug 2025"
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            fileUrl: {
                type: Sequelize.STRING,
                allowNull: false,
                // storage path or external URL (Firebase / S3 / GCS)
            },

            fileType: {
                type: Sequelize.STRING,
                allowNull: true,
                // MIME type (e.g. application/pdf, image/png, etc.)
            },

            documentTypeId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "DocumentTypes",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },

            uploadedBy: {
                type: Sequelize.BIGINT,
                allowNull: false,
                // userId of who uploaded
            },

            relatedEntityId: {
                type: Sequelize.BIGINT,
                allowNull: true,
                // can be patientId, appointmentId, insuranceId, etc.
            },

            relatedEntityType: {
                type: Sequelize.STRING,
                allowNull: true,
                // "Patient", "Doctor", "Appointment", "Insurance"
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

    return Document;
};
