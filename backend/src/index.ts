import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createTodo, getTodos } from './controllers/todo.controller';

const app: Application = express();
const PORT = 5000;

// Connect to MongoDB (no need for useNewUrlParser or useUnifiedTopology in Mongoose 6+)
mongoose.connect('mongodb://localhost/todo-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

// Todo Routes
app.post('/todos', createTodo);
app.get('/todos', getTodos);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

