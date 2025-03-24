import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjusted path to match the correct location

class Todo extends Model {
    // Custom method to find by id and update
    static async findByIdAndUpdate(id, updates) {
        const todo = await this.findByPk(id); // Sequelize method to find by primary key
        if (!todo) {
            throw new Error('Todo not found');
        }
        await todo.update(updates); // Update the todo item
        return todo; // Return the updated todo
    }

    // Custom method to find by id (just retrieves the todo)
    static async findById(id) {
        const todo = await this.findByPk(id); // Sequelize method to find by primary key
        if (!todo) {
            throw new Error('Todo not found');
        }
        return todo;
    }
}

Todo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, // This field is required
        validate: {
            notEmpty: {
                msg: 'Title cannot be empty' // Custom validation message
            },
            len: {
                args: [1, 255], // Title must be between 1 and 255 characters
                msg: 'Title must be between 1 and 255 characters'
            }
        }
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default to false if not provided
        validate: {
            isBoolean: {
                msg: 'Completed must be a boolean value' // Ensures 'completed' is a boolean
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
        validate: {
            len: {
                args: [0, 500], // Description can be up to 500 characters long
                msg: 'Description must be less than 500 characters'
            }
        }
    },
}, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos', // The table name
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
});

export default Todo;



