import { Request, Response } from 'express';
import Todo from '../models/todo.model';  // Correct path and filename

// POST /todos: Create a new todo
export const createTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description } = req.body; // Description can be optional

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Use Sequelize's create method
    const newTodo = await Todo.create({
      title,
      description: description || '', // Default to empty string if not provided
      completed: false, // Default to false
    });

    return res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create todo' });
  }
};

// GET /todos: Get a list of all todos
export const getTodos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const todos = await Todo.findAll(); // Sequelize's findAll method to get all todos
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

// GET /todos/:id: Get a single todo by ID
export const getTodoById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id); // Sequelize's findByPk method to find by primary key

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch todo' });
  }
};

// PUT /todos/:id: Update a todo by ID
export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, completed, description } = req.body;

    // Ensure at least one field is provided for update
    if (!title && completed === undefined && !description) {
      return res.status(400).json({ message: 'Provide title, completion status, or description to update' });
    }

    // Use Sequelize's update method
    const [updated] = await Todo.update(
      { title, completed, description },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Fetch the updated Todo
    const updatedTodo = await Todo.findByPk(id);

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to update todo' });
  }
};

// DELETE /todos/:id: Delete a todo by ID
export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // Use Sequelize's destroy method
    const deleted = await Todo.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete todo' });
  }
};





