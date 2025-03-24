// user.model.js

import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js'; // Make sure the path is correct

class User extends Model {
    // Method to compare passwords during login
    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword); // Compare hashed password with input
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // The table name for users
    timestamps: true,
});

// Hash the password before saving it
User.addHook('beforeCreate', async (user) => {
    user.password = await bcrypt.hash(user.password, 10); // Hash password with salt rounds
});

export default User;
