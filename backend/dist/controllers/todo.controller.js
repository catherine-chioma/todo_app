var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo from '../models/todo.model'; // Correct path and filename
// POST /todos: Create a new todo
export const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body; // Description can be optional
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        // Use Sequelize's create method
        const newTodo = yield Todo.create({
            title,
            description: description || '', // Default to empty string if not provided
            completed: false, // Default to false
        });
        return res.status(201).json(newTodo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create todo' });
    }
});
// GET /todos: Get a list of all todos
export const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.findAll(); // Sequelize's findAll method to get all todos
        return res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch todos' });
    }
});
// GET /todos/:id: Get a single todo by ID
export const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo.findByPk(id); // Sequelize's findByPk method to find by primary key
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.status(200).json(todo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch todo' });
    }
});
// PUT /todos/:id: Update a todo by ID
export const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, completed, description } = req.body;
        // Ensure at least one field is provided for update
        if (!title && completed === undefined && !description) {
            return res.status(400).json({ message: 'Provide title, completion status, or description to update' });
        }
        // Use Sequelize's update method
        const [updated] = yield Todo.update({ title, completed, description }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // Fetch the updated Todo
        const updatedTodo = yield Todo.findByPk(id);
        return res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update todo' });
    }
});
// DELETE /todos/:id: Delete a todo by ID
export const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Use Sequelize's destroy method
        const deleted = yield Todo.destroy({
            where: { id },
        });
        if (deleted === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.status(200).json({ message: 'Todo deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete todo' });
    }
});
