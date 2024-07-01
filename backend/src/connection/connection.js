const Sequelize = require('sequelize');

console.log('process.env.database: ', process.env.database);
const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
    host: process.env.host,
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 1000 }
});

const connection = async () => {
    try {
        // Authenticate to the default database (e.g., 'mysql')
        await sequelize.authenticate();

        // Create the 'demo' database if it does not exist
        await sequelize.query('CREATE DATABASE IF NOT EXISTS demo');

        console.log('Database "demo" created or already exists.');

        // Switch to the 'demo' database
        sequelize.options.database = 'demo';

        // Re-authenticate with the 'demo' database
        await sequelize.authenticate();

        console.log('Connection established to the "demo" database.');
    } catch (err) {
        console.error(`Error in connection: ${err.message}`);
    }
};

module.exports = { connection, sequelize };
