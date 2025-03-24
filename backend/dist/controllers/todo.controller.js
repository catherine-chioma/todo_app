import Todo from '../models/todo.model.js'; // Adjusted path to match the correct location
import { validationResult } from 'express-validator'; // Import validationResult to check validation errors

// Helper function to send a standardized error response
const sendErrorResponse = (res, message, statusCode = 500) => {
    console.error(message); // Log the error message
    res.status(statusCode).json({ message });
};

// POST /todos: Create a new todo
const createTodo = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, completed } = req.body;

        // Create a new Todo item
        const newTodo = await Todo.create({
            title,
            description: description || '', // Default to empty string if not provided
            completed: completed || false, // Default to false if not provided
        });

        // Send the newly created Todo item as a response
        return res.status(201).json(newTodo);
    } catch (error) {
        sendErrorResponse(res, 'Failed to create todo');
    }
};

// GET /todos: Get a list of all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll(); // Get all Todo items from the database
        return res.status(200).json(todos); // Send the list of todos as a response
    } catch (error) {
        sendErrorResponse(res, 'Failed to fetch todos');
    }
};

// GET /todos/:id: Get a single todo by ID
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id); // Find a Todo by its primary key

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json(todo); // Send the Todo item as a response
    } catch (error) {
        sendErrorResponse(res, 'Failed to fetch todo');
    }
};

// PUT /todos/:id: Update a todo by ID
const updateTodo = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { title, completed, description } = req.body;

        // Ensure at least one field is provided to update
        if (!title && completed === undefined && !description) {
            return res.status(400).json({ message: 'Provide title, completion status, or description to update' });
        }

        // Perform the update
        const [updated] = await Todo.update({ title, completed, description }, { where: { id } });

        if (updated === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Fetch the updated Todo and send it as a response
        const updatedTodo = await Todo.findByPk(id);
        return res.status(200).json(updatedTodo);
    } catch (error) {
        sendErrorResponse(res, 'Failed to update todo');
    }
};

// DELETE /todos/:id: Delete a todo by ID
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // Attempt to delete the Todo item
        const deleted = await Todo.destroy({
            where: { id },
        });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        sendErrorResponse(res, 'Failed to delete todo');
    }
};

export default {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};

