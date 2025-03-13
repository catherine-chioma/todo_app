import { Request, Response } from 'express';
import Todo from '../models/todo.model';  // Correct path and filename
 // Correct import for default export

// POST /todos: Create a new todo
export const createTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Create a new todo
    const newTodo = new Todo({
      title,
      completed: false, // Default to false
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create todo' });
  }
};

// GET /todos: Get a list of all todos
export const getTodos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const todos = await Todo.find(); // Get all todos from the database
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
    const todo = await Todo.findById(id);

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
    const { title, completed } = req.body;

    if (!title && completed === undefined) {
      return res.status(400).json({ message: 'Provide title or completion status to update' });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

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
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete todo' });
  }
};




