import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set!');
    process.exit(1); // Exit if DATABASE_URL is not available
}

// Log DATABASE_URL to check if it's loaded correctly (Remove in production for security reasons)
if (process.env.NODE_ENV !== 'production') {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);  // Log only in non-production environments
}

// Create a new Sequelize instance using the DATABASE_URL environment variable
const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

// Graceful shutdown on signals
const shutdown = (signal) => {
    console.log(`Received ${signal}, closing the database connection...`);
    sequelize.close().then(() => {
        console.log('Database connection closed.');
        process.exit(0);
    }).catch(err => {
        console.error('Error closing the database connection:', err);
        process.exit(1);
    });
};

process.on('SIGINT', shutdown);  // For Ctrl+C
process.on('SIGTERM', shutdown); // For termination signal

// Export the sequelize instance
export default sequelize;




