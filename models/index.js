'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const config = require(path.join(__dirname, '../config/config')); 
const env = process.env.NODE_ENV || 'development'; 
const db = {};

const configEnv = config[env];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, configEnv);

const fs = require('fs');
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.js' && 
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
