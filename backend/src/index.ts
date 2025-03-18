import express from 'express';  // Express is used to build the API server
import cors from 'cors';  // CORS is used to enable cross-origin requests
import swaggerUi from 'swagger-ui-express';  // Swagger UI middleware to serve the API docs
import YAML from 'js-yaml';  // YAML parser to load the Swagger YAML file
import path from 'path';  // Path module to handle file and directory paths
import fs from 'fs';  // File system module to read files
import todoRoutes from './routes/todo.routes';  // Import the routes for the Todo API
import sequelize from '../config/database';  // Sequelize instance to manage PostgreSQL database connections

// Create an Express application instance
const app = express();
const PORT = 5000;  // Define the port where the server will run

// Load Swagger definition from the YAML file
// Path to the swagger.yaml file
const swaggerPath = path.join(__dirname, 'swagger', 'swagger.yaml');

// Log the Swagger path to ensure it's correct (useful for debugging)
console.log('Swagger path:', swaggerPath);

// Declare the swaggerDocument as a generic 'any' type for now
let swaggerDocument: any; 

// Try loading the YAML file using the 'fs' and 'js-yaml' libraries
try {
  // Read the YAML file content as a string
  const yamlContent = fs.readFileSync(swaggerPath, 'utf8');
  
  // Parse the YAML content into a JavaScript object
  swaggerDocument = YAML.load(yamlContent); 
  
  // If successful, log a success message
  console.log('Swagger Document loaded successfully');
} catch (error) {
  // If there is an error loading the YAML file, log the error
  console.error('Error loading swagger.yaml:', error);
}

// PostgreSQL connection using Sequelize
// This checks the connection to the database and logs either success or failure
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');  // Success message
  })
  .catch((err) => {
    // Log the error if database connection fails
    console.error('Unable to connect to the database:', err);
  });

// Enable Cross-Origin Resource Sharing (CORS) for all incoming requests
// This allows the API to be accessed from different origins (useful for frontend applications)
app.use(cors());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Setup Swagger UI
// Mount the Swagger documentation at the '/api-docs' route
// The swaggerDocument object is passed here to render the API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use the Todo routes defined in 'todo.routes.ts' file
// These routes are mounted on the '/api' base path, e.g., '/api/todos'
app.use('/api', todoRoutes);

// Start the Express server on the specified port
// When the server starts, log the URL where the API is accessible
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);  // Inform the user where the backend is running
  console.log('Swagger UI is accessible at http://localhost:5000/api-docs');  // Provide the URL to access Swagger UI
});


























