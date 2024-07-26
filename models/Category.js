import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Product } from './Product.js';

export const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
});

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
});

Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id'
});