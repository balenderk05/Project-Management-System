const { Sequelize } = require('sequelize');
const config = require('./config.json');
const dbconfig = config.development;

const connection = async () => {
    const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
        host: dbconfig.host,
        dialect: dbconfig.dialect
    });

    try {
        // Authenticate connection
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connection;
