import express from 'express';
import mongoose from 'mongoose';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from './controllers/todo.controller';


const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost/todo-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware to parse JSON
app.use(express.json());

// Todo Routes
// Todo Routes
app.post('/todos', createTodo);               // Create a new todo
app.get('/todos', getTodos);                  // Get all todos
app.get('/todos/:id', getTodoById);           // Get a todo by ID
app.put('/todos/:id', updateTodo);            // Update a todo by ID
app.delete('/todos/:id', deleteTodo);         // Delete a todo by ID
        // Delete a todo by ID

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});








