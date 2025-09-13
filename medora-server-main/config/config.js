if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  let CONFIG = {};
  
  CONFIG.app = process.env.APP || "dev";
  CONFIG.port = process.env.PORT || "3000";
  
  // Database Config
  CONFIG.db_dialect = process.env.DB_DAILECT || "mysql";
  CONFIG.db_host = process.env.DB_HOST || "localhost";
  CONFIG.db_container = process.env.DB_CONTAINER || "mysql_container";
  CONFIG.db_port = process.env.DB_PORT || "3306";
  CONFIG.db_name = process.env.DB_NAME || "name";
  CONFIG.db_user = process.env.DB_USER || "root";
  CONFIG.db_password = process.env.DB_PASSWORD || "db-password";
  CONFIG.db_usePassword = process.env.DB_USE_PASSWORD || "true";
  
  // Firebase
  CONFIG.firebaseDB_URL = process.env.FIREBASEDB_URL || 'db-url';
  
  // SMTP
  CONFIG.smtpKey = process.env.SMTP_KEY || 'smtpapikey';
  
  module.exports = CONFIG;