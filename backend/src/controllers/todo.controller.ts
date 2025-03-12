import { Request, Response } from 'express';
import TodoModel from '../models/todo.model';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const todo = new TodoModel({ title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Add other CRUD methods (Update, Delete) similarly
