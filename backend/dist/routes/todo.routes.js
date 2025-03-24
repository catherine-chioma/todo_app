import { Router } from 'express';
import { body, param } from 'express-validator'; // Import express-validator functions
import todoController from '../controllers/todo.controller.js'; // Import the todoController object
import authenticateJWT from '../middleware/auth.middleware.js'; // Import the auth middleware

const router = Router();

// POST /todos: Create a new todo (protected route)
router.post(
    '/todos',
    [
        // JWT authentication middleware
        authenticateJWT, // Protect this route by adding the JWT middleware
        
        // Validate title - It should not be empty
        body('title')
            .notEmpty().withMessage('Title is required')
            .trim()
            .escape(),
        
        // Validate description - It should be a string (optional)
        body('description')
            .optional()
            .isString().withMessage('Description must be a string')
            .trim()
            .escape(),
        
        // Validate completed - It should be a boolean (optional)
        body('completed')
            .optional()
            .isBoolean().withMessage('Completed must be a boolean value'),
    ],
    todoController.createTodo
);

// GET /todos: Get a list of all todos (protected route)
router.get('/todos', authenticateJWT, todoController.getTodos);

// GET /todos/:id: Get a single todo by ID
router.get(
    '/todos/:id',
    [
        // Validate that the ID is a valid integer
        param('id')
            .isInt().withMessage('ID must be an integer')
    ],
    authenticateJWT, // Protect this route with JWT middleware
    todoController.getTodoById
);

// PUT /todos/:id: Update a todo by ID (protected route)
router.put(
    '/todos/:id',
    [
        // Validate ID
        param('id')
            .isInt().withMessage('ID must be an integer'),
        
        // Validate title - It should not be empty (optional)
        body('title')
            .optional()
            .notEmpty().withMessage('Title cannot be empty')
            .trim()
            .escape(),

        // Validate description - It should be a string (optional)
        body('description')
            .optional()
            .isString().withMessage('Description must be a string')
            .trim()
            .escape(),

        // Validate completed - It should be a boolean (optional)
        body('completed')
            .optional()
            .isBoolean().withMessage('Completed must be a boolean value'),
    ],
    authenticateJWT, // Protect this route with JWT middleware
    todoController.updateTodo
);

// DELETE /todos/:id: Delete a todo by ID (protected route)
router.delete(
    '/todos/:id',
    [
        // Validate that the ID is a valid integer
        param('id')
            .isInt().withMessage('ID must be an integer')
    ],
    authenticateJWT, // Protect this route with JWT middleware
    todoController.deleteTodo
);

export default router;


