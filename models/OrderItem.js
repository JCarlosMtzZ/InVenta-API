import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    netUnitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: false
});