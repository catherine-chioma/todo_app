import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Log DB_URL to check if it's loaded correctly (Remove in production for security reasons)
console.log('DB_URL:', process.env.DB_URL);

// Ensure DB_URL is set
if (!process.env.DB_URL) {
    console.error('DB_URL environment variable is not set!');
    process.exit(1); // Exit if DB_URL is not available
}

// Create a new Sequelize instance using the DB_URL environment variable
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres', // Dialect for PostgreSQL
    logging: false, // Set to true to log SQL queries
    dialectOptions: {
        ssl: {
            require: true, // Ensure SSL connection is required
            rejectUnauthorized: false, // Disable certificate validation (needed for cloud databases)
        },
    },
});

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit process if unable to connect to the DB
    });

// Export the sequelize instance
export default sequelize;


