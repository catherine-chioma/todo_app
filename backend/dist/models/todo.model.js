import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Adjusted path to match the correct location

class Todo extends Model {
    // Custom method to find by id and update
    static findByIdAndUpdate(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.findByPk(id);
            if (!todo) {
                return null; // Return null if todo not found
            }
            yield todo.update(updates); // Update the todo item
            yield todo.reload(); // Reload the updated todo from the database
            return todo; // Return the updated todo
        });
    }

    // Custom method to find by id (just retrieves the todo)
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.findByPk(id);
            if (!todo) {
                return null;  // Return null if todo not found
            }
            return todo; // Return the found todo
        });
    }
}

// Define the Todo model
Todo.init({
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
}, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos', // Table name
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
});

export default Todo;

