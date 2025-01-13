require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require('../config/config');

const environment = process.env.NODE_PROD

// Get the configuration for the current environment
const dbConfig = config[environment];

// console.log("DB_CONFIG", dbConfig);
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
