const Sequelize = require('sequelize');
require('dotenv').config();

// Creating a Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
        url: process.env.DATABASE_HOST || '127.0.0.1', // Database host
        dialect: 'mysql', // Assuming you are using MySQL
        port: process.env.DB_PORT || 3306, // Database port, default is 3306 for MySQL
        logging: false, // Disable logging; you can turn it on if you need SQL query logging
        define: {
            freezeTableName: true // Prevents Sequelize from pluralizing table names
        },
        pool: {
            max: 5, // Maximum number of connection in pool
            min: 0, // Minimum number of connection in pool
            acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
            idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
        }
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
