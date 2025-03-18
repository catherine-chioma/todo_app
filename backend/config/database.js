import { Sequelize } from 'sequelize';
// Create a new Sequelize instance
const sequelize = new Sequelize('your-database', 'your-username', 'your-password', {
    host: 'localhost',
    dialect: 'postgres', // Dialect for PostgreSQL
    port: 5432, // Default port for PostgreSQL
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
