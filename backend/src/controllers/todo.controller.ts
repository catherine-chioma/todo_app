import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import Todo from '../models/todo.model';  // Ensure correct import path

// Helper function to send a standardized error response
const sendErrorResponse = (res: Response, message: string, statusCode: number = 500): void => {
  console.error(message);  // Log the error message
  res.status(statusCode).json({ message });
};

// POST /todos: Create a new todo
const createTodo = [
  // Validation rules
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('due_date').optional().isISO8601().withMessage('Due date must be a valid ISO 8601 date'),

  // Validation handler
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);  // Collect validation errors
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });  // If validation fails, send errors
      return;  // Exit early, no need to proceed further
    }

    try {
      const { title, description, due_date } = req.body;

      // Create new todo in the database
      const newTodo = await Todo.create({
        title,
        description: description || '',  // Default to empty string if not provided
        completed: false,  // Default to false
        due_date,
      });

      res.status(201).json(newTodo);  // Successfully created
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create todo' });  // Handle unexpected errors
    }
  }
];

// GET /todos: Get a list of all todos
const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    sendErrorResponse(res, 'Failed to fetch todos');
  }
};

// GET /todos/:id: Get a single todo by ID
const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;  // Exit early after sending the response
    }

    res.status(200).json(todo);
  } catch (error) {
    sendErrorResponse(res, 'Failed to fetch todo');
  }
};

// PUT /todos/:id: Update a todo by ID
const updateTodo = [
  // Validation rules
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('due_date').optional().isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),

  // Validation handler
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);  // Collect validation errors
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });  // If validation fails, send errors
      return;  // Exit early
    }

    try {
      const { id } = req.params;
      const { title, completed, description, due_date } = req.body;

      // Ensure at least one field is provided to update
      if (!title && completed === undefined && !description && !due_date) {
        res.status(400).json({ message: 'Provide at least one field to update' });
        return;
      }

      // Update todo in the database
      const [updated] = await Todo.update(
        { title, completed, description, due_date },
        { where: { id } }
      );

      if (updated === 0) {
        res.status(404).json({ message: 'Todo not found' });  // Handle case where no todo is updated
        return;
      }

      // Fetch the updated todo from the database
      const updatedTodo = await Todo.findByPk(id);
      res.status(200).json(updatedTodo);  // Successfully updated
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update todo' });  // Handle unexpected errors
    }
  }
];

// DELETE /todos/:id: Delete a todo by ID
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deleted = await Todo.destroy({
      where: { id },
    });

    if (deleted === 0) {
      res.status(404).json({ message: 'Todo not found' });
      return;  // Exit after sending the response
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
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















