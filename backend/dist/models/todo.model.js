var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Adjusted path to match the correct location
// Define the Todo model
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
                return null; // Return null if todo not found
            }
            return todo; // Return the found todo
        });
    }
}
// Initialize the Todo model
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
        allowNull: true, // Optional field
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true, // Optional field for due date
    },
}, {
    sequelize, // Connection instance
    modelName: 'Todo',
    tableName: 'todos', // Table name in the database
    timestamps: true, // Enable createdAt and updatedAt fields
});
export default Todo;
