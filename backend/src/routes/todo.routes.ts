import { Router } from 'express';
import todoController from '../controllers/todo.controller.js'; // Import the todoController object

const router = Router();

// POST /todos: Create a new todo
router.post('/todos', todoController.createTodo);

// GET /todos: Get a list of all todos
router.get('/todos', todoController.getTodos);

// GET /todos/:id: Get a single todo by ID
router.get('/todos/:id', todoController.getTodoById);

// PUT /todos/:id: Update a todo by ID
router.put('/todos/:id', todoController.updateTodo);

// DELETE /todos/:id: Delete a todo by ID
router.delete('/todos/:id', todoController.deleteTodo);

export default router;














