var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todo.controller';
const router = Router();
router.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createTodo(req, res);
    }
    catch (err) {
        console.error(err); // Log the error object to understand its structure
        if (err instanceof Error) {
            res.status(500).json({ message: 'Something went wrong!', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Something went wrong!', error: 'Unknown error' });
        }
    }
}));
router.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getTodos(req, res);
    }
    catch (err) {
        console.error(err); // Log the error object to understand its structure
        if (err instanceof Error) {
            res.status(500).json({ message: 'Failed to fetch todos', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Failed to fetch todos', error: 'Unknown error' });
        }
    }
}));
router.get('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getTodoById(req, res);
    }
    catch (err) {
        console.error(err); // Log the error object to understand its structure
        if (err instanceof Error) {
            res.status(500).json({ message: 'Failed to fetch todo', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Failed to fetch todo', error: 'Unknown error' });
        }
    }
}));
router.put('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield updateTodo(req, res);
    }
    catch (err) {
        console.error(err); // Log the error object to understand its structure
        if (err instanceof Error) {
            res.status(500).json({ message: 'Failed to update todo', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Failed to update todo', error: 'Unknown error' });
        }
    }
}));
router.delete('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteTodo(req, res);
    }
    catch (err) {
        console.error(err); // Log the error object to understand its structure
        if (err instanceof Error) {
            res.status(500).json({ message: 'Failed to delete todo', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Failed to delete todo', error: 'Unknown error' });
        }
    }
}));
export default router;
