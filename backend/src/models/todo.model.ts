import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';  // Adjusted path to match the correct location

// Define the Todo model
class Todo extends Model {
    // Custom method to find by id and update
    static async findByIdAndUpdate(id: number, updates: any) {
        const todo = await this.findByPk(id);
        if (!todo) {
            return null; // Return null if todo not found
        }
        await todo.update(updates); // Update the todo item
        await todo.reload(); // Reload the updated todo from the database
        return todo; // Return the updated todo
    }

    // Custom method to find by id (just retrieves the todo)
    static async findById(id: number) {
        const todo = await this.findByPk(id);
        if (!todo) {
            return null;  // Return null if todo not found
        }
        return todo; // Return the found todo
    }
}

// Initialize the Todo model
Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true, // Optional field for due date
    },
  },
  {
    sequelize, // Connection instance
    modelName: 'Todo',
    tableName: 'todos', // Table name in the database
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);

export default Todo;


















