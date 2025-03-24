import { Sequelize } from 'sequelize';

// Use the external database URL provided by Render
const databaseUrl = process.env.DATABASE_URL || 'postgresql://my_todo_db_vrzv_user:2Rh2wC1bAZjFzFsggIvRNR8BiJO8q6ly@dpg-cvg6tlqj1k6c73abalc0-a.oregon-postgres.render.com/my_todo_db_vrzv';

// Ensure that the DATABASE_URL is set, throw an error if not
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is missing!");
}

// Parse the Render PostgreSQL database URL
const { username, password, host, port, pathname } = new URL(databaseUrl);

// Extract the database name from the pathname (remove the leading "/")
const database = pathname.substring(1);

// Sequelize instance creation using Render's external database URL
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  port: parseInt(port),  // Ensure the port is parsed as an integer
  logging: false,  // Disable logging for cleaner output; you can change this to `true` for debugging
});

export default sequelize;








