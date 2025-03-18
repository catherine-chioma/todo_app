import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import path from 'path'; // Ensure path.join is used for building file paths
import todoRoutes from './routes/todo.routes'; // Adjust path to todo.routes.ts
import sequelize from '../config/database'; // Import the sequelize instance for connecting to PostgreSQL

// Load Swagger definition from the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml')) as object;

const app = express();
const PORT = 5000;

// PostgreSQL connection using Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use Todo routes
app.use('/api', todoRoutes); // Mount Todo routes at `/api`

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});





















