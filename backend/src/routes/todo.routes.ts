// backend/src/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('./controllers/todo.controller');  // Correct import path

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: any) => console.log('Error connecting to MongoDB:', err));

// Middleware to parse JSON
app.use(bodyParser.json());

// Todo Routes
app.post('/todos', createTodo);               // Create a new todo
app.get('/todos', getTodos);                  // Get all todos
app.get('/todos/:id', getTodoById);           // Get a todo by ID
app.put('/todos/:id', updateTodo);            // Update a todo by ID
app.delete('/todos/:id', deleteTodo);         // Delete a todo by ID

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

