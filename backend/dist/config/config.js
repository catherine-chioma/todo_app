module.exports = {
    development: {
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'newpassword',
      database: process.env.DB_NAME || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 4190,  // Use your specific PostgreSQL port (4190)
    },
    production: {
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'newpassword',
      database: process.env.DB_NAME || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: process.env.DB_PORT || 4190,  // Use your specific PostgreSQL port (4190)
    }
  };
  
  