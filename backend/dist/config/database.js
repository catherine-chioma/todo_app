import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the DATABASE_URL from the environment
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false,  // Set to true if you want to log SQL queries
    dialectOptions: {
        ssl: {
            require: true, // Required for Render's SSL connection
            rejectUnauthorized: false, // Accept self-signed certificates (important for Render)
        },
    },
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;




