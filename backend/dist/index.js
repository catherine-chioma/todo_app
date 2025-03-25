import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import path from 'path';
import fs from 'fs';
import todoRoutes from './routes/todo.routes';
import sequelize from './config/database';
import todoController from './controllers/todo.controller';
import TodoModel from './models/todo.model';
import { fileURLToPath } from 'url';
// Get the filename and the directory name equivalent in ES Module scope
const __filename = fileURLToPath(import.meta.url); // Gets the full path to the current file
const __dirname = path.dirname(__filename); // Derives the directory path
const app = express();
const PORT = 5000;
// Construct the path for swagger.yaml using __dirname
const swaggerPath = path.join(__dirname, 'swagger', 'swagger.yaml');
// Initialize swaggerDocument as null or an empty object
let swaggerDocument = null;
try {
    const yamlContent = fs.readFileSync(swaggerPath, 'utf8');
    swaggerDocument = YAML.load(yamlContent); // Load YAML into the swaggerDocument variable
}
catch (error) {
    console.error('Error loading swagger.yaml:', error);
}
// Debugging: Check the current directory and the existence of 'database.ts'
console.log('Current Directory:', __dirname);
console.log('File Exists:', fs.existsSync(path.join(__dirname, 'config', 'database.ts')));
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
    // Fetch all todos on startup (example of using TodoModel)
    TodoModel.findAll().then((todos) => {
        console.log('All Todos:', todos);
    }).catch((error) => {
        console.error('Error fetching todos:', error);
    });
}).catch((error) => {
    console.error('Error synchronizing the database:', error);
});
// Enable Cross-Origin Resource Sharing (CORS) for all incoming requests
app.use(cors());
// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// Setup Swagger UI if swaggerDocument is successfully loaded
if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
else {
    console.error('Swagger document is not loaded.');
}
// Use the Todo routes defined in 'todo.routes.ts' file
app.use('/api', todoRoutes);
// Define a route for the Todo API (GET /todos)
app.get('/todos', todoController.getTodos); // Correct usage of getTodos
// Start the Express server on the specified port
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log('Swagger UI is accessible at http://localhost:5000/api-docs');
});
