import { Router, Request, Response } from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todo.controller';

const router = Router();

router.post('/todos', async (req: Request, res: Response) => {
  try {
    await createTodo(req, res);
  } catch (err) {
    console.error(err); // Log the error object to understand its structure
    if (err instanceof Error) {
      res.status(500).json({ message: 'Something went wrong!', error: err.message });
    } else {
      res.status(500).json({ message: 'Something went wrong!', error: 'Unknown error' });
    }
  }
});

router.get('/todos', async (req: Request, res: Response) => {
  try {
    await getTodos(req, res);
  } catch (err) {
    console.error(err); // Log the error object to understand its structure
    if (err instanceof Error) {
      res.status(500).json({ message: 'Failed to fetch todos', error: err.message });
    } else {
      res.status(500).json({ message: 'Failed to fetch todos', error: 'Unknown error' });
    }
  }
});

router.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    await getTodoById(req, res);
  } catch (err) {
    console.error(err); // Log the error object to understand its structure
    if (err instanceof Error) {
      res.status(500).json({ message: 'Failed to fetch todo', error: err.message });
    } else {
      res.status(500).json({ message: 'Failed to fetch todo', error: 'Unknown error' });
    }
  }
});

router.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    await updateTodo(req, res);
  } catch (err) {
    console.error(err); // Log the error object to understand its structure
    if (err instanceof Error) {
      res.status(500).json({ message: 'Failed to update todo', error: err.message });
    } else {
      res.status(500).json({ message: 'Failed to update todo', error: 'Unknown error' });
    }
  }
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    await deleteTodo(req, res);
  } catch (err) {
    console.error(err); // Log the error object to understand its structure
    if (err instanceof Error) {
      res.status(500).json({ message: 'Failed to delete todo', error: err.message });
    } else {
      res.status(500).json({ message: 'Failed to delete todo', error: 'Unknown error' });
    }
  }
});

export default router;





