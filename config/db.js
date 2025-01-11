require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require('../config/config.json');

// const environment = process.env.NODE_ENV || 'development'; 
const dbConfig = config.development;

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
