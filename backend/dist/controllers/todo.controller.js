var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo from '../models/todo.model.js'; // Adjust the path if necessary
// Helper function to send a standardized error response
const sendErrorResponse = (res, message, statusCode = 500) => {
    console.error(message); // Log the error message
    res.status(statusCode).json({ message });
};
// POST /todos: Create a new todo
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            res.status(400).json({ message: 'Title is required' });
            return;
        }
        const newTodo = yield Todo.create({
            title,
            description: description || '', // Default to empty string if not provided
            completed: false, // Default to false
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        sendErrorResponse(res, 'Failed to create todo');
    }
});
// GET /todos: Get a list of all todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.findAll();
        res.status(200).json(todos);
    }
    catch (error) {
        sendErrorResponse(res, 'Failed to fetch todos');
    }
});
// GET /todos/:id: Get a single todo by ID
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo.findByPk(id);
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(todo);
    }
    catch (error) {
        sendErrorResponse(res, 'Failed to fetch todo');
    }
});
// PUT /todos/:id: Update a todo by ID
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, completed, description } = req.body;
        if (!title && completed === undefined && !description) {
            res.status(400).json({ message: 'Provide title, completion status, or description to update' });
            return;
        }
        const [updated] = yield Todo.update({ title, completed, description }, { where: { id } });
        if (updated === 0) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        const updatedTodo = yield Todo.findByPk(id);
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        sendErrorResponse(res, 'Failed to update todo');
    }
});
// DELETE /todos/:id: Delete a todo by ID
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield Todo.destroy({
            where: { id },
        });
        if (deleted === 0) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        sendErrorResponse(res, 'Failed to delete todo');
    }
});
export default {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};
