import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Adjusted path to match the correct location

class Todo extends Model {
  id!: number;
  title!: string;
  completed!: boolean;
  description?: string;

  // Custom method to find by id
  static async findByIdAndUpdate(id: number, updates: { title?: string, completed?: boolean, description?: string }) {
    const todo = await this.findByPk(id);  // Sequelize method to find by primary key
    if (!todo) {
      throw new Error('Todo not found');
    }
    await todo.update(updates);  // Update the todo item
    return todo;  // Return the updated todo
  }

  // Custom method to find by id (just retrieves the todo)
  static async findById(id: number) {
    const todo = await this.findByPk(id);  // Sequelize method to find by primary key
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }
}

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
      allowNull: true,  // Optional field
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',  // The table name
    timestamps: true,    // Automatically adds 'createdAt' and 'updatedAt'
  }
);

export default Todo;









