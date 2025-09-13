"use strict";
const CONFIG = require("../config/config");
const logger = require("../services/logger.service")

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (CONFIG.db_usePassword === "true") {
    sequelize = new Sequelize(
        CONFIG.db_name,
        CONFIG.db_user,
        CONFIG.db_password,
        {
            host: CONFIG.db_host,
            port: CONFIG.db_port,
            dialect: CONFIG.db_dialect,
            pool: {max: 20, min: 0, acquire: 30000, idle: 10000},
            logging: msg => logger.debug(msg),
        }
    );
} else {
    sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, null, {
        host: CONFIG.db_host,
        port: CONFIG.db_port,
        dialect: CONFIG.db_dialect,
        pool: {max: 20, min: 0, acquire: 30000, idle: 10000},
        logging: msg => logger.debug(msg),
    });
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;