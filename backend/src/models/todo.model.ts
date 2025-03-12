import mongoose, { Schema, Document } from 'mongoose';

interface Todo extends Document {
  title: string;
  completed: boolean;
}

const TodoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TodoModel = mongoose.model<Todo>('Todo', TodoSchema);
export default TodoModel;
