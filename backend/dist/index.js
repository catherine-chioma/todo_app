import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes.js'; // Import the routes for todos
import sequelize from './config/database.js'; // Sequelize instance to manage PostgreSQL database connections
import TodoModel from './models/todo.model.js'; // Import TodoModel
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get the filename and the directory name equivalent in ES Module scope
const __filename = fileURLToPath(import.meta.url); // Gets the full path to the current file
const __dirname = path.dirname(__filename); // Derives the directory path

const app = express();
const PORT = process.env.PORT || 5000; // Use the PORT from the .env file

// Construct the path for swagger.yaml using __dirname
const swaggerPath = path.join(__dirname, 'swagger', 'swagger.yaml');
let swaggerDocument = null;

try {
    const yamlContent = fs.readFileSync(swaggerPath, 'utf8');
    swaggerDocument = YAML.load(yamlContent); // Load YAML into the swaggerDocument variable
} catch (error) {
    console.error('Error loading swagger.yaml:', error);
}

// PostgreSQL connection using Sequelize
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Synchronize models with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized with the model');
    TodoModel.findAll().then((todos) => {
        console.log('All Todos:', todos);
    }).catch((error) => {
        console.error('Error fetching todos:', error);
    });
}).catch((error) => {
    console.error('Error synchronizing the database:', error);
});

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Setup Swagger UI if swaggerDocument is successfully loaded
if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
    console.error('Swagger document is not loaded.');
}

// Use the Todo routes defined in 'todo.routes.js' file
app.use('/api', todoRoutes);  // Prefix routes with /api

// Start the Express server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log('Swagger UI is accessible at http://localhost:5000/api-docs');
});





