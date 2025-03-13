import { Schema, model, Document } from 'mongoose';

// Define the Todo interface that extends the Mongoose Document
export interface ITodo extends Document {
  title: string;
  completed: boolean;
}

// Define the Todo schema
const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Create and export the Todo model as the default export
const Todo = model<ITodo>('Todo', TodoSchema);

export default Todo;  // Default export

