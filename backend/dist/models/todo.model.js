import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database'; // Correct import path to your sequelize instance
class Todo extends Model {
    static findByIdAndUpdate(id, arg1, arg2) {
        throw new Error('Method not implemented.');
    }
    static findById(id) {
        throw new Error('Method not implemented.');
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
}, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos', // The table name
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
});
export default Todo;
