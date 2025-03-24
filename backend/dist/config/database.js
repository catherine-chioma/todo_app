import { Sequelize } from 'sequelize';

// External PostgreSQL URL from Render (example)
const DATABASE_URL = 'postgres://username:password@your-database-host.onrender.com:5432/your-database';

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false,  // Set to true if you want to log SQL queries
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;

