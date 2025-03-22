import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance using the DB_URL environment variable
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres', // Dialect for PostgreSQL
    logging: false, // Set to true to log SQL queries
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;

