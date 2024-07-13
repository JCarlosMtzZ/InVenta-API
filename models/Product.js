import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Image } from './Image.js';
import { OrderItem } from './OrderItem.js';

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(30)
    },
    size: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN
    },
}, {
    timestamps: false
});

Product.hasMany(Image, {
    foreignKey: 'productId',
    sourceKey: 'id'
});

Image.belongsTo(Product, {
    foreignKey: 'productId',
    targetKey: 'id'
});

Product.hasMany(OrderItem, {
    foreignKey: 'productId',
    sourceKey: 'id'
});

OrderItem.belongsTo(Product, {
    foreignKey: 'productId',
    targetKey: 'id'
});